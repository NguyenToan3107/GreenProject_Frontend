"use client"
import React, { useEffect, useState } from "react";
import {Button, Col, Input, Modal, Row, Table, theme, Upload} from "antd";
import CategoryForm from "@/app/admin/_components/categories/CategoryForm";
import { Header } from "antd/es/layout/layout";
import { Category } from "@/app/model/Category";
import {DeleteOutlined, EditOutlined, UploadOutlined} from "@ant-design/icons";
import { useCategoryStore } from "@/app/store/CategoryStore";
import { SearchProps } from "antd/es/input";


const { confirm } = Modal;
const { Search } = Input;

export default function Page() {
    const {
        categories,
        loading,
        deleteCategory,
        getAllCategories,
        setSearch,
        current,
        pageSize,
        totalElements
    } = useCategoryStore((state) => state);


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [category, setCategory] = useState<Category | null>(null);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    useEffect(() => {
        if(categories.length==0){
            getAllCategories(current, pageSize);
        }

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
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (text: string) => <span>{new Date(text).toLocaleString()}</span>,
        },
        {
            title: 'Updated At',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            render: (text: string) => <span>{new Date(text).toLocaleString()}</span>,
        },
        {
            title: 'Action',
            key: 'action',
            align: 'right' as const,
            render: (_: any, record: Category) => (
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(record)}

                    >
                        Edit
                    </Button>
                    <Button
                        type="primary"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => handleDelete(record)}

                    >
                        Delete
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

    const onSearch: SearchProps['onSearch'] =async (value, _e, info) => {
        setSearch(value);
        await getAllCategories(1,pageSize);

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
                    paddingInline: 50,
                    minHeight: 360,
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                }}
            >
                <Row gutter={16} className="flex items-center justify-between mb-4">
                    <Col>
                        <Search
                            placeholder="Tìm kiếm danh mục"
                            allowClear
                            onSearch={onSearch}
                        />
                    </Col>
                    <Col className="flex justify-end">
                        <Button
                            type="primary"
                            onClick={handleAddButton}
                            className="bg-blue-500 text-white hover:bg-blue-600 transition-all duration-200 rounded-md shadow-md"
                        >
                            Thêm mới danh mục
                        </Button>
                    </Col>
                </Row>
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
            </div>
        </>
    );
}
