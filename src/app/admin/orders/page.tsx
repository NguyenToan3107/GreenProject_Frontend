"use client"
import React, { useEffect, useState } from "react";
import {Button, Col, Input, Modal, Row, Select, Table, theme, Upload} from "antd";

import { Header } from "antd/es/layout/layout";
import { Category } from "@/app/model/Category";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";

import { SearchProps } from "antd/es/input";

import {useVariationOptionStore} from "@/app/store/VariationOptionStore";
import OptionForm from "@/app/admin/_components/options/OptionForm";
import {PAGE_SIZE} from "@/app/util/constant";
import {useVariationStore} from "@/app/store/VariationStore";
import {handleApiRequest} from "@/app/util/utils";
import {getAllOrders} from "@/apis/modules/order";


const { confirm } = Modal;
enum OrderStatus {
    INIT,
    PENDING, // chờ xác nhận
    PROCESSING, // đang xử lý
    SHIPPED, // đang giao hàng
    DELIVERED, // đã giao
    CANCELED, // hủy
    RETURNED // đã trả hàng
}

export default function Page() {
    const [orders,setOrders]=useState([]);
    const [status,setStatus]=useState("PENDING")
    const [loading,setLoading]=useState(false);
    const [paginationOrder, setPaginationOrder] = useState({
        current: 1,
        total: 0,
    });

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const fetchOrders=async (current:number,status:string)=>{
        setLoading(true);
        await handleApiRequest(()=>getAllOrders(status,current),(res)=>{
            setOrders(res.data.content);
            setPaginationOrder(prevState => ({
                current: res.data.currentPage,
                total: res.data.totalElements,
            }));
            console.log(res)
        })

        setLoading(false);

    }
    useEffect(() => {
      fetchOrders(paginationOrder.current,status)

    }, []);



    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Product Total Cost',
            dataIndex: 'productTotalCost',
            key: 'productTotalCost',
            render: (text: number) => <span>{text.toLocaleString('vi-VN')}đ</span>,
        },
        {
            title: 'Shipping Cost',
            dataIndex: 'shippingCost',
            key: 'shippingCost',
            render: (text: number) => <span>{text.toLocaleString('vi-VN')}đ</span>,
        },
        {
            title: 'Total Cost',
            dataIndex: 'totalCost',
            key: 'totalCost',
            render: (text: number) => <span>{text.toLocaleString('vi-VN')}đ</span>,
        },
        {
            title: 'Discount Amount',
            dataIndex: 'discountAmount',
            key: 'discountAmount',
            render: (text: number) => <span>{text.toLocaleString('vi-VN')}đ</span>,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status: any) => <span>{status}</span>,
        },
        {
            title: 'Action',
            key: 'action',
            align: 'right' as const,
            render: (_: any, record: any) => (
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                    <Select
                        defaultValue={record.status}
                        onChange={(value) => handleUpdateStatus(record.id, value)}
                        style={{ width: 120 }}
                    >
                        {Object.values(OrderStatus).map((status) => (
                            <Select.Option key={status} value={status}>
                                {status}
                            </Select.Option>
                        ))}
                    </Select>
                </div>
            ),
        },
    ];

    const handleUpdateStatus = async (orderId: number, status: any) => {
        // Gọi API để cập nhật trạng thái đơn hàng ở đây
        console.log(`Cập nhật trạng thái đơn hàng ID: ${orderId} với trạng thái: ${status}`);
        // Thực hiện cập nhật trạng thái, sau đó có thể fetch lại dữ liệu đơn hàng
    };



    const handleTableChange = async (pagination: { current: number; pageSize: number }) => {

        await fetchOrders(pagination.current,status);
    };





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
                    Quản lý trạng thái đơn hàng
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
                <Row gutter={[16,16]} className="flex items-center justify-between mb-4">

                    <Col className="flex justify-end">
                        <Select
                            defaultValue={status}
                            onChange={(value) => {setStatus(value)}}
                            style={{ width: 120 }}
                        >
                            {Object.values(OrderStatus).map((status) => (
                                <Select.Option key={status} value={status}>
                                    {status}
                                </Select.Option>
                            ))}
                        </Select>
                    </Col>
                </Row>


                <Table
                    dataSource={orders}
                    columns={columns}
                    loading={loading}
                    rowKey="id"
                    pagination={{
                        current:paginationOrder.current,
                        pageSize:PAGE_SIZE,
                        total: paginationOrder.total,
                        showSizeChanger: true,
                        onChange:async (page, size) => {
                            await handleTableChange({ current: page, pageSize: size });
                        },
                    }}
                />
            </div>
        </>
    );
}
