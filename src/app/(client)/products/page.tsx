"use client";
import { SetStateAction, useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faHeart as faHeartEmpty,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartFilled } from "@fortawesome/free-solid-svg-icons";
import { Button, Dropdown, Menu } from "antd";
import "../../../app/globals.css";
import "antd/dist/reset.css";

const products = [
  // Dữ liệu sản phẩm mẫu
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
  const [searchQuery, setSearchQuery] = useState("");
  const [activeButton, setActiveButton] = useState("popular");
  const [likedProducts, setLikedProducts] = useState(new Set());

  const handleButtonClick = (buttonType: SetStateAction<string>) => {
    setActiveButton(buttonType);
  };

  const filteredProducts = products.filter((product) =>
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

  return (
    <div className="flex flex-col mt-5 px-4 mb-32">
      <div className="flex">
        {/* Thanh bên trái */}
        <aside className="w-1/4 bg-[#F5F5F5] p-4 rounded">
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
            <Menu.SubMenu key="sub1" title="Danh mục 1" className="no-arrow">
              <Menu.Item key="1" className="pl-8">
                Danh mục con 1
              </Menu.Item>
              <Menu.Item key="2" className="pl-8">
                Danh mục con 2
              </Menu.Item>
              <Menu.Item key="3" className="pl-8">
                Danh mục con 3
              </Menu.Item>
            </Menu.SubMenu>
            <Menu.Item key="4">Danh mục 2</Menu.Item>
            <Menu.Item key="5">Danh mục 3</Menu.Item>
          </Menu>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 rounded cursor-pointer">
            {filteredProducts.slice(0, 9).map((product) => (
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
                  <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
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
        </main>
      </div>
    </div>
  );
}
