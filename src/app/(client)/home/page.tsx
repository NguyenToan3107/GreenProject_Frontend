"use client";
import { logoutRequest } from "@/apis/modules/auth";
import { getAllCategories } from "@/apis/modules/category";
import Footer from "@/app/(client)/_components/Footer";
import './home.css';
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
      <Button type="primary" onClick={logout}>
        Log out
      </Button>
      <button onClick={getCategories}>Get category</button>
      
      <div className="container" style={{ width: '1200px', marginRight: 'auto', marginLeft: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'center', maxWidth: '550px' }}>
          <h1 style={{ fontSize: '4rem', marginBottom: '1rem' }}>
            Increase Your Modern Life With <span style={{ color: '#4BAF47', whiteSpace: 'nowrap' }}>Recycling</span>
          </h1>
          <div style={{ fontSize: '1rem', fontWeight: '400', marginBottom: '1rem' }}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repudiandae eius dolor fugiat aperiam quas,
          </div>
          <button style={{ display: 'inline-block', backgroundColor: '#4BAF47', color: '#fff', padding: '0.6rem 1rem', borderStyle: 'none', borderRadius: '0.3rem', width: 'auto' }}>
            Mua ngay
          </button>
        </div>
        <div className="grid-container">
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: '16px' }}>
            <div className="grid-item"><img src="images/ẢNH BÌA.jpg" className="image" alt="Product 1" /></div>
            <div className="grid-item"><img src="images/ẢNH BÌA.jpg" className="image" alt="Product 2" /></div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: '16px' }}>
            <div className="grid-item"><img src="images/ẢNH BÌA.jpg" className="image" alt="Product 3" /></div>
            <div className="grid-item"><img src="images/ẢNH BÌA.jpg" className="image" alt="Product 4" /></div>
            <div className="grid-item"><img src="images/ẢNH BÌA.jpg" className="image" alt="Product 5" /></div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: '16px' }}>
            <div className="grid-item"><img src="images/ẢNH BÌA.jpg" className="image" alt="Product 6" /></div>
            <div className="grid-item"><img src="images/ẢNH BÌA.jpg" className="image" alt="Product 7" /></div>
          </div>
        </div>
      </div>

      <div className="service-container">
        <h2 style={{ textTransform: 'uppercase', textAlign: 'center', marginBottom: '2rem' }}>Our service</h2>
        <div className="cards">
          <div className="card-item">
            <div><img src="images/user.png" alt="User 1" /></div>
            <p className="reviewer_name">Anna Launra</p>
            <div className="reviewer-comment">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse obcaecati suscipit omnis unde accusamus quia,
              labore repellat exercitationem porro est dolorum, molestiae voluptatum illum ad rerum deserunt voluptatem
              nostrum enim.
            </div>
            <a href="#" style={{ fontWeight: '600', color: '#4BAF47' }}>Know More &gt;&gt;</a>
          </div>
          <div className="card-item">
            <div><img src="images/user.png" alt="User 1" /></div>
            <p className="reviewer_name">Anna Launra</p>
            <div className="reviewer-comment">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse obcaecati suscipit omnis unde accusamus quia,
              labore repellat exercitationem porro est dolorum, molestiae voluptatum illum ad rerum deserunt voluptatem
              nostrum enim.
            </div>
            <a href="#" style={{ fontWeight: '600', color: '#4BAF47' }}>Know More &gt;&gt;</a>
          </div>
          <div className="card-item">
            <div><img src="images/user.png" alt="User 1" /></div>
            <p className="reviewer_name">Anna Launra</p>
            <div className="reviewer-comment">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse obcaecati suscipit omnis unde accusamus quia,
              labore repellat exercitationem porro est dolorum, molestiae voluptatum illum ad rerum deserunt voluptatem
              nostrum enim.
            </div>
            <a href="#" style={{ fontWeight: '600', color: '#4BAF47' }}>Know More &gt;&gt;</a>
          </div>
          <div className="card-item">
            <div><img src="images/user.png" alt="User 1" /></div>
            <p className="reviewer_name">Anna Launra</p>
            <div className="reviewer-comment">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse obcaecati suscipit omnis unde accusamus quia,
              labore repellat exercitationem porro est dolorum, molestiae voluptatum illum ad rerum deserunt voluptatem
              nostrum enim.
            </div>
            <a href="#" style={{ fontWeight: '600', color: '#4BAF47' }}>Know More &gt;&gt;</a>
          </div>
          {/* Repeat other card-items */}
        </div>
      </div>

      <div className="blog-info-container">
        <div style={{ gridArea: 'image1', display: 'flex' }}>
          <img src="images/ẢNH BÌA.jpg" style={{ objectFit: 'cover', borderRadius: '0.2rem',width:'100%', height:'285px' }} alt="Blog 1" />
        </div>
        <div style={{ gridArea: 'image2', display: 'flex' }}>
          <img src="images/ẢNH BÌA.jpg" style={{ objectFit: 'cover', borderRadius: '0.2rem',width:'100%', height:'285px' }} alt="Blog 1" />
        </div>
        <div style={{ gridArea: 'image3', display: 'flex' }}>
          <img src="images/ẢNH BÌA.jpg" style={{ objectFit: 'cover', borderRadius: '0.2rem',width:'100%', height:'285px' }} alt="Blog 1" />
        </div>
        <div style={{ gridArea: 'image4', display: 'flex' }}>
          <img src="images/ẢNH BÌA.jpg" style={{ objectFit: 'cover', borderRadius: '0.2rem',width:'100%', height:'285px' }} alt="Blog 1" />
        </div>
        {/* Repeat other images */}
      </div>

      <div className="best-seller-container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ textTransform: 'uppercase', color: '#fff' }}>Best Selling Products</h2>
          <div className="slider-btn">
            <div className="btn-left">
              <img src="images/left-arrow.png" width="32px" alt="Left Arrow" />
            </div>
            <div className="btn-right">
              <img src="images/right-arrow.png" width="32px" style={{ transform: 'rotate(180deg)' }} alt="Right Arrow" />
            </div>
          </div>
        </div>

        <div className="best-seller-cards">
        <div className="best-seller-card-item">
            <a style={{ display: 'flex' }}>
              <img src="images/ẢNH BÌA.jpg" style={{ borderRadius: '6px', objectFit: 'contain',width:'100%' ,height:'250px' }} alt="Best Seller 1" />
            </a>
            <div>
              <div style={{ fontSize: '1.2rem', fontWeight: '600' }}>Khay tre tiện lợi</div>
              <div style={{ color: '#4BAF47', fontWeight: '600' }}>300,000đ</div>
              <div className="item-description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, illo saepe.
                Repellendus dolores ad odit voluptatibus ipsum corrupti, dicta harum dolore,
                numquam illum sapiente maxime nostrum mollitia officiis illo nam.
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
            <a style={{ display: 'flex' }}>
              <img src="images/ẢNH BÌA.jpg" style={{ borderRadius: '6px', objectFit: 'contain',width:'100%' ,height:'250px' }} alt="Best Seller 1" />
            </a>
            <div>
              <div style={{ fontSize: '1.2rem', fontWeight: '600' }}>Khay tre tiện lợi</div>
              <div style={{ color: '#4BAF47', fontWeight: '600' }}>300,000đ</div>
              <div className="item-description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, illo saepe.
                Repellendus dolores ad odit voluptatibus ipsum corrupti, dicta harum dolore,
                numquam illum sapiente maxime nostrum mollitia officiis illo nam.
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
            <a style={{ display: 'flex' }}>
              <img src="images/ẢNH BÌA.jpg" style={{ borderRadius: '6px', objectFit: 'contain',width:'100%' ,height:'250px' }} alt="Best Seller 1" />
            </a>
            <div>
              <div style={{ fontSize: '1.2rem', fontWeight: '600' }}>Khay tre tiện lợi</div>
              <div style={{ color: '#4BAF47', fontWeight: '600' }}>300,000đ</div>
              <div className="item-description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, illo saepe.
                Repellendus dolores ad odit voluptatibus ipsum corrupti, dicta harum dolore,
                numquam illum sapiente maxime nostrum mollitia officiis illo nam.
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
            <a style={{ display: 'flex' }}>
              <img src="images/ẢNH BÌA.jpg" style={{ borderRadius: '6px', objectFit: 'contain',width:'100%' ,height:'250px' }} alt="Best Seller 1" />
            </a>
            <div>
              <div style={{ fontSize: '1.2rem', fontWeight: '600' }}>Khay tre tiện lợi</div>
              <div style={{ color: '#4BAF47', fontWeight: '600' }}>300,000đ</div>
              <div className="item-description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, illo saepe.
                Repellendus dolores ad odit voluptatibus ipsum corrupti, dicta harum dolore,
                numquam illum sapiente maxime nostrum mollitia officiis illo nam.
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
    </div>
    </div>
  );
}
