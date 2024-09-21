import {Product} from "@/app/model/Product";
import {Col, Form, Input, Modal, Row, Select, TreeSelect} from "antd";
import TextArea from "antd/es/input/TextArea";
import React, {useEffect, useState} from "react";
import {useProductStore} from "@/app/store/ProductStore";
import {useCategoryStore} from "@/app/store/CategoryStore";
import {useVariationStore} from "@/app/store/VariationStore";
import {useProductItemStore} from "@/app/store/ProductItemStore";

interface ProductItemFormProps {
    productItem?: any | null,
    isModalOpen?: boolean,
    setIsModalOpen?: (value: (((prevState: boolean) => boolean) | boolean)) => void
}

export default function ProductItemForm({productItem, isModalOpen, setIsModalOpen}: ProductItemFormProps) {

    const [form] = Form.useForm();
    const {productsSelect,getAllProducts}=useProductStore();
    const {getAllVariationsByProductId,variationsByproductId,setVariationsByproductId}=useVariationStore();
    const {createProductItem,updateProductItem}=useProductItemStore()
    const [loading,setLoading]=useState(false);
    useEffect(() => {
        if(productsSelect.length==0){
            getAllProducts(0);
        }

    }, []);
    useEffect(() => {

        if (!isModalOpen) {
            return;

        }
        if(!productItem){
            form.resetFields();
            setVariationsByproductId([])
            return;

        }
        const initialFormValues: any = {
            productId: productItem.product.id,
            quantity: productItem.quantity,
            price: productItem.price,
        };

        // Set variation fields (variation_X)
        productItem.variationOptions.forEach((variationOption: any) => {
            initialFormValues[`variation_${variationOption.variation.id}`] = variationOption.id;
        });


        form.setFieldsValue(initialFormValues);


        getAllVariationsByProductId(productItem.product.id);

    }, [isModalOpen]);


    async function handleOk() {

        const values = await form.validateFields();
        console.log(values)
        const productConfig = Object.keys(values)
            .filter(key => key.startsWith('variation_')) // Filter out the keys that start with 'variation_'
            .map(key => values[key])
            .filter(value => value !== undefined);
        const { productId, quantity, price, ...otherValues } = values;
        const updatedValues = {
            productId,
            quantity,
            price,
            productConfig, // Add the array of variations here
        };

        console.log(updatedValues);
        let res;
        setLoading(true)
        if (!productItem) {
            res=await createProductItem(updatedValues);
        } else {
            res=await updateProductItem(productItem.id, updatedValues);
        }
        setLoading(false)


        if (setIsModalOpen&&res){
            setIsModalOpen(false);
        }

    }

    function handleCancel() {
        if (isModalOpen && setIsModalOpen) {
            setIsModalOpen(false);

        }
    }


    async function handleChangeSelect(value:any) {
        console.log(value)
        await getAllVariationsByProductId(value);
    }

    const handleSelectChange = (value: string, variationId: number) => {
        console.log(`Selected value: ${value} for variation: ${variationId}`);
        // Handle selection logic here
    };

    return <>
            <Modal
                title={productItem ? "Cập nhật chi tiết sản phẩm" : "Thêm mới chi tiết sản phẩm"}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Lưu"
                cancelText="Hủy"
                width={800}
                centered
                confirmLoading={loading}
            >
                <Form
                    form={form}
                    layout="vertical"
                   // style={{ maxHeight: '500px', overflowY: 'auto' }}
                >

                    <Row gutter={24}>
                        <Col span={12}>
                            <Form.Item
                                label="Chọn sản phẩm"

                                name="productId"
                                rules={[{ required: true, message: 'Vui lòng chọn sản phẩm!' }]}
                            >
                                <Select
                                    onChange={handleChangeSelect}
                                    disabled={!!productItem}
                                    placeholder="Chọn sản phẩm"
                                    options={productsSelect.map((p: any) => ({
                                        label: p.name,
                                        value: p.id,
                                    }))}
                                />
                            </Form.Item>
                        </Col>

                        <Col span={6}>
                            <Form.Item
                                name="quantity"
                                label="Số lượng"
                                rules={[{ required: true, message: 'Please input the product qty!' }]}
                            >
                                <Input placeholder="Nhập số lượng"/>
                            </Form.Item>
                        </Col>

                        <Col span={6}>
                            <Form.Item
                                name="price"
                                label="Giá"
                                rules={[{ required: true, message: 'Please input the product price!' }]}
                            >
                                <Input placeholder="Nhập giá sản phẩm"/>
                            </Form.Item>
                        </Col>
                    </Row>

                    {/* Dynamic variation options */}
                    <Row gutter={24}>
                        {variationsByproductId.map(variation => (
                            <Col span={12} key={variation.id}>
                                <Form.Item
                                    label={`Chọn ${variation.name}`}
                                    name={`variation_${variation.id}`}
                                >
                                    <Select
                                        placeholder={`Chọn giá trị cho ${variation.name}`}
                                        onChange={(value) => handleSelectChange(value, variation.id)}
                                        options={variation.values.map((p: any) => ({
                                            label: p.value,
                                            value: p.id,
                                        }))}
                                    />
                                </Form.Item>
                            </Col>
                        ))}
                    </Row>
                </Form>
            </Modal>
        </>
}