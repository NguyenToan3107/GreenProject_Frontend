"use client";
import { logoutRequest } from "@/apis/modules/auth";
import { getAllCategories } from "@/apis/modules/category";
import Footer from "@/app/(client)/_components/Footer";
import "./home.css";
import {
  getLocalStorage,
  removeLocalStorage,
} from "@/app/util/localStorageUtils";
import { Button } from "antd";

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
              style={{
                display: "inline-block",
                backgroundColor: "#4BAF47",
                color: "#fff",
                padding: "0.6rem 1rem",
                borderStyle: "none",
                borderRadius: "0.3rem",
                width: "auto",
              }}
            >
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
            <h2 style={{ textTransform: "uppercase", color: "#fff" }}>
              Best Selling Products
            </h2>
            <div className="slider-btn">
              <div className="btn-left">
                <img
                  src="images/left-arrow.png"
                  width="32px"
                  alt="Left Arrow"
                />
              </div>
              <div className="btn-right">
                <img
                  src="images/right-arrow.png"
                  width="32px"
                  style={{ transform: "rotate(180deg)" }}
                  alt="Right Arrow"
                />
              </div>
            </div>
          </div>

          <div className="best-seller-cards">
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
              <div>
                <div style={{ fontSize: "1.2rem", fontWeight: "600" }}>
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
                  <img src="images/star.png" alt="Star 1" />
                  <img src="images/star.png" alt="Star 2" />
                  <img src="images/star.png" alt="Star 3" />
                  <img src="images/star.png" alt="Star 4" />
                  <img src="images/no-star.png" alt="No Star" />
                </div>
              </div>
            </div>
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
              <div>
                <div style={{ fontSize: "1.2rem", fontWeight: "600" }}>
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
                  <img src="images/star.png" alt="Star 1" />
                  <img src="images/star.png" alt="Star 2" />
                  <img src="images/star.png" alt="Star 3" />
                  <img src="images/star.png" alt="Star 4" />
                  <img src="images/no-star.png" alt="No Star" />
                </div>
              </div>
            </div>
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
              <div>
                <div style={{ fontSize: "1.2rem", fontWeight: "600" }}>
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
                  <img src="images/star.png" alt="Star 1" />
                  <img src="images/star.png" alt="Star 2" />
                  <img src="images/star.png" alt="Star 3" />
                  <img src="images/star.png" alt="Star 4" />
                  <img src="images/no-star.png" alt="No Star" />
                </div>
              </div>
            </div>
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
              <div>
                <div style={{ fontSize: "1.2rem", fontWeight: "600" }}>
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
                  <img src="images/star.png" alt="Star 1" />
                  <img src="images/star.png" alt="Star 2" />
                  <img src="images/star.png" alt="Star 3" />
                  <img src="images/star.png" alt="Star 4" />
                  <img src="images/no-star.png" alt="No Star" />
                </div>
              </div>
            </div>
            {/* Repeat other best-seller-card-items */}
          </div>
        </div>

        <div className="container">
          <div className="header">PROJECT TEAM</div>
          <div className="boxes">
            <div className="box">
              <img src="images/image1.png" alt="Developer 1" />
              <div className="box-content">
                <div className="box-name">Anna Laura</div>
                <div>Developer</div>
              </div>
            </div>
            <div className="box">
              <img src="images/image1.png" alt="Developer 2" />
              <div className="box-content">
                <div className="box-name">Anna Laura</div>
                <div>Developer</div>
              </div>
            </div>
            <div className="box">
              <img src="images/image1.png" alt="Developer 3" />
              <div className="box-content">
                <div className="box-name">Anna Laura</div>
                <div>Developer</div>
              </div>
            </div>
            <div className="box">
              <img src="images/image1.png" alt="Developer 4" />
              <div className="box-content">
                <div className="box-name">Anna Laura</div>
                <div>Developer</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
