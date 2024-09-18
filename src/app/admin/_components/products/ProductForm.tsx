import {useEffect, useState} from "react";
import {Form, Input, message, Modal, TreeSelect} from "antd";
import {useCategoryStore} from "@/app/store/CategoryStore";
import {useProductStore} from "@/app/store/ProductStore";
import TextArea from "antd/es/input/TextArea";
import {Product} from "@/app/model/Product";
import {updateProductById} from "@/apis/modules/product";

export interface ProductDto {
    name: string,
    description: string,
    categoryId: number | null | undefined,
}

interface ProductModalProps {
    isModalOpen?: boolean,
    setIsModalOpen?: (value: (((prevState: boolean) => boolean) | boolean)) => void,
    product?: Product | null
}

export default function ProductForm({isModalOpen, setIsModalOpen, product}: ProductModalProps) {
    const [form] = Form.useForm();

    const {categoriesNoPage, fetchCategories} = useCategoryStore();
    const {createProduct,updateProduct,isUpdated} = useProductStore();
    useEffect(() => {
        if (isModalOpen) {
            fetchCategories();
        }

    }, [isModalOpen]);



    useEffect(() => {
        if (isModalOpen && product) {
            form.setFieldsValue({
                name: product.name,
                description:product.description,
                categoryId: product.category ? product.category.id : null
            });
        }
    }, [isModalOpen, product, form]);



    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            if(!product){
                await createProduct(values);
            }else {
                await updateProduct(product.id,values);
            }


            if (setIsModalOpen&&!isUpdated){
                setIsModalOpen(false);
                form.resetFields();
            }
        } catch (error) {
            console.error('Error creating product:', error);
            message.error('Failed to add product.');
        }
    };

    const handleCancel = () => {
        form.resetFields();
        if (setIsModalOpen) {
            setIsModalOpen(false);
        }
    };

    const buildCategoryTree = (categories:any) => {
        return categories.map((cat:any) => ({
            title: cat.name,
            value: cat.id,
            children: cat.children ? buildCategoryTree(cat.children) : [],
        }));
    };
    const categoryTreeData = buildCategoryTree(categoriesNoPage);

    return (
        <>

            <Modal
                title={product ? "Cập nhật sản phẩm" : "Tạo mới sản phẩm"}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Lưu"
                cancelText="Hủy"
            >
                <Form
                    form={form}
                    layout="vertical"
                    initialValues={{
                        name: '',
                        description: '',
                        categoryId: null,
                    }}
                >
                    <Form.Item
                        name="name"
                        label="Tên sản phẩm"
                        rules={[{required: true, message: 'Please input the product name!'}]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="Mô tả"
                        rules={[{required: true, message: 'Please input the product description!'}]}
                    >
                        <TextArea rows={4}/>
                    </Form.Item>
                    <Form.Item
                        name="categoryId"
                        label="Danh mục"
                       // rules={[{required: true, message: 'Please select a category!'}]}
                    >
                        <TreeSelect
                            placeholder="Select a category"
                            treeData={categoryTreeData}
                            allowClear
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}