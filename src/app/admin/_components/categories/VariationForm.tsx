import React, {useEffect, useState} from 'react';
import {Button, Card, Form, Input, List, message, Modal, Popconfirm, Space, Tag} from 'antd';
import {Category} from "@/app/model/Category";
import {useVariationStore} from "@/app/store/VariationStore";
import CategoryForm from "@/app/admin/_components/categories/CategoryForm";
import OptionForm from "@/app/admin/_components/categories/OptionForm";
import {DeleteOutlined, PlusOutlined} from "@ant-design/icons";
import {deleteVariationOption} from "@/apis/modules/variation_option";


const { confirm } = Modal;
interface Variation {
    id: number;
    name: string;
    values: string[];
}


interface VariationFormProps {
    category?: Category
}

export interface CreateVariationRequest{
    name:string,
    categoryId:number
}

export interface UpdateVariationRequest{
    name:string
}


export default function VariationForm({ category}: VariationFormProps) {
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [variationEdit,setVariationEdit]=useState<Variation|null>(null);

    /*const [variations, setVariations] = useState<Variation[]>([
        {id: 1, name: 'color', values: ['black', 'red', 'blue', 'yellow']},
        {id: 2, name: 'storage (GB)', values: ['64', '128', '512', '1024']},
    ]);*/
    const {variations,reload,setCategoryId,deleteVariationById,setVariationId,updateVariationById,getVariationsByCategoryId,createVariation}=useVariationStore((state) => state)

    useEffect( () => {
        if (category){
            setCategoryId(category.id)
            getVariationsByCategoryId(category.id);
        }

    }, [category]);

    useEffect(() => {
        if (variationEdit) {
            form.setFieldsValue({ variationName: variationEdit.name });
        } else {
            form.resetFields();
        }
    }, [variationEdit, form]);

    async function handleAddVariation() {
        const propertyName = form.getFieldValue('variationName');
        if (!propertyName) {
            message.error('Property name cannot be empty');
            return;
        }

        if(category){
            const newVariation: CreateVariationRequest = {
                name: propertyName,
                categoryId:category.id
            };
            await createVariation(newVariation);
            form.resetFields();

        }

    }

    async function handleUpdateVariation() {
        if(variationEdit){
            console.log("edit:"+variationEdit.id+" name:"+variationEdit.name)
            const v:UpdateVariationRequest={
                name:variationEdit.name
            };
            await updateVariationById(variationEdit.id,v);

            setVariationEdit(null);

        }


    }

    function setEditingOptionsFor(id: number) {

    }

    function handleDeleteVariation(id: number) {
        confirm({
            title: 'Bạn có chắc chắn muốn xóa biến thể này?',
            content: 'Hành động này không thể hoàn tác!',
            okText: 'Có',
            okType: 'danger',
            cancelText: 'Không',
            onOk: async () => {
                await deleteVariationById(id);

            },
            onCancel() {
                console.log('Hủy bỏ xóa');
            },
        });
    }

    async function handleDeleteValue(id: number) {
        const res:any=await deleteVariationOption(id);
        if(res.code==200){
            reload()

        }
    }

    return (
        <div>
            <Form form={form} layout="inline"  className="my-5">
                <Form.Item name="variationName" rules={[{ required: true, message: 'Please input the property name!' }]}>
                    <Input placeholder="Property name" style={{ width: 200 }} value={variationEdit?.name} onChange={e=>{
                        if (variationEdit) {
                            setVariationEdit({ ...variationEdit, name: e.target.value });
                        }
                    }}  />
                </Form.Item>
                <Form.Item>
                    <Button type="primary"  onClick={handleAddVariation} style={{ marginLeft: 8 }}>
                        Thêm biến thể
                    </Button>
                    <Button type="primary" onClick={()=>handleUpdateVariation()} style={{ marginLeft: 8 }}>
                        Cập nhật biến thể
                    </Button>
                </Form.Item>
            </Form>


            {variations.map(variation => (
                <Card
                    key={variation.id}
                    style={{ marginBottom: 16 }}
                    title={
                        <span
                            onClick={() => {
                                const v = {
                                    id: variation.id,
                                    name: variation.name,
                                    values: [],
                                };
                                setVariationEdit(v);
                            }}
                            style={{
                                display: 'inline-block',
                                padding: '8px 16px',
                                backgroundColor: '#f5f5f5',
                                borderRadius: '4px',
                                cursor: 'pointer',
                            }}
                        >
        {variation.name}
      </span>
                    }
                    extra={
                        <>
                            <Button
                                icon={<PlusOutlined />}
                                onClick={() => {
                                    setIsModalOpen(true);
                                    setVariationId(variation.id);
                                }}
                            >
                                Thêm giá trị
                            </Button>
                            <Popconfirm
                                title="Bạn có chắc chắn muốn xóa?"
                                onConfirm={() => handleDeleteVariation(variation.id)}
                                okText="Có"
                                cancelText="Không"
                            >
                                <Button icon={<DeleteOutlined />} danger>
                                    Xóa
                                </Button>
                            </Popconfirm>
                        </>
                    }
                >
                    <div className="bg-gray-300 p-4 rounded-lg flex flex-wrap gap-2">
                        {variation.values.map((v) => (
                            <Tag
                                closable
                                key={v.value}
                                onClose={() => handleDeleteValue(v.id)}
                                className="bg-blue-500 text-white rounded-lg px-2 py-1 hover:bg-blue-600"
                                style={{ marginBottom: 8 }}
                            >
                                {v.value}
                            </Tag>
                        ))}
                    </div>
                </Card>
            ))}

            <OptionForm isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>

        </div>
    );
};


