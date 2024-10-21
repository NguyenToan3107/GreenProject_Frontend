import React, { useState, useEffect } from "react";
import { Pie } from "@ant-design/charts";
import { Select, Spin } from "antd";
import { getOrderDashBoard } from "@/apis/modules/dashboard";

type OrderStatus = {
  count: number; // Số lượng đơn hàng
  percentage: string; // Phần trăm đơn hàng
  status: string; // Trạng thái đơn hàng
};

const OrderStatusChart = () => {
  const [data, setData] = useState<OrderStatus[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [year, setYear] = useState<number>(2024);
  const [quarter, setQuarter] = useState<number>(1);
  const [quarters, setQuarters] = useState<number[]>([1, 2, 3, 4]);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const result = await getOrderDashBoard(quarter, year); // Gọi API cho quý đã chọn
        const statuses = result.data.orders.statuses || []; // Lấy danh sách trạng thái

        // Chuyển đổi dữ liệu trạng thái thành định dạng phù hợp
        const newData = statuses.map(
          (status: { count: any; percentage: any; status: any }) => ({
            count: status.count, // Số lượng đơn hàng
            percentage: status.percentage, // Phần trăm
            status: status.status, // Trạng thái
          })
        ) as OrderStatus[]; // Gán kiểu OrderStatus

        setData(newData); // Thiết lập lại dữ liệu mới cho quý đã chọn
      } catch (error: any) {
        if (error.response) {
          // Xử lý lỗi: trả về mảng trạng thái mặc định
          setData([{ count: 0, percentage: "0%", status: "Unknown" }]); // Gán kiểu OrderStatus
        } else {
          setError("Failed to fetch order data.");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData(); // Gọi hàm fetchData
  }, [year, quarter]);

  useEffect(() => {
    setQuarter(1); // Đảm bảo quý mặc định là 1 khi mounted
  }, []);

  const config = {
    appendPadding: 10,
    data,
    angleField: "count", // Số lượng đơn hàng
    colorField: "status", // Trạng thái đơn hàng
    radius: 1,
    innerRadius: 0.6, // Để tạo biểu đồ vòng tròn (donut chart)
    label: {
      content: "{name} {percentage}", // Hiển thị trạng thái và phần trăm bên trong
      offset: "-30%", // Điều chỉnh vị trí của nhãn bên trong
      style: {
        fontSize: 14,
        textAlign: "center",
      },
    },
    interactions: [
      {
        type: "element-active",
      },
    ],
    tooltip: {
      formatter: (datum: {
        status: string;
        count: number;
        percentage: string | number;
      }) => {
        const status = datum.status || "Unknown status";
        const count = datum.count != null ? datum.count : "No orders";

        // Nếu percentage là "NaN%" hoặc không hợp lệ, thay bằng "0%"
        const percentage =
          isNaN(Number(datum.percentage)) || datum.count === 0
            ? "0%"
            : datum.percentage;

        return {
          name: status,
          value: `${count} orders (${percentage})`,
        };
      },
    },
  };

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
      {loading ? <Spin /> : <Pie {...config} />}
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
};

export default OrderStatusChart;
