"use client"
import React, { useEffect, useState } from "react";
import {Button, Col, Input, Modal, Row, Table, theme, Upload} from "antd";
import CategoryForm from "@/app/admin/_components/categories/CategoryForm";
import { Header } from "antd/es/layout/layout";
import { Category } from "@/app/model/Category";
import {DeleteOutlined, EditOutlined, UploadOutlined} from "@ant-design/icons";
import { useCategoryStore } from "@/app/store/CategoryStore";
import { SearchProps } from "antd/es/input";
import {useProductStore} from "@/app/store/ProductStore";
import {Product} from "@/app/model/Product";
import ProductForm from "@/app/admin/_components/products/ProductForm";
import UploadImageForm from "@/app/admin/_components/products/UploadImageForm";
import {useImageStore} from "@/app/store/ImageStore";
import ProductItemForm from "@/app/admin/_components/productItems/ProductItemForm";
import {useProductItemStore} from "@/app/store/ProductItemStore";


const { confirm } = Modal;
const { Search } = Input;

export default function Page() {
    const {
        productItems,
        loading,
        getAllProductItems,
        deleteProductItem,
        setSearch,
        isUpdated,
        current,
        pageSize,
        totalElements
    } = useProductItemStore((state) => state);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [productItem, setProductItem] = useState<any | null>(null);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Product',
            dataIndex: 'product',
            key: 'product',
            render: (_: any, record: any) => (
                <span>{record.product ? record.product.name : 'N/A'}</span>
            ),

        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',

        },

        {
            title: 'Variations',
            dataIndex: 'variationOptions',
            key: 'variation',
            render: (_: any, record: any) => (
                <span>{record.variationOptions.length !== 0 ? record.variationOptions.map((option: any) => option.value).join(', ') : 'N/A'}</span>
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
            render: (_: any, record: Product) => (
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

    useEffect(() => {
        if(!isUpdated)
            getAllProductItems(current, pageSize);
    }, [isUpdated]);



    const handleEdit = (record:any ) => {
        console.log('Edit:', record);
        setProductItem(record);
        setIsModalOpen(true);
    };

    const handleDelete = async (record: Product) => {
        confirm({
            title: 'Bạn có chắc chắn muốn xóa ct san pham này?',
            content: 'Hành động này không thể hoàn tác!',
            okText: 'Có',
            okType: 'danger',
            cancelText: 'Không',
            onOk: async () => {
                console.log('Delete:', record);
                await deleteProductItem(record.id);
            },
            onCancel() {
                console.log('Hủy bỏ xóa');
            },
        });
    };

    const handleTableChange = async (pagination: { current: number; pageSize: number }) => {
        await getAllProductItems(pagination.current, pagination.pageSize);
    };



    function handleAddButton() {
        setProductItem(null);
        setIsModalOpen(true);
    }

    const onSearch: SearchProps['onSearch'] =async (value, _e, info) => {
        setSearch(value);
        await getAllProductItems(1,pageSize);

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
                    Quản lý chi tiết sản phẩm
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
                            placeholder="Tìm kiếm sản phẩm"
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
                            Thêm mới chi tiết sản phẩm
                        </Button>
                    </Col>
                </Row>
                <ProductItemForm productItem={productItem}  isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />

                <Table
                    dataSource={productItems}
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
