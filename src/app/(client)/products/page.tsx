"use client";
import { SetStateAction, useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faHeart as faHeartEmpty,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartFilled } from "@fortawesome/free-solid-svg-icons";
import { Button, Dropdown, Menu, Checkbox } from "antd";
import "../../../app/globals.css";
import "antd/dist/reset.css";
import { useProductStore } from "@/app/store/ProductStore";

const products = [
  {
    id: 1,
    name: "Sản phẩm 1",
    image: "/client/products/product2.png",
    price: "100,000",
    description: "Mô tả sản phẩm 1",
  },
  {
    id: 2,
    name: "Sản phẩm 2",
    image: "/client/products/product2.png",
    price: "200,000",
    description: "Mô tả sản phẩm 2",
  },
  {
    id: 3,
    name: "Sản phẩm 3",
    image: "/client/products/product2.png",
    price: "300,000",
    description: "Mô tả sản phẩm 3",
  },
  {
    id: 4,
    name: "Sản phẩm 4",
    image: "/client/products/product2.png",
    price: "400,000",
    description: "Mô tả sản phẩm 4",
  },
  {
    id: 5,
    name: "Sản phẩm 5",
    image: "/client/products/product2.png",
    price: "500,000",
    description: "Mô tả sản phẩm 5",
  },
  {
    id: 6,
    name: "Sản phẩm 6",
    image: "/client/products/product2.png",
    price: "600,000",
    description: "Mô tả sản phẩm 6",
  },
  {
    id: 7,
    name: "Sản phẩm 7",
    image: "/client/products/product2.png",
    price: "700,000",
    description: "Mô tả sản phẩm 7",
  },
  {
    id: 8,
    name: "Sản phẩm 8",
    image: "/client/products/product2.png",
    price: "800,000",
    description: "Mô tả sản phẩm 8",
  },
  {
    id: 9,
    name: "Sản phẩm 9",
    image: "/client/products/product2.png",
    price: "900,000",
    description: "Mô tả sản phẩm 9",
  },
  {
    id: 10,
    name: "Sản phẩm 10",
    image: "/client/products/product2.png",
    price: "1,000,000",
    description: "Mô tả sản phẩm 10",
  },
  {
    id: 11,
    name: "Sản phẩm 11",
    image: "/client/products/product2.png",
    price: "1,100,000",
    description: "Mô tả sản phẩm 11",
  },
  {
    id: 12,
    name: "Sản phẩm 11",
    image: "/client/products/product2.png",
    price: "1,100,000",
    description: "Mô tả sản phẩm 11",
  },
  {
    id: 13,
    name: "Sản phẩm 11",
    image: "/client/products/product2.png",
    price: "1,100,000",
    description: "Mô tả sản phẩm 11",
  },
  {
    id: 14,
    name: "Sản phẩm 11",
    image: "/client/products/product2.png",
    price: "1,100,000",
    description: "Mô tả sản phẩm 11",
  },
];

const sortOptions = (
  <Menu>
    <Menu.Item key="1">Tất cả</Menu.Item>
    <Menu.Item key="2">Danh mục 1</Menu.Item>
    <Menu.Item key="3">Danh mục 2</Menu.Item>
  </Menu>
);

const categoryMenu = (
  <Menu>
    <Menu.Item key="1">Danh mục con 1</Menu.Item>
    <Menu.Item key="2">Danh mục con 2</Menu.Item>
    <Menu.Item key="3">Danh mục con 3</Menu.Item>
  </Menu>
);

export default function page() {
  const { getAllProducts } = useProductStore((state: any) => state);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeButton, setActiveButton] = useState("popular");
  const [likedProducts, setLikedProducts] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);

  const handleButtonClick = (buttonType: SetStateAction<string>) => {
    setActiveButton(buttonType);
  };

  const filteredProducts = products.filter((product: { name: string }) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleLike = (productId: number) => {
    setLikedProducts((prevLikes) => {
      const newLikes = new Set(prevLikes);
      if (newLikes.has(productId)) {
        newLikes.delete(productId);
      } else {
        newLikes.add(productId);
      }
      return newLikes;
    });
  };

  const PRODUCTS_PER_PAGE = 12;

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

  // Paginated products based on current page
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

  // Hàm để tạo các nút phân trang với ba chấm
  const renderPagination = () => {
    const pageNumbers = [];
    const siblingsCount = 1; // Số trang trước và sau trang hiện tại
    const totalVisiblePages = 3; // Hiển thị 3 trang gần nhất

    if (totalPages <= 5) {
      // Nếu có ít trang, hiển thị tất cả các trang
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Hiển thị trang đầu, trang cuối, và các trang xung quanh trang hiện tại
      const startPage = Math.max(2, currentPage - siblingsCount);
      const endPage = Math.min(totalPages - 1, currentPage + siblingsCount);

      // Trang đầu tiên
      pageNumbers.push(1);

      // Nếu startPage > 2, thêm ba chấm (...)
      if (startPage > 2) {
        pageNumbers.push("...");
      }

      // Các trang xung quanh trang hiện tại
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      // Nếu endPage < totalPages - 1, thêm ba chấm (...)
      if (endPage < totalPages - 1) {
        pageNumbers.push("...");
      }

      // Trang cuối cùng
      pageNumbers.push(totalPages);
    }

    return pageNumbers.map((page, index) => {
      if (page === "...") {
        return (
          <span key={index} className="px-2">
            ...
          </span>
        );
      } else {
        return (
          <Button
            key={index}
            type={currentPage === page ? "primary" : "default"}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </Button>
        );
      }
    });
  };

  return (
    <div className="mx-0 px-0">
      <div className="relative mb-16">
        <img
          src="/client/products/slidebg.jpg"
          alt=""
          width={250}
          height={100}
          className="object-cover w-full"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
          <h2 className="text-3xl font-bold uppercase">GREENNOVA</h2>
          <p className="mt-2 text-base">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sit
            amet accumsan arcu. Proin vitae neque urna.
          </p>
        </div>
      </div>
      <div className="flex flex-col mt-5 px-9 mb-32">
        <div className="flex">
          {/* Thanh bên trái */}
          <aside className="w-1/4 h-min bg-[#F5F5F5] p-4 rounded py-10">
            <h2 className="text-xl font-semibold mb-4">Tìm Kiếm</h2>
            <input
              type="text"
              placeholder="Bạn muốn mua gì..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border rounded p-2 w-full mb-4 focus:border-transparent focus:outline-none focus:ring-0"
            />
            <h2 className="text-xl font-semibold mb-4">Danh Mục</h2>
            <Menu mode="inline" className="space-y-2">
              <Menu.SubMenu
                key="sub1"
                title="Ống hút từ tre"
                className="no-arrow"
              >
                <Menu.Item key="1" className="pl-8">
                  Ống hút từ tre 1
                </Menu.Item>
                <Menu.Item key="2" className="pl-8">
                  Ống hút từ tre 2
                </Menu.Item>
                <Menu.Item key="3" className="pl-8">
                  Ống hút từ tre 3
                </Menu.Item>
              </Menu.SubMenu>
              <Menu.Item key="4">Ống hút từ cau</Menu.Item>
              <Menu.Item key="5">Ống hút từ gỗ</Menu.Item>
              <Menu.Item key="5">Ống hút từ nhựa</Menu.Item>
              <Menu.Item key="5">Ống hút từ nứa</Menu.Item>
            </Menu>
            {/* Đánh giá */}
            <h2 className="text-xl font-semibold mt-6 mb-4">Đánh Giá</h2>
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((star) => (
                <div key={star} className="flex items-center space-x-2">
                  <Checkbox className="mr-2" />
                  {/* Sao đã chọn */}
                  <div className="flex items-center">
                    {[...Array(star)].map((_, i) => (
                      <FontAwesomeIcon
                        key={i}
                        icon={faStar}
                        className="text-yellow-400 mr-1"
                      />
                    ))}
                    {/* Sao chưa chọn */}
                    {[...Array(5 - star)].map((_, i) => (
                      <FontAwesomeIcon
                        key={i}
                        icon={faStar}
                        className="text-gray-300 mr-1"
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-gray-700">{star} sao</span>
                </div>
              ))}
            </div>
          </aside>

          {/* Khu vực sản phẩm bên phải */}
          <main className="w-3/4 px-8 rounded">
            {/* Header với các button và dropdown */}
            <div className="flex items-center justify-between mb-4 mt-0 bg-[#F5F5F5] px-5 py-3">
              <div className="flex space-x-4">
                <Button
                  type={activeButton === "popular" ? "primary" : "default"}
                  onClick={() => handleButtonClick("popular")}
                >
                  Phổ biến
                </Button>
                <Button
                  type={activeButton === "latest" ? "primary" : "default"}
                  onClick={() => handleButtonClick("latest")}
                >
                  Mới nhất
                </Button>
                <Button
                  type={activeButton === "best-seller" ? "primary" : "default"}
                  onClick={() => handleButtonClick("best-seller")}
                >
                  Bán chạy
                </Button>
              </div>
              <Dropdown overlay={sortOptions} trigger={["click"]}>
                <Button>
                  Bộ lọc <FontAwesomeIcon icon={faStar} className="ml-2" />
                </Button>
              </Dropdown>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 rounded cursor-pointer">
              {paginatedProducts.map((product) => (
                <div
                  key={product.id}
                  className="border rounded overflow-hidden shadow-md flex flex-col"
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={150}
                    height={100}
                    className="object-cover w-full h-45"
                  />
                  <div className="p-4 flex-1">
                    <h3 className="text-lg font-semibold mb-2">
                      {product.name}
                    </h3>
                    <p className="text-brand-primary mb-2 font-bold">
                      {product.price}đ
                    </p>
                    <p className="text-gray-700 mb-2">{product.description}</p>
                    <div className="flex justify-between">
                      <div className="flex items-center mb-2">
                        <FontAwesomeIcon
                          icon={faStar}
                          className="text-yellow-400 mr-1"
                        />
                        <FontAwesomeIcon
                          icon={faStar}
                          className="text-yellow-400 mr-1"
                        />
                        <FontAwesomeIcon
                          icon={faStar}
                          className="text-yellow-400 mr-1"
                        />
                        <FontAwesomeIcon
                          icon={faStar}
                          className="text-yellow-400 mr-1"
                        />
                        <FontAwesomeIcon
                          icon={faStar}
                          className="text-gray-300"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <FontAwesomeIcon
                          icon={
                            likedProducts.has(product.id)
                              ? faHeartFilled
                              : faHeartEmpty
                          }
                          className={`cursor-pointer ${
                            likedProducts.has(product.id)
                              ? "text-red-500"
                              : "text-gray-500"
                          }`}
                          onClick={() => toggleLike(product.id)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Phân trang */}
            <div className="flex justify-center mt-8 space-x-2">
              {renderPagination()}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
