"use client"
import { useState } from 'react';
import './product_details.css'
import { MinusOutlined,PlusOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { Button, Divider, Flex, Radio,Col, Row } from 'antd';

export default function page() {
    const [qty,setQty]=useState(1);

    const { TextArea } = Input;

    return (
        <div className="grid-container">
            <img style={{gridArea:'image'}} src='client/products/product2.png'/>

            <div style={{gridArea:'mini_image'}} >
                <div style={{display:'flex',justifyContent: 'space-between', alignItems: 'center'}}>
                    <img src='client/products/product2.png' style={{ width: '100px', height: '100px',objectFit:'contain'}}/>
                    <img src='client/products/product2.png' style={{ width: '100px', height: '100px',objectFit:'contain'}}/>
                    <img src='client/products/product2.png' style={{ width: '100px', height: '100px',objectFit:'contain'}}/>
                    <img src='client/products/product2.png' style={{ width: '100px', height: '100px',objectFit:'contain' }}/>
                </div>
            </div>

            <div style={{gridArea:'title',fontSize:'2rem',fontWeight:'600'}}>
                Khay tre tiện lợi
            </div>

            <div style={{gridArea:'star'}}>
                <div className="star">
                    <img src="images/star.png" alt="Star 1" />
                    <img src="images/star.png" alt="Star 2" />
                    <img src="images/star.png" alt="Star 3" />
                    <img src="images/star.png" alt="Star 4" />
                    <img src="images/no-star.png" alt="No Star" />
                </div>
            </div>

            <div style={{gridArea:'description'}}>
                <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel doloremque, ex placeat laborum dolorem quidem repellendus aspernatur cumque earum, voluptatem quibusdam soluta reprehenderit error molestiae quos atque eaque ducimus! Dolor?
                </p>     
            </div>

            <div style={{gridArea:'price',fontSize:'1.5rem',fontWeight:'500',color:'#4BAF47'}}>
                <p>600.000VND</p>   
            </div>

            <div style={{gridArea:'variation'}}>
                <Flex gap={"small"} vertical>
                    <Flex vertical gap={"small"}>
                        <p>Choose color</p>
                        <div style={{display:'flex',gap:'1rem'}}>
                            <Button style={{backgroundColor:'red'}} shape="circle"/>
                            <Button style={{backgroundColor:'green'}} shape="circle"/>
                            <Button style={{backgroundColor:'yellow'}} shape="circle"/>
                        </div>
                    </Flex>
                    <Flex vertical gap={"small"}>
                        <p>Choose size</p>
                        <div style={{display:'flex',gap:'1rem'}}>
                        <Button style={{color:'#4BAF47',border:'1px solid #4BAF47'}} ghost>Primary</Button>
                        <Button style={{color:'#4BAF47',border:'1px solid #4BAF47'}} ghost>Medium</Button>
                        <Button style={{color:'#4BAF47',border:'1px solid #4BAF47'}} ghost>Large</Button>
                        </div>
                    </Flex>
                </Flex>
            </div>

            <div style={{gridArea:'quantity'}}>
                <Flex vertical gap={"small"}>
                    <p>Choose quantity</p>
                    <Flex gap={"small"}>
                        <button onClick={()=>{
                                setQty((st:number)=>{
                                    if(qty==1){
                                        return st;
                                    }
                                    return st - 1;
                                })
                            }} style={{border:'1px solid #000',borderRadius:'8px',width:'40px',height:'40px'}}>
                            <MinusOutlined style={{ fontSize: '0.8rem', color: '#ff4d4f' }}/>
                        </button>
                        <input type='number' value={qty} style={{border:'1px solid #000',borderRadius:'8px',width:'40px',height:'40px',textAlign:'center',display: 'inline-flex'}}/>
                        <button
                            onClick={()=>{
                            setQty((st:number)=>{
                                return st+1;
                                })
                            }} style={{border:'1px solid #000',borderRadius:'8px',width:'40px',height:'40px'}}>
                            <PlusOutlined style={{ fontSize: '0.8rem', color: '#ff4d4f' }}/>
                        </button>
                    </Flex>
                </Flex>   
            </div>

            <div style={{gridArea:'button'}}>
                <Flex gap="small" align="flex-start">
                    <Button style={{color:'#4BAF47',border:'1px solid #4BAF47',fontSize:'1rem',padding:'0.5rem 2rem'}} ghost>Thêm vào giỏ hàng</Button>
                    <Button style={{backgroundColor:'#4BAF47',border:'1px solid #4BAF47',fontSize:'1rem'}} ghost>Mua ngay</Button>
                </Flex>
            </div>

            <div style={{gridArea:'info'}}>
                <Flex vertical gap={"middle"}>
                    <div>
                        <p style={{fontSize:'1.1rem',fontWeight:'600'}}>Hướng dẫn sử dụng</p>
                        <p style={{fontSize:'0.9rem',fontWeight:'400'}}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque temporibus odio libero quod doloremque autem voluptatem assumenda, 
                            sapiente fugiat eveniet neque molestias exercitationem laudantium nemo atque sunt distinctio vero reiciendis.</p>
                    </div>
                    <div>
                        <p style={{fontSize:'1.1rem',fontWeight:'600'}}>Bảo quản sản phẩm</p>
                        <p style={{fontSize:'0.9rem',fontWeight:'400'}}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cumque temporibus odio libero quod doloremque autem voluptatem assumenda, 
                            sapiente fugiat eveniet neque molestias exercitationem laudantium nemo atque sunt distinctio vero reiciendis.</p>
                    </div>
                </Flex>
            </div>


            <div style={{gridArea:'review'}}>
                <Flex gap={'middle'} vertical>
                    <h2 style={{fontWeight:'600',fontSize:'1.4rem'}}>Đánh giá sản phẩm</h2>
                    <Flex align="center" gap={'small'}>
                        <span style={{fontSize:'1.6rem',fontWeight:'700'}}>4.89</span>
                        <div className="star">
                            <img src="images/star.png" alt="Star 1" />
                            <img src="images/star.png" alt="Star 2" />
                            <img src="images/star.png" alt="Star 3" />
                            <img src="images/star.png" alt="Star 4" />
                            <img src="images/no-star.png" alt="No Star" />
                        </div>
                    </Flex>
                    <div style={{}}>
                    
                        <div className="review-container">
                            <div className="avatar-container">
                            <img src="client/products/product2.png" alt="Avatar" className="avatar" />
                            </div>
                            <TextArea placeholder="Nhập đánh giá" className="custom-textarea" />
                        </div>
                    </div>
                    <div>
                        <Button style={{backgroundColor:'#4BAF47',border:'1px solid #4BAF47'}} ghost>Đánh giá</Button>
                    </div>
                    <Flex vertical gap={"middle"}>
                        <Flex justify='space-between' align='center'>
                            <p>Bình luận gần đây</p>
                            <Flex align='center' gap={"small"}>
                                <div className="btn-left" style={{border:"1px solid #000",borderRadius:'50%'}}>
                                    <img src="images/left-arrow.png" width="20px" alt="Left Arrow" />
                                </div>
                                <div className="btn-right" style={{border:"1px solid #4BAF47",borderRadius:'50%'}}>
                                    <img src="images/right-arrow.png" width="20px" style={{ transform: 'rotate(180deg)' }} alt="Right Arrow" />
                                </div>
                            </Flex>
                        </Flex>
                        <Flex vertical gap={"middle"}>
                            <Row style={{borderBottom:'1px solid #8c8b8b85',paddingBottom:'1rem'}}>
                                <Col span={18} push={6}>
                                   <Flex vertical gap={"small"}>
                                        <Flex justify='space-between'>
                                            <div>Nguyễn Văn C</div>
                                            <time>12:30 15/11/2024</time>
                                        </Flex>
                                        <Flex className="star" gap={'small'}>
                                            <img src="images/star.png" alt="Star 1" />
                                            <img src="images/star.png" alt="Star 2" />
                                            <img src="images/star.png" alt="Star 3" />
                                            <img src="images/star.png" alt="Star 4" />
                                            <img src="images/no-star.png" alt="No Star" />
                                        </Flex>
                                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt accusamus provident, laboriosam aperiam non, illo praesentium voluptatibus eius quis voluptates tenetur maxime optio iste explicabo velit quisquam? Voluptatibus, earum! Culpa.</p>
                                   </Flex>
                                </Col>
                                <Col span={6} pull={18}>
                                    <img src="client/products/product2.png" alt="Avatar" className="avatar" />
                                </Col>
                            </Row>
                            <Row style={{borderBottom:'1px solid #8c8b8b85',paddingBottom:'1.1rem'}}>
                                <Col span={18} push={6}>
                                   <Flex vertical gap={"small"}>
                                        <Flex justify='space-between'>
                                            <div>Nguyễn Văn C</div>
                                            <time>12:30 15/11/2024</time>
                                        </Flex>
                                        <Flex className="star" gap={'small'}>
                                            <img src="images/star.png" alt="Star 1" />
                                            <img src="images/star.png" alt="Star 2" />
                                            <img src="images/star.png" alt="Star 3" />
                                            <img src="images/star.png" alt="Star 4" />
                                            <img src="images/no-star.png" alt="No Star" />
                                        </Flex>
                                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt accusamus provident, laboriosam aperiam non, illo praesentium voluptatibus eius quis voluptates tenetur maxime optio iste explicabo velit quisquam? Voluptatibus, earum! Culpa.</p>
                                   </Flex>
                                </Col>
                                <Col span={6} pull={18}>
                                    <img src="client/products/product2.png" alt="Avatar" className="avatar" />
                                </Col>
                            </Row>
                        </Flex>
                    </Flex>
                </Flex>
            </div>
        </div>
    );
}