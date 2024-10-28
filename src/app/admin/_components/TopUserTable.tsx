import React, { useState, useEffect } from "react";
import { Pie } from "@ant-design/charts";
import { Select, Spin, Table } from "antd";
import {
  getOrderDashBoard,
  getTopUserDashBoard,
} from "@/apis/modules/dashboard";

const TopUserTable = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [year, setYear] = useState<number>(2024);
  const [quarter, setQuarter] = useState<number>(1);
  const [quarters, setQuarters] = useState<number[]>([1, 2, 3, 4]);
  const [topUserData, setTopUserData] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const res: any = await getTopUserDashBoard(quarter, year);
        if (res?.code === 200) {
          setTopUserData(res.data.users.content);
        }
      } catch (error: any) {
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [year, quarter]);

  useEffect(() => {
    setQuarter(1);
  }, []);

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

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <Select
          placeholder="Select Year"
          value={year}
          onChange={(value) => {
            setYear(value);
            setQuarter(0);
          }}
          style={{ width: 120, marginRight: 20 }}
        >
          <Select.Option value={2022}>2022</Select.Option>
          <Select.Option value={2023}>2023</Select.Option>
          <Select.Option value={2024}>2024</Select.Option>
          <Select.Option value={2025}>2025</Select.Option>
        </Select>

        {/* Dropdown chọn quý (bị disable nếu chưa chọn năm) */}
        <Select
          placeholder="Select Quarter"
          value={quarter}
          onChange={(value) => setQuarter(value)}
          style={{ width: 120 }}
          disabled={year === null} // Disable khi chưa chọn năm
        >
          {quarters.map((q) => (
            <Select.Option key={q} value={q}>
              {`Q${q}`}
            </Select.Option>
          ))}
        </Select>
      </div>

      {/* Hiển thị biểu đồ hoặc loading */}
      {loading ? (
        <Spin />
      ) : (
        <Table
          dataSource={Array.isArray(topUserData) ? topUserData : []}
          columns={userColumns}
          rowKey="id"
          pagination={false}
        />
      )}
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
};

export default TopUserTable;
