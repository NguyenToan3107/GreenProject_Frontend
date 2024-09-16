"use client"
import React, { useEffect, useState } from "react";
import {Button, Col, Input, Modal, Row, Table, theme, Upload} from "antd";

import { Header } from "antd/es/layout/layout";
import { Category } from "@/app/model/Category";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";

import { SearchProps } from "antd/es/input";

import {useVariationOptionStore} from "@/app/store/VariationOptionStore";
import OptionForm from "@/app/admin/_components/options/OptionForm";


const { confirm } = Modal;
const { Search } = Input;

export default function Page() {
    const {
        variationOptions,
        loading,
        isUpdated,
        setSearch,
        getAllVariationOptions,
        deleteVariationOption,
        current,
        pageSize,
        totalElements
    } = useVariationOptionStore((state) => state);




    const [isModalOpen, setIsModalOpen] = useState(false);
    const [variationOption, setVariationOption] = useState<any | null>(null);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    useEffect(() => {
        if(!isUpdated){
            getAllVariationOptions(current, pageSize);
        }

    }, [isUpdated]);

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Value',
            dataIndex: 'value',
            key: 'value',
        },
        {
            title: 'Variation',
            key: 'variation',
            render: (_: any, record: any) => (
                <span>{record.variation ? record.variation.name : 'N/A'}</span>
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

    const handleEdit = (record: any) => {
        console.log('Edit:', record);
        setVariationOption(record);
        setIsModalOpen(true);
    };

    const handleDelete = async (record: any) => {
        confirm({
            title: 'Bạn có chắc chắn muốn xóa tùy chọn này?',
            content: 'Hành động này không thể hoàn tác!',
            okText: 'Có',
            okType: 'danger',
            cancelText: 'Không',
            onOk: async () => {
                console.log('Delete:', record);
                await deleteVariationOption(record.id);
            },
            onCancel() {
                console.log('Hủy bỏ xóa');
            },
        });
    };

    const handleTableChange = async (pagination: { current: number; pageSize: number }) => {
        await getAllVariationOptions(pagination.current, pagination.pageSize);
    };



    function handleAddButton() {
        setVariationOption(null);
        setIsModalOpen(true);
    }

    const onSearch: SearchProps['onSearch'] =async (value, _e, info) => {
        setSearch(value);
        await getAllVariationOptions(1,pageSize);

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
                    Quản lý tùy chọn
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
                            placeholder="Tìm kiếm biến thể"
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
                            Thêm mới tùy chọn
                        </Button>
                    </Col>
                </Row>
                <OptionForm variationOption={variationOption} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />

                <Table
                    dataSource={variationOptions}
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
