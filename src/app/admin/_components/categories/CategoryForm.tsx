import { Button, Form, Input, Modal, Select, message } from "antd";
import React, { useEffect, useState } from "react";
import { useCategoryStore } from "@/app/store/CategoryState";

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
    const { categories, createCategory, updateCategory } = useCategoryStore((state) => state);

    const handleCancel = () => {
        if (isModalOpen && setIsModalOpen) {
            form.resetFields();
            setIsModalOpen(false);
        }
    };

    useEffect(() => {
        if (isModalOpen && category) {
            form.setFieldsValue({
                categoryName: category.name,
                parentCategory: category.parent ? category.parent.id : null,
            });
        }
    }, [isModalOpen, category, form]);

    const onFinish = async (values: any) => {
        const categoryDto: CategoryDto = {
            name: values.categoryName,
            parentId: values.parentCategory,
        };

        if (!category) {
            await createCategory(categoryDto);
        } else {
            await updateCategory(category.id, categoryDto);
        }

        form.resetFields();
        if (setIsModalOpen) setIsModalOpen(false);
    };

    return (
        <Modal title={category ? "Cập nhật danh mục" : "Tạo mới danh mục"} open={isModalOpen} onCancel={handleCancel} footer={null}>
            <div style={{ margin: '0 auto', backgroundColor: '#fafafa', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <Form layout="vertical" name="add-category" form={form} autoComplete="off" onFinish={onFinish}>
                    {/* Tên danh mục */}
                    <Form.Item label="Tên danh mục" name="categoryName" rules={[{ required: true, message: 'Vui lòng nhập tên danh mục!' }]}>
                        <Input placeholder="Nhập tên danh mục" />
                    </Form.Item>

                    {/* Danh mục cha */}
                    <Form.Item label="Danh mục cha" name="parentCategory">
                        <Select placeholder="Chọn danh mục cha" allowClear>
                            {categories.map((cat) => (
                                <Select.Option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    {/* Nút Submit */}
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block style={{ marginTop: '20px' }}>
                            {category ? "Chỉnh sửa danh mục" : "Thêm mới danh mục"}
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </Modal>
    );
}
