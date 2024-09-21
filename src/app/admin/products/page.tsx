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
import {PAGE_SIZE} from "@/app/util/constant";


const { confirm } = Modal;
const { Search } = Input;

export default function Page() {
    const {
        products,
        getAllProducts,
        deleteProduct,
        setSearch,
        current,
        totalElements
    } = useProductStore((state) => state);
    const [loading,setLoading]=useState(false);

    const {setProductId}=useImageStore((state) => state);


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalUploadOpen, setIsModalUploadOpen] = useState(false);
    const [product, setProduct] = useState<Product | null>(null);
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
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            render: (text: string) => (
                <span>{text.length > 50 ? `${text.substring(0, 50)}...` : text}</span>
            ),

        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            render: (_: any, record: Product) => (
                <span>{record.category ? record.category.name : 'N/A'}</span>
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

                    <Button
                        icon={<UploadOutlined />}
                        onClick={() => handleUploadImage(record)}
                    >Upload</Button>

                </div>
            ),
        },
    ];

    useEffect(() => {
        if(products.length==0){
            setLoading(true);
            const res = getAllProducts(current);
            if(res!=null){
                setLoading(false);
            }
        }

    }, []);

    function handleUploadImage(record: Product) {
        setProductId(record.id)
        setIsModalUploadOpen(true);

    }

    const handleEdit = (record:Product ) => {
        setProduct(record);
        setIsModalOpen(true);
    };

    const handleDelete = async (record: Product) => {
        confirm({
            title: 'Bạn có chắc chắn muốn xóa san pham này?',
            content: 'Hành động này không thể hoàn tác!',
            okText: 'Có',
            okType: 'danger',
            cancelText: 'Không',
            onOk: async () => {
                await deleteProduct(record.id);
            },
            onCancel() {
                console.log('Hủy bỏ xóa');
            },
        });
    };

    const handleTableChange = async (pagination: { current: number; pageSize: number }) => {
        await getAllProducts(pagination.current);
    };



    function handleAddButton() {
        setProduct(null);
        setIsModalOpen(true);
    }

    const onSearch: SearchProps['onSearch'] =async (value, _e, info) => {
        setSearch(value);
        await getAllProducts(1);

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
                    Quản lý sản phẩm
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
                            Thêm mới sản phẩm
                        </Button>
                    </Col>
                </Row>
                <ProductForm product={product}  isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
                <UploadImageForm  isModalUploadOpen={isModalUploadOpen} setIsModalUploadOpen={setIsModalUploadOpen}  />
                <Table
                    dataSource={products}
                    columns={columns}
                    loading={loading}
                    rowKey="id"
                    pagination={{
                        current,
                        pageSize:PAGE_SIZE,
                        total: totalElements,
                        showSizeChanger: true,
                        onChange: async (page, size) => {
                           await handleTableChange({ current: page, pageSize: size });
                        },
                    }}
                />
            </div>
        </>
    );
}
