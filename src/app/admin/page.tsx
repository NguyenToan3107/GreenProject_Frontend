"use client";
import React, { useEffect, useState } from "react";
import { Table, Spin } from "antd";
import "antd/dist/reset.css"; // Import Ant Design styles
import {
  getDashBoard,
  getOrderDashBoard,
  getProductDashBoard,
  getRevenueDashBoard,
  getTopUserDashBoard,
  getUserDashBoard,
} from "@/apis/modules/dashboard";
import RevenueChart from "@/app/admin/_components/RevenueChart";
import OrderStatusChart from "@/app/admin/_components/OrderStatusChart";

export default function page() {
  const [loading, setLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [userData, setUserData] = useState<any>(null);
  const [topUserData, setTopUserData] = useState<any>(null);

  const fetchDataDashBoard = async () => {
    setLoading(true);
    try {
      const res: any = await getDashBoard(); // Call API

      if (res?.code === 200) {
        setDashboardData(res.data); // Lưu dữ liệu vào state
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserDataDashBoard = async () => {
    setLoading(true);
    try {
      const res: any = await getUserDashBoard(3, 2024); // Call API
      if (res?.code === 200) {
        setUserData(res.data);
        console.log(res);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTopUserDataDashBoard = async () => {
    setLoading(true);
    try {
      const res: any = await getTopUserDashBoard();
      if (res?.code === 200) {
        setTopUserData(res.data.users.content);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProductDashBoard = async () => {
    setLoading(true);
    try {
      const res: any = await getProductDashBoard(3, 2024); // Call API
      if (res?.code === 200) {
        console.log(res);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDataDashBoard();

    fetchTopUserDataDashBoard();
    fetchProductDashBoard();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" style={{ color: "#808080" }} />{" "}
      </div>
    );
  }

  if (!dashboardData) {
    return <div>No data available</div>;
  }

  // Cột cho bảng Top 10 người dùng
  const userColumns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      // sorter: (a: { id: number }, b: { id: number }) => a.id - b.id,
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      // sorter: (a: { username: string }, b: { username: any }) =>
      //   a.username.localeCompare(b.username),
    },
    {
      title: "Image",
      dataIndex: "imageUrl",
      key: "imageUrl",
      render: (
        text: any,
        record: { imageUrl: string | undefined; username: string | undefined }
      ) =>
        record.imageUrl ? (
          <img
            src={record.imageUrl}
            alt={record.username}
            style={{ width: 40, height: 40, borderRadius: "50%" }}
          />
        ) : (
          "No Image"
        ),
    },
  ];

  // Cột cho bảng Best Seller Products
  const productColumns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Max Price",
      dataIndex: "maxPrice",
      key: "maxPrice",
    },
    {
      title: "Min Price",
      dataIndex: "minPrice",
      key: "minPrice",
    },
    {
      title: "Sold",
      dataIndex: "sold",
      key: "sold",
    },
    {
      title: "Rating",
      dataIndex: "sold",
      key: "totalRating",
    },
    {
      title: "Reviews",
      dataIndex: "sold",
      key: "totalReviews",
    },
  ];

  return (
    <div className="p-5 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-5 text-blue-600">Dashboard</h1>
      {/* Hiển thị các ô ngang hàng */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="cursor-pointer bg-white hover:opacity-80 shadow rounded-lg p-4 text-center">
          <h2 className="text-xl font-semibold">Paid Orders Count</h2>
          <p className="text-2xl font-bold">
            {dashboardData?.paid_orders_count}
          </p>
        </div>
        <div className="cursor-pointer bg-white hover:opacity-80 shadow rounded-lg p-4 text-center">
          <h2 className="text-xl font-semibold">Tổng số voucher</h2>
          <p className="text-2xl font-bold">{dashboardData.total_voucher}</p>
        </div>

        <div className="cursor-pointer bg-white hover:opacity-80 shadow rounded-lg p-4 text-center">
          <h2 className="text-xl font-semibold">Total Products</h2>
          <p className="text-2xl font-bold">{dashboardData.total_product}</p>
        </div>
        <div className="cursor-pointer bg-white hover:opacity-80 shadow rounded-lg p-4 text-center">
          <h2 className="text-xl font-semibold">Total Users</h2>
          <p className="text-2xl font-bold">{dashboardData.total_user}</p>
        </div>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-10 gap-4">
        <div className="bg-white shadow rounded-lg p-4 col-span-3 md:col-span-4">
          <h2 className="text-xl font-semibold mb-4 text-blue-600">
            Biểu đồ trạng thái đơn hàng
          </h2>
          {/* <Table
            dataSource={dashboardData.Top10UserOrderByTotalOrderValue.content}
            columns={userColumns}
            rowKey="id"
            pagination={false} */}
          {/* /> */}
          <OrderStatusChart />
        </div>

        <div className="bg-white shadow rounded-lg p-4 col-span-3 md:col-span-6">
          <h2 className="text-xl font-semibold mb-4 text-green-600">
            Biểu đồ doanh thu theo quý
          </h2>
          {/* <Table
            dataSource={dashboardData.bestSellerProducts.content}
            columns={productColumns}
            rowKey="id"
            pagination={false}
          /> */}
          <RevenueChart />
        </div>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-10 gap-4 mt-6">
        <div className="bg-white shadow rounded-lg p-4 col-span-3 md:col-span-6">
          <h2 className="text-xl font-semibold mb-4 text-green-600">
            Biểu đồ doanh thu theo quý
          </h2>
          {/* <Table
            dataSource={dashboardData.bestSellerProducts.content}
            columns={productColumns}
            rowKey="id"
            pagination={false}
          /> */}
          <RevenueChart />
        </div>
        <div className="bg-white shadow rounded-lg p-4 col-span-3 md:col-span-4">
          <h2 className="text-xl font-semibold mb-4 text-blue-600">
            Biểu đồ trạng thái đơn hàng
          </h2>
          <Table
            dataSource={Array.isArray(topUserData) ? topUserData : []}
            columns={userColumns}
            rowKey="id"
            pagination={false}
          />
        </div>
      </div>
    </div>
  );
}
