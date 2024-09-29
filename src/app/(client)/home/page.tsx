"use client";

import "./home.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import React, { useEffect, useState } from "react";
import { Flex, Card,Rate } from "antd";
import { register } from "swiper/element/bundle";
import { Pagination, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import {useProductStore} from "@/app/store/ProductStore";
// register Swiper custom elements
register();

export default function page() {

  const {
    productItemOnTopSold,
    getProductOnTopSold,
  } = useProductStore((state) => state);

  const fetchProductItemOnTopSold=async ()=>{

     const res:any = await getProductOnTopSold();
     console.log(res)
     if(res.code == 200){
      console.log(productItemOnTopSold)
     }
  }

  function currencyFormat(num: number) {
    return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' VNĐ'
 }


  useEffect(() => {
    if (!productItemOnTopSold || productItemOnTopSold.length === 0) {
      fetchProductItemOnTopSold(); 
    }
  }, []); 


  return (
    <div>
      <div
        className="container"
        style={{ width: "1440px", marginRight: "auto", marginLeft: "auto",marginTop:'5rem',marginBottom:'4rem' }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
              justifyContent: "center",
              maxWidth: "550px",
            }}
          >
            <h1
              style={{
                fontSize: "4rem",
                marginBottom: "1rem",
                fontWeight: 700,
                lineHeight: 1.1,
              }}
            >
              Increase Your Modern Life With{" "}
              <span style={{ color: "#4BAF47", whiteSpace: "nowrap" }}>
                Recycling
              </span>
            </h1>
            <div
              style={{
                fontSize: "1rem",
                fontWeight: "400",
                marginBottom: "1rem",
              }}
            >
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Repudiandae eius dolor fugiat aperiam quas,
            </div>
            <button className="common-button">Mua ngay</button>
          </div>
          <div className="grid-container">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              <div className="grid-item">
                <img
                  src="/client/products/product2.png"
                  className="image"
                  alt="Product 1"
                />
              </div>
              <div className="grid-item">
                <img
                  src="http://res.cloudinary.com/dji65jgy3/image/upload/v1726983442/df691db5-6830-41c0-8610-3529e9744e9c.jpg"
                  className="image"
                  alt="Product 2"
                />
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              <div className="grid-item">
                <img
                  src="http://res.cloudinary.com/dji65jgy3/image/upload/v1726983614/615e6891-ade8-41dd-896e-f63a01c49ed9.jpg"
                  className="image"
                  alt="Product 3"
                />
              </div>
              <div className="grid-item">
                <img
                  src="http://res.cloudinary.com/dji65jgy3/image/upload/v1726983785/965dbcf4-c2dc-4572-b328-bea636145a9c.jpg"
                  className="image"
                  alt="Product 4"
                />
              </div>
              <div className="grid-item">
                <img
                  src="http://res.cloudinary.com/dji65jgy3/image/upload/v1726983884/a411ee9a-f8b0-4f59-ac2f-b3b151bc091b.webp"
                  className="image"
                  alt="Product 5"
                />
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              <div className="grid-item">
                <img
                  src="http://res.cloudinary.com/dji65jgy3/image/upload/v1726983528/d701ef95-2370-44d7-ae9a-66d47cb5a670.jpg"
                  className="image"
                  alt="Product 6"
                />
              </div>
              <div className="grid-item">
                <img
                  src="http://res.cloudinary.com/dji65jgy3/image/upload/v1726982744/33168c13-514e-46a9-9c59-e3d026713e3b.jpg"
                  className="image"
                  alt="Product 7"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="service-container mt-15">
          <h2
            style={{
              textTransform: "uppercase",
              textAlign: "center",
              fontSize: "1.5rem",
              fontWeight: "600",
              marginBottom: "2rem",
            }}
          >
            Our service
          </h2>
          <div className="cards">
            <div className="card-item">
              <div>
                <img src="images/user.png" alt="User 1" />
              </div>
              <p className="reviewer_name">Anna Launra</p>
              <div className="reviewer-comment">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
                obcaecati suscipit omnis unde accusamus quia, labore repellat
                exercitationem porro est dolorum, molestiae voluptatum illum ad
                rerum deserunt voluptatem nostrum enim.
              </div>
              <a href="#" style={{ fontWeight: "600", color: "#4BAF47" }}>
                Know More &gt;&gt;
              </a>
            </div>
            <div className="card-item">
              <div>
                <img src="images/user.png" alt="User 1" />
              </div>
              <p className="reviewer_name">Anna Launra</p>
              <div className="reviewer-comment">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
                obcaecati suscipit omnis unde accusamus quia, labore repellat
                exercitationem porro est dolorum, molestiae voluptatum illum ad
                rerum deserunt voluptatem nostrum enim.
              </div>
              <a href="#" style={{ fontWeight: "600", color: "#4BAF47" }}>
                Know More &gt;&gt;
              </a>
            </div>
            <div className="card-item">
              <div>
                <img src="images/user.png" alt="User 1" />
              </div>
              <p className="reviewer_name">Anna Launra</p>
              <div className="reviewer-comment">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
                obcaecati suscipit omnis unde accusamus quia, labore repellat
                exercitationem porro est dolorum, molestiae voluptatum illum ad
                rerum deserunt voluptatem nostrum enim.
              </div>
              <a href="#" style={{ fontWeight: "600", color: "#4BAF47" }}>
                Know More &gt;&gt;
              </a>
            </div>
            <div className="card-item">
              <div>
                <img src="images/user.png" alt="User 1" />
              </div>
              <p className="reviewer_name">Anna Launra</p>
              <div className="reviewer-comment">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
                obcaecati suscipit omnis unde accusamus quia, labore repellat
                exercitationem porro est dolorum, molestiae voluptatum illum ad
                rerum deserunt voluptatem nostrum enim.
              </div>
              <a href="#" style={{ fontWeight: "600", color: "#4BAF47" }}>
                Know More &gt;&gt;
              </a>
            </div>
            {/* Repeat other card-items */}
          </div>
        </div>

        <div className="blog-info-container">
          <div
            style={{
              gridArea: "image1",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundImage: "url('client/products/blog_2.jpeg')",
              backgroundSize: "cover", // Hiển thị ảnh sao cho nó chứa toàn bộ trong khung
              backgroundPosition: "center", // Căn giữa ảnh
              backgroundRepeat: "no-repeat", // Không lặp lại ảnh nếu khung lớn hơn ảnh
            }}
          >
            <div className="flex flex-col items-center gap-3">
              <h2
                className="text-4xl text-white font-bold"
                style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",fontWeight:'600',fontSize:'3rem' }}
              >
                40 Triệu
              </h2>
              <p
                className="text-[1.3rem] text-white font-bold"
                style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
              >
                Ống hút được thay thế
              </p>
            </div>
          </div>

          <div style={{ gridArea: "image2", display: "flex" }}>
            <div
              style={{
                backgroundImage: "url('client/products/blog_3.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "0.2rem",
                width: "100%",
                height: "285px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div className="flex flex-col items-center gap-3">
                <h2
                  className="text-4xl text-white font-bold"
                  style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",fontWeight:'600',fontSize:'3rem' }}
                >
                  20 Tấn
                </h2>{" "}
                <p
                  className="text-[1.3rem] text-white font-bold"
                  style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
                >
                  Rác thải nhựa được giảm thiểu
                </p>
              </div>
            </div>
          </div>
          <div style={{ gridArea: "image3", display: "flex" }}>
            <div
              style={{
                backgroundImage: "url('client/products/blog_1.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "0.2rem",
                width: "100%",
                height: "285px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div className="flex flex-col items-center gap-3">
                <h2
                  className="text-4xl text-white font-bold"
                  style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",fontWeight:'600',fontSize:'3rem' }}
                >
                  50 Tấn
                </h2>{" "}
                <p
                  className="text-[1.3rem] text-white font-bold"
                  style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
                >
                  CO2 được giảm thiểu
                </p>
              </div>
            </div>
          </div>
          <div style={{ gridArea: "image4", display: "flex" }}>
            <div
              style={{
                backgroundImage: "url('client/products/blog_4.jpeg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderRadius: "0.2rem",
                width: "100%",
                height: "285px",
                display: "flex", // Sử dụng Flexbox để căn giữa nội dung
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div className="flex flex-col items-center gap-3">
                <h2
                  className="text-4xl text-white font-bold"
                  style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",fontWeight:'600',fontSize:'3rem' }}
                >
                  100
                </h2>{" "}
                <p
                  className="text-[1.3rem] text-white font-bold"
                  style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
                >
                  Việc làm cho bà con nông dân
                </p>{" "}
              </div>
            </div>
          </div>
          {/* Repeat other images */}
        </div>

        <div className="best-seller-container">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h2
              style={{
                textTransform: "uppercase",
                color: "#fff",
                fontSize: "2rem",
                fontWeight: "600",
              }}
            >
              Best Selling Products
            </h2>
            <Flex gap={"middle"} justify="space-between" align="center">
              <div className="swiper-button-prev">
                <img
                  src="images/left-arrow.png"
                  width="32px"
                  alt="Left Arrow"
                />
              </div>
              <div className="swiper-button-next">
                <img
                  src="images/right-arrow.png"
                  width="32px"
                  style={{ transform: "rotate(180deg)" }}
                  alt="Right Arrow"
                />
              </div>
            </Flex>
          </div>
          <Swiper
            style={{ marginBottom: "2rem" }}
            spaceBetween={10}
            slidesPerView={4}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            loop={true}
            className="mySwiper"
          >
            {productItemOnTopSold.map((product) => (
            <SwiperSlide key={product.id}>
              <Card hoverable>
                <div className="best-seller-card-item">
                  <a style={{ display: "flex" }}>
                    <img
                      src={product.images[0].url}
                      style={{
                        borderRadius: "6px",
                        objectFit: "contain",
                        width: "100%",
                        height: "250px",
                      }}
                      alt={product.name}
                    />
                  </a>
                  <Flex vertical align="start">
                    <div
                      style={{
                        fontSize: "1.2rem",
                        fontWeight: "600",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                      }}
                    >
                      {product.name}
                    </div>
                    <div style={{ color: "#4BAF47", fontWeight: "600" }}>
                      {currencyFormat(product.minPrice)} - {currencyFormat(product.maxPrice)}
                    </div>
                    <div className="item-description">
                      {product.description}
                    </div>
                    <div className="star">
                      <Flex gap="middle" vertical>
                        <Rate value={product.avgRating} />
                      </Flex>
                    </div>
                  </Flex>
                </div>
              </Card>
            </SwiperSlide>))}
          </Swiper>
        </div>

        <h2
          style={{
            textTransform: "uppercase",
            fontSize: "2rem",
            fontWeight: "600",
            textAlign: "center",
            marginTop: "4rem",
          }}
        >
          project team
        </h2>
        <Swiper
          style={{ marginBottom: "2rem", padding: "1rem" }}
          spaceBetween={20}
          slidesPerView={4}
          navigation={true}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination, Navigation]}
          className="teamSwiper"
        >
          <SwiperSlide>
            <Card hoverable>
              <div className="box">
                <img src="/client/products/product2.png" alt="Developer 1" />
                <div className="box-content">
                  <div className="box-name">Anna Laura</div>
                  <div>Developer</div>
                </div>
              </div>
            </Card>
          </SwiperSlide>
          <SwiperSlide>
            <Card hoverable>
              <div className="box">
                <img src="/client/products/product2.png" alt="Developer 1" />
                <div className="box-content">
                  <div className="box-name">Anna Laura</div>
                  <div>Developer</div>
                </div>
              </div>
            </Card>
          </SwiperSlide>
          <SwiperSlide>
            <Card hoverable>
              <div className="box">
                <img src="/client/products/product2.png" alt="Developer 1" />
                <div className="box-content">
                  <div className="box-name">Anna Laura</div>
                  <div>Developer</div>
                </div>
              </div>
            </Card>
          </SwiperSlide>
          <SwiperSlide>
            <Card hoverable>
              <div className="box">
                <img src="/client/products/product2.png" alt="Developer 1" />
                <div className="box-content">
                  <div className="box-name">Anna Laura</div>
                  <div>Developer</div>
                </div>
              </div>
            </Card>
          </SwiperSlide>
          <SwiperSlide>
            <Card hoverable>
              <div className="box">
                <img src="/client/products/product2.png" alt="Developer 1" />
                <div className="box-content">
                  <div className="box-name">Anna Laura</div>
                  <div>Developer</div>
                </div>
              </div>
            </Card>
          </SwiperSlide>
          <SwiperSlide>
            <Card hoverable>
              <div className="box">
                <img src="/client/products/product2.png" alt="Developer 1" />
                <div className="box-content">
                  <div className="box-name">Anna Laura</div>
                  <div>Developer</div>
                </div>
              </div>
            </Card>
          </SwiperSlide>
          <SwiperSlide>
            <Card hoverable>
              <div className="box">
                <img src="/client/products/product2.png" alt="Developer 1" />
                <div className="box-content">
                  <div className="box-name">Anna Laura</div>
                  <div>Developer</div>
                </div>
              </div>
            </Card>
          </SwiperSlide>
          <SwiperSlide>
            <Card hoverable>
              <div className="box">
                <img src="/client/products/product2.png" alt="Developer 1" />
                <div className="box-content">
                  <div className="box-name">Anna Laura</div>
                  <div>Developer</div>
                </div>
              </div>
            </Card>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}
