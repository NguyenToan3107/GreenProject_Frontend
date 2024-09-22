"use client";

import "./home.css";
import { register } from 'swiper/element/bundle';
import { Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Button, Divider, Flex, Radio,Col, Row,Card } from 'antd';
// register Swiper custom elements
register();

export default function page() {
  async function logout() {}

  async function getCategories() {}
  //console.log(getLocalStorage("user_data"))

  return (
    <div>
      <div
        className="container"
        style={{ width: "1200px", marginRight: "auto", marginLeft: "auto" }}
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
            <button
              className="common-button">
              Mua ngay
            </button>
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
                  src="/client/products/product2.png"
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
                  src="/client/products/product2.png"
                  className="image"
                  alt="Product 3"
                />
              </div>
              <div className="grid-item">
                <img
                  src="/client/products/product2.png"
                  className="image"
                  alt="Product 4"
                />
              </div>
              <div className="grid-item">
                <img
                  src="/client/products/product2.png"
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
                  src="/client/products/product2.png"
                  className="image"
                  alt="Product 6"
                />
              </div>
              <div className="grid-item">
                <img
                  src="/client/products/product2.png"
                  className="image"
                  alt="Product 7"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="service-container mt-10">
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
              objectFit: "contain",
              objectPosition: "center",
            }}
          >
            <div className="flex flex-col items-center">
              <h2>40 Trieu</h2>
              <p style={{ zIndex: "9999" }}>Ong hut duoc thay the</p>
            </div>
          </div>
          <div style={{ gridArea: "image2", display: "flex" }}>
            <img
              src="client/products/blog_3.jpg"
              style={{
                objectFit: "cover",
                borderRadius: "0.2rem",
                width: "100%",
                height: "285px",
              }}
              alt="Blog 1"
            />
          </div>
          <div style={{ gridArea: "image3", display: "flex" }}>
            <img
              src="client/products/blog_1.jpg"
              style={{
                objectFit: "cover",
                borderRadius: "0.2rem",
                width: "100%",
                height: "285px",
              }}
              alt="Blog 1"
            />
          </div>
          <div style={{ gridArea: "image4", display: "flex" }}>
            <img
              src="client/products/blog_4.jpeg"
              style={{
                objectFit: "cover",
                borderRadius: "0.2rem",
                width: "100%",
                height: "285px",
              }}
              alt="Blog 1"
            />
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
            <h2 style={{ textTransform: "uppercase", color: "#fff" ,fontSize:'2rem',fontWeight:'600'}}>
              Best Selling Products
            </h2>
            <Flex  gap={"middle"} justify="space-between" align="center">
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
          style={{marginBottom:'2rem'}}
          spaceBetween={10}
          slidesPerView={4}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }}
          loop={true}
          className="mySwiper"
          >
             <SwiperSlide>
              <Card hoverable>
                <div className="best-seller-card-item">
                  <a style={{ display: "flex" }}>
                    <img
                      src="client/products/product2.png"
                      style={{
                        borderRadius: "6px",
                        objectFit: "contain",
                        width: "100%",
                        height: "250px",
                      }}
                      alt="Best Seller 1"
                    />
                  </a>
                  <Flex vertical align="start">
                    <div style={{ fontSize: "1.2rem", fontWeight: "600",whiteSpace:'nowrap',textOverflow:'ellipsis',overflow:'hidden'}}>
                      Khay tre tiện lợi
                    </div>
                    <div style={{ color: "#4BAF47", fontWeight: "600" }}>
                      300,000đ
                    </div>
                    <div className="item-description">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Molestiae, illo saepe. Repellendus dolores ad odit
                      voluptatibus ipsum corrupti, dicta harum dolore, numquam illum
                      sapiente maxime nostrum mollitia officiis illo nam.
                    </div>
                    <div className="star">
                      <img src="images/star.png" style={{width:'1rem'}} alt="Star 1" />
                      <img src="images/star.png" style={{width:'1rem'}} alt="Star 2" />
                      <img src="images/star.png" style={{width:'1rem'}} alt="Star 3" />
                      <img src="images/star.png" style={{width:'1rem'}} alt="Star 4" />
                      <img src="images/no-star.png" style={{width:'1rem'}} alt="No Star" />
                    </div>
                  </Flex>
                </div>
              </Card>
             </SwiperSlide>
             <SwiperSlide>
              <Card hoverable>
                <div className="best-seller-card-item">
                  <a style={{ display: "flex" }}>
                    <img
                      src="client/products/product2.png"
                      style={{
                        borderRadius: "6px",
                        objectFit: "contain",
                        width: "100%",
                        height: "250px",
                      }}
                      alt="Best Seller 1"
                    />
                  </a>
                  <Flex vertical align="start">
                    <div style={{ fontSize: "1.2rem", fontWeight: "600",whiteSpace:'nowrap',textOverflow:'ellipsis',overflow:'hidden'}}>
                      Khay tre tiện lợi
                    </div>
                    <div style={{ color: "#4BAF47", fontWeight: "600" }}>
                      300,000đ
                    </div>
                    <div className="item-description">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Molestiae, illo saepe. Repellendus dolores ad odit
                      voluptatibus ipsum corrupti, dicta harum dolore, numquam illum
                      sapiente maxime nostrum mollitia officiis illo nam.
                    </div>
                    <div className="star">
                      <img src="images/star.png" style={{width:'1rem'}} alt="Star 1" />
                      <img src="images/star.png" style={{width:'1rem'}} alt="Star 2" />
                      <img src="images/star.png" style={{width:'1rem'}} alt="Star 3" />
                      <img src="images/star.png" style={{width:'1rem'}} alt="Star 4" />
                      <img src="images/no-star.png" style={{width:'1rem'}} alt="No Star" />
                    </div>
                  </Flex>
                </div>
              </Card>
             </SwiperSlide>
             <SwiperSlide>
              <Card hoverable>
                <div className="best-seller-card-item">
                  <a style={{ display: "flex" }}>
                    <img
                      src="client/products/product2.png"
                      style={{
                        borderRadius: "6px",
                        objectFit: "contain",
                        width: "100%",
                        height: "250px",
                      }}
                      alt="Best Seller 1"
                    />
                  </a>
                  <Flex vertical align="start">
                    <div style={{ fontSize: "1.2rem", fontWeight: "600",whiteSpace:'nowrap',textOverflow:'ellipsis',overflow:'hidden'}}>
                      Khay tre tiện lợi
                    </div>
                    <div style={{ color: "#4BAF47", fontWeight: "600" }}>
                      300,000đ
                    </div>
                    <div className="item-description">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Molestiae, illo saepe. Repellendus dolores ad odit
                      voluptatibus ipsum corrupti, dicta harum dolore, numquam illum
                      sapiente maxime nostrum mollitia officiis illo nam.
                    </div>
                    <div className="star">
                      <img src="images/star.png" style={{width:'1rem'}} alt="Star 1" />
                      <img src="images/star.png" style={{width:'1rem'}} alt="Star 2" />
                      <img src="images/star.png" style={{width:'1rem'}} alt="Star 3" />
                      <img src="images/star.png" style={{width:'1rem'}} alt="Star 4" />
                      <img src="images/no-star.png" style={{width:'1rem'}} alt="No Star" />
                    </div>
                  </Flex>
                </div>
              </Card>
             </SwiperSlide>
             <SwiperSlide>
              <Card hoverable>
                <div className="best-seller-card-item">
                  <a style={{ display: "flex" }}>
                    <img
                      src="client/products/product2.png"
                      style={{
                        borderRadius: "6px",
                        objectFit: "contain",
                        width: "100%",
                        height: "250px",
                      }}
                      alt="Best Seller 1"
                    />
                  </a>
                  <Flex vertical align="start">
                    <div style={{ fontSize: "1.2rem", fontWeight: "600",whiteSpace:'nowrap',textOverflow:'ellipsis',overflow:'hidden'}}>
                      Khay tre tiện lợi
                    </div>
                    <div style={{ color: "#4BAF47", fontWeight: "600" }}>
                      300,000đ
                    </div>
                    <div className="item-description">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Molestiae, illo saepe. Repellendus dolores ad odit
                      voluptatibus ipsum corrupti, dicta harum dolore, numquam illum
                      sapiente maxime nostrum mollitia officiis illo nam.
                    </div>
                    <div className="star">
                      <img src="images/star.png" style={{width:'1rem'}} alt="Star 1" />
                      <img src="images/star.png" style={{width:'1rem'}} alt="Star 2" />
                      <img src="images/star.png" style={{width:'1rem'}} alt="Star 3" />
                      <img src="images/star.png" style={{width:'1rem'}} alt="Star 4" />
                      <img src="images/no-star.png" style={{width:'1rem'}} alt="No Star" />
                    </div>
                  </Flex>
                </div>
              </Card>
             </SwiperSlide>
             <SwiperSlide>
              <Card hoverable>
                <div className="best-seller-card-item">
                  <a style={{ display: "flex" }}>
                    <img
                      src="client/products/product2.png"
                      style={{
                        borderRadius: "6px",
                        objectFit: "contain",
                        width: "100%",
                        height: "250px",
                      }}
                      alt="Best Seller 1"
                    />
                  </a>
                  <Flex vertical align="start">
                    <div style={{ fontSize: "1.2rem", fontWeight: "600",whiteSpace:'nowrap',textOverflow:'ellipsis',overflow:'hidden'}}>
                      Khay tre tiện lợi
                    </div>
                    <div style={{ color: "#4BAF47", fontWeight: "600" }}>
                      300,000đ
                    </div>
                    <div className="item-description">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Molestiae, illo saepe. Repellendus dolores ad odit
                      voluptatibus ipsum corrupti, dicta harum dolore, numquam illum
                      sapiente maxime nostrum mollitia officiis illo nam.
                    </div>
                    <div className="star">
                      <img src="images/star.png" style={{width:'1rem'}} alt="Star 1" />
                      <img src="images/star.png" style={{width:'1rem'}} alt="Star 2" />
                      <img src="images/star.png" style={{width:'1rem'}} alt="Star 3" />
                      <img src="images/star.png" style={{width:'1rem'}} alt="Star 4" />
                      <img src="images/no-star.png" style={{width:'1rem'}} alt="No Star" />
                    </div>
                  </Flex>
                </div>
              </Card>
             </SwiperSlide>
          </Swiper>
        </div>

        <h2 style={{textTransform:'uppercase',fontSize:'2rem',fontWeight:'600',textAlign:'center',marginTop:'4rem'}}>project team</h2>
        <Swiper
        style={{marginBottom:'2rem',padding:'1rem'}}
        spaceBetween={20}
        slidesPerView={4}
        navigation={true}
        pagination={{
          clickable:true
        }}
        modules={[Pagination, Navigation]}
         className="teamSwiper"
      >
        <SwiperSlide>
          <Card hoverable >
            <div className="box">
                  <img src="/client/products/product2.png" alt="Developer 1"/>
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
                  <img src="/client/products/product2.png" alt="Developer 1"/>
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
                  <img src="/client/products/product2.png" alt="Developer 1"/>
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
                  <img src="/client/products/product2.png" alt="Developer 1"/>
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
                  <img src="/client/products/product2.png" alt="Developer 1"/>
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
                  <img src="/client/products/product2.png" alt="Developer 1"/>
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
                  <img src="/client/products/product2.png" alt="Developer 1"/>
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
                  <img src="/client/products/product2.png" alt="Developer 1"/>
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
