"use client";

import React, { useEffect, useState } from "react";
import {Button, Collapse, Drawer, message, Modal, Table, theme} from "antd";
import CategoryForm from "@/app/admin/_components/categories/CategoryForm";
import { Header } from "antd/es/layout/layout";
import { Category } from "@/app/model/Category";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import {useCategoryStore} from "@/app/store/CategoryState";
import VariationForm from "@/app/admin/_components/categories/VariationForm";

const { confirm } = Modal;
const { Panel } = Collapse;

export default function Page() {
    const {
        categories,
        loading,
        fetchCategories,
        updateCategory,
        deleteCategory,
        getAllCategories,
        current,
        pageSize,
        totalElements
    } = useCategoryStore((state) => state);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [drawerCategory, setDrawerCategory] = useState<Category | null>(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [category, setCategory] = useState<Category | null>(null);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    useEffect( () => {
        fetchCategories();
    }, []);

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Parent Name',
            key: 'parentName',
            render: (_: any, record: Category) => (
                <span>{record.parent ? record.parent.name : 'N/A'}</span>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_: any, record: Category) => (
                <div style={{ display: 'flex', gap: '8px' }}>
                    <Button
                        type="link"
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(record)}
                    >
                        Edit
                    </Button>
                    <Button
                        type="link"
                        icon={<DeleteOutlined />}
                        onClick={() => handleDelete(record)}
                    >
                        Delete
                    </Button>
                    <Button
                        type="link"
                        icon={<EyeOutlined />}
                        onClick={() => handleDetail(record)}
                    >
                        Detail
                    </Button>
                </div>
            ),
        },
    ];

    const handleEdit = (record: Category) => {
        console.log('Edit:', record);
        setCategory(record);
        showModal();
    };

    const handleDelete = async (record: Category) => {
        confirm({
            title: 'Bạn có chắc chắn muốn xóa danh mục này?',
            content: 'Hành động này không thể hoàn tác!',
            okText: 'Có',
            okType: 'danger',
            cancelText: 'Không',
            onOk: async () => {
                console.log('Delete:', record);
                await deleteCategory(record.id);

            },
            onCancel() {
                console.log('Hủy bỏ xóa');
            },
        });

    };

    const handleDetail = (record: Category) => {
        setDrawerCategory(record);
        setIsDrawerOpen(true);
    };

    const handleTableChange = async (pagination: { current: number; pageSize: number }) => {
        await getAllCategories(pagination.current, pagination.pageSize);
    };

    function showModal() {
        setIsModalOpen(true);
    }

    function handleAddButton() {
        setCategory(null);
        showModal();
    }

    return (
        <>
            <Header style={{ padding: 0, background: colorBgContainer }}>
                <h1
                    className="title"
                    style={{
                        textAlign: 'center',
                        margin: 0,
                        lineHeight: '64px',
                        fontWeight: 'bold',
                        fontSize: '24px',
                    }}
                >
                    Quản lý danh mục
                </h1>
            </Header>

            <div
                style={{
                    padding: 24,
                    minHeight: 360,
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                }}
            >
                <Button type="primary" onClick={handleAddButton}>
                    Thêm mới danh mục
                </Button>
                <CategoryForm category={category} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />

                <Table
                    dataSource={categories}
                    columns={columns}
                    loading={loading}
                    rowKey="id"
                    pagination={{
                        current,
                        pageSize,
                        total: totalElements,
                        showSizeChanger: true,
                        onChange: (page, size) => {
                            handleTableChange({ current: page, pageSize: size });
                        },
                    }}
                />
                <Drawer
                    title="Thêm biến thể "
                    placement="right"
                    closable={true}
                    onClose={() => {
                        setDrawerCategory(null);
                        setIsDrawerOpen(false)}}
                    open={isDrawerOpen}
                    width={1000}
                >
                    {drawerCategory && (
                        <div>
                            <VariationForm category={drawerCategory} />
                        </div>
                    )}
                </Drawer>
            </div>
        </>
    );
}
