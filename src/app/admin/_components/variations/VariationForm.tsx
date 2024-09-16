import {Button, Form, Input, Modal, Select, message, TreeSelect} from "antd";
import React, { useEffect, useState } from "react";
import { useCategoryStore } from "@/app/store/CategoryStore";
import {useVariationStore} from "@/app/store/VariationStore";

export interface VariationDto {
    name: string;
    categoryId: number | null | undefined;
}

interface VariationModalProps {
    variation?: any;
    isModalOpen?: boolean;
    setIsModalOpen?: (value: (((prevState: boolean) => boolean) | boolean)) => void;
}

export default function VariationForm({
                                         variation,
                                         isModalOpen,
                                         setIsModalOpen,
                                     }: VariationModalProps) {
    const [form] = Form.useForm();
    const { createVariation, updateVariation ,isUpdated} = useVariationStore();
    const { categoriesNoPage, fetchCategories } = useCategoryStore();
    useEffect(() => {
        if(isModalOpen){
            fetchCategories();
        }
    }, [isModalOpen]);

    const handleCancel = () => {
        if (isModalOpen && setIsModalOpen) {
            form.resetFields();
            setIsModalOpen(false);
        }
    };

    useEffect(() => {
        if (isModalOpen && variation) {
            form.setFieldsValue({
                name: variation.name,
                categoryId: variation.category ? variation.category.id : null,
            });
        }
    }, [isModalOpen, variation, form]);

    const handleOk = async () => {
        const values = await form.validateFields();

        if (!variation) {
            await createVariation(values);
        } else {
            console.log(variation.id)
            console.log(values)
            await updateVariation(variation.id, values);
        }

        if (setIsModalOpen&&!isUpdated){
            setIsModalOpen(false);
            form.resetFields();
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
        <Modal title={variation ? "Cập nhật biến thể" : "Tạo mới biến thể"}
               open={isModalOpen}
               onCancel={handleCancel}
               onOk={handleOk}
               okText="Lưu"
               cancelText="Hủy"
        >
            <div style={{ margin: '0 auto', backgroundColor: '#fafafa', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <Form layout="vertical" name="add-category" form={form} autoComplete="off">

                    <Form.Item label="Tên biến thể " name="name" rules={[{ required: true, message: 'Vui lòng nhập tên danh mục!' }]}>
                        <Input placeholder="Nhập tên biến thể " />
                    </Form.Item>


                    <Form.Item label="Danh mục" name="categoryId">
                        <TreeSelect
                            treeData={categoryTreeData}
                            placeholder="Chọn danh mục"
                            allowClear

                        />
                    </Form.Item>


                </Form>
            </div>
        </Modal>
    );
}
