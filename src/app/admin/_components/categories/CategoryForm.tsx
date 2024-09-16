import {Button, Form, Input, Modal, Select, message, TreeSelect} from "antd";
import React, { useEffect, useState } from "react";
import { useCategoryStore } from "@/app/store/CategoryStore";

export interface CategoryDto {
    name: string;
    parentId: number | null | undefined;
}

interface CategoryModalProps {
    category?: any;
    isModalOpen?: boolean;
    setIsModalOpen?: (value: (((prevState: boolean) => boolean) | boolean)) => void;
}

export default function CategoryForm({
                                         category,
                                         isModalOpen,
                                         setIsModalOpen,
                                     }: CategoryModalProps) {
    const [form] = Form.useForm();
    const { categoriesNoPage, createCategory, updateCategory,fetchCategories,isUpdated } = useCategoryStore();
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
        if (isModalOpen && category) {
            form.setFieldsValue({
                name: category.name,
                parentId: category.parent ? category.parent.id : null,
            });
        }
    }, [isModalOpen, category, form]);

    const handleOk = async () => {
        const values = await form.validateFields();

        if (!category) {
            await createCategory(values);
        } else {
            await updateCategory(category.id, values);
        }


        if (setIsModalOpen&&!isUpdated){
            form.resetFields();
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
        <Modal title={category ? "Cập nhật danh mục" : "Tạo mới danh mục"}
               open={isModalOpen}
               onCancel={handleCancel}
               onOk={handleOk}
               okText="Lưu"
               cancelText="Hủy"
        >
            <div style={{ margin: '0 auto', backgroundColor: '#fafafa', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <Form layout="vertical" name="add-category" form={form} autoComplete="off">

                    <Form.Item label="Tên danh mục" name="name" rules={[{ required: true, message: 'Vui lòng nhập tên danh mục!' }]}>
                        <Input placeholder="Nhập tên danh mục" />
                    </Form.Item>


                    <Form.Item label="Danh mục cha" name="parentId">
                        <TreeSelect
                            treeData={categoryTreeData}
                            placeholder="Chọn danh mục cha"
                            allowClear

                        />
                    </Form.Item>


                </Form>
            </div>
        </Modal>
    );
}
