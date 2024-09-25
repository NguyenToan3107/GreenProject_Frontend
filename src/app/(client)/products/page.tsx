"use client";
import { SetStateAction, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faStar,
  faHeart as faHeartEmpty,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartFilled } from "@fortawesome/free-solid-svg-icons";
import {
  Button,
  Dropdown,
  Menu,
  Checkbox,
  Pagination,
  Image,
  Spin,
  Rate,
} from "antd";
import "../../../app/globals.css";
import "antd/dist/reset.css";
import { PRODUCT_ITEM_PAGE_SIZE } from "@/app/util/constant";
import {
  getAllProductsView,
  getProductOnTopSold,
} from "@/apis/modules/product";
import Link from "next/link";
import { getAllCategoriesParent } from "@/apis/modules/category";

const sortOptions = (
  <Menu>
    <Menu.Item key="1">Tất cả</Menu.Item>
    <Menu.Item key="2">Danh mục 1</Menu.Item>
    <Menu.Item key="3">Danh mục 2</Menu.Item>
  </Menu>
);

export default function page() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeButton, setActiveButton] = useState("popular");
  const [likedProducts, setLikedProducts] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [productsView, setProductsView] = useState([]);
  const [categoriesView, setCategoriesView] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchProduct = async (page: number) => {
    setLoading(true);
    const res: any = await getAllProductsView(page);
    setLoading(false);
    if (res.code == 200) {
      console.log(res);
      setProductsView(res.data.content);
      setCurrentPage(res.data.currentPage);
      setTotal(res.data.totalElements);
    }
  };

  const fetchProductOnTopSold = async (limit: number) => {
    setLoading(true);
    const res: any = await getProductOnTopSold(limit);
    setLoading(false);
    if (res.code == 200) {
      console.log(res);
      // setProductsView(res.data.content);
      // setCurrentPage(res.data.currentPage);
      // setTotal(res.data.totalElements);
    }
  };

  const fetchCategory = async () => {
    setLoading(true);
    const res: any = await getAllCategoriesParent();
    setLoading(false);
    if (res.code == 200) {
      setCategoriesView(res.data);
    }
  };

  useEffect(() => {
    fetchProduct(currentPage);
    fetchCategory();
  }, []);

  useEffect(() => {}, [searchQuery]);

  const handleButtonClick = async (buttonType: SetStateAction<string>) => {
    setActiveButton(buttonType);
    console.log(buttonType);
    if (buttonType == "latest") {
    } else if (buttonType == "best-seller") {
      await fetchProductOnTopSold(15);
    } else {
      await fetchProduct(1);
    }
  };

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

  const handlePageChange = async (value: any) => {
    await fetchProduct(value);
  };

  // Hàm đệ quy để render các category con
  const renderMenuItems = (category: any) => {
    if (category.children && category.children.length > 0) {
      return (
        <Menu.SubMenu
          key={category.id}
          title={category.name}
          style={{ color: "#4BAF47" }}
        >
          {category.children.map((child: any) => renderMenuItems(child))}
        </Menu.SubMenu>
      );
    } else {
      return <Menu.Item key={category.id}>{category.name}</Menu.Item>;
    }
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
              {categoriesView.map((category: any) => renderMenuItems(category))}
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
            {loading ? (
              <div className="flex justify-center items-center h-screen">
                <Spin size="large" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 rounded cursor-pointer">
                {productsView.map((product: any) => (
                  <Link href={`/products/${product.id}`}>
                    <div
                      key={product.id}
                      className="border rounded overflow-hidden shadow-md flex flex-col"
                    >
                      <img
                        src={product.images[1].url}
                        alt={product.name}
                        className="object-cover w-full h-45 object-center aspect-square"
                      />
                      <div className="p-4 flex-1">
                        <h3 className="text-lg font-semibold mb-2 whitespace-nowrap overflow-hidden text-ellipsis">
                          {product.name}
                        </h3>
                        <p className="text-brand-primary mb-2 font-bold">
                          {product.minPrice}đ-{product.maxPrice}đ
                        </p>
                        <div className="flex justify-between">
                          <div className="flex items-center mb-2">
                            <Rate
                              allowHalf
                              defaultValue={product.avgRating}
                              disabled
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
                  </Link>
                ))}
              </div>
            )}

            {/* Phân trang */}
            <div className="flex justify-center mt-8 space-x-2">
              <Pagination
                onChange={handlePageChange}
                defaultCurrent={currentPage}
                defaultPageSize={PRODUCT_ITEM_PAGE_SIZE}
                total={total}
              />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
