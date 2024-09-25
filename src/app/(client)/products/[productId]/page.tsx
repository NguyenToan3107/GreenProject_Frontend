"use client"
import {useEffect, useState} from 'react';
import './product_details.css'
import { MinusOutlined,PlusOutlined } from '@ant-design/icons';
import {Image, PaginationProps, Rate} from 'antd';
import { Button,Card,Input, Flex, Radio ,Col, Row, Pagination  } from 'antd';
import {getProductById} from "@/apis/modules/product";


export default function page({params}:any) {
    const [qty,setQty]=useState(1);
    const [product,setProduct]=useState<any>(null);
    const [loading,setLoading]=useState(false);
    const [productItemCurrent,setProductItemCurrent]=useState<any>(null);
    console.log(params.productId)
    const getProduct=async (productId:number)=>{
        setLoading(true)
        const res:any=await getProductById(productId);
        setLoading(false)
        console.log(res)
        if(res.code==200){
            setProduct(res.data);
            setProductItemCurrent(res.data.productItems[0])
        }

    }

    useEffect(() => {
        getProduct(params.productId)

    }, []);

    const { TextArea } = Input;
    const onShowSizeChange: PaginationProps['onShowSizeChange'] = (current, pageSize) => {
        console.log(current, pageSize);
      };

    return (
        <div style={{width:'1200px',marginLeft:'auto',marginRight:'auto',marginBottom:'2rem'}}>

        <div className="grid-container">

            <div style={{gridArea:'image'}}>
                <Flex vertical gap={"large"}>
                    <Image src={product?.images[0].url}/>
                    <div className='mini_image'>
                        <Flex justify='space-between' align='center' gap={"small"} wrap>
                            {
                                product?.images.map((i:any)=>(
                                    <Image style={{ width: '140px', height: '140px',objectFit:'contain'}} src={i.url}/>
                                ))
                            }
                        </Flex>
                    </div>
                </Flex>

            </div>

            <Flex vertical style={{gridArea:'product-info'}} gap={"middle"}>

                <div style={{gridArea:'title',fontSize:'2rem',fontWeight:'600'}}>
                    {product?.name}
                </div>

                <div style={{gridArea:'star'}}>
                    <div className="star">
                        <Rate allowHalf defaultValue={5} disabled />
                    </div>
                </div>

                <div style={{gridArea:'description'}}>
                    <p>
                        {product?.description}

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
                                <Radio.Group defaultValue="a">
                                    <Flex gap={"small"}>
                                        <Radio.Button value="a" style={{color:'#4BAF47',border:'1px solid #4BAF47'}}>Hangzhou</Radio.Button>
                                        <Radio.Button value="b" style={{color:'#4BAF47',border:'1px solid #4BAF47'}}>Shanghai</Radio.Button>
                                        <Radio.Button value="c" style={{color:'#4BAF47',border:'1px solid #4BAF47'}}>Beijing</Radio.Button>
                                        <Radio.Button value="d" style={{color:'#4BAF47',border:'1px solid #4BAF47'}}>Chengdu</Radio.Button>
                                    </Flex>
                                </Radio.Group>
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
                <Flex gap="middle" align="flex-start">
                            <button
                                className="add_to_cart-button">
                                Thêm vào giỏ hàng
                            </button>
                            <button
                                className="common-button">
                                Mua ngay
                            </button>
                        </Flex>
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
            </Flex>

            <div style={{gridArea:'review'}}>
                    <Flex gap={'middle'} vertical>
                        <h2 style={{fontWeight:'600',fontSize:'1.5rem'}}>Đánh giá sản phẩm</h2>
                        <Flex align="center" gap={'small'}>
                            <span style={{fontSize:'1.6rem',fontWeight:'700'}}>4.89</span>
                            <div className="star">
                                <Rate allowHalf defaultValue={5} disabled />
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
                            <button className='review-button'>Đánh giá</button>
                        </div>
                        <Flex vertical gap={"middle"}>
                            <Flex justify='space-between' align='center'>
                                <p style={{fontSize:'1.2rem',marginBottom:'1rem'}}>Bình luận gần đây</p>
                                
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
                                                <Rate allowHalf defaultValue={5} disabled />
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
                                                <Rate allowHalf defaultValue={5} disabled />
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
                                                <Rate allowHalf defaultValue={5} disabled />
                                            </Flex>
                                            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt accusamus provident, laboriosam aperiam non, illo praesentium voluptatibus eius quis voluptates tenetur maxime optio iste explicabo velit quisquam? Voluptatibus, earum! Culpa.</p>
                                    </Flex>
                                    </Col>
                                    <Col span={6} pull={18}>
                                        <img src="client/products/product2.png" alt="Avatar" className="avatar" />
                                    </Col>
                                </Row>
                                <Pagination style={{marginTop:'1rem'}} align='end'
                                showSizeChanger
                                onShowSizeChange={onShowSizeChange}
                                defaultCurrent={3}
                                total={200}
                                />
                            </Flex>
                        </Flex>
                    </Flex>
            </div>

        </div>

            <Flex vertical gap={"middle"} >
                <h2 style={{textTransform:'uppercase',fontSize:'1.4rem',fontWeight:'600'}}>Sản phẩm liên quan</h2>
                <Flex wrap gap={"small"} justify='start' align='center' style={{marginLeft:'auto',marginRight:'auto'}}>
                    <Card
                        hoverable
                        style={{ width: 230,height: 350 }}
                        cover={<img src="client/products/product2.png" />}
                        >
                        <Flex vertical align="start">
                            <div style={{ fontSize: "1.2rem", fontWeight: "600",whiteSpace:'nowrap',textOverflow:'ellipsis',overflow:'hidden' }}>
                                Khay tre tiện lợi
                            </div>
                            <div style={{ color: "#4BAF47", fontWeight: "600" }}>
                                300,000đ
                            </div>
                            <div className="star">
                                <img src="images/star.png" style={{width:'1rem'}} alt="Star 1" />
                                <img src="images/star.png" style={{width:'1rem'}} alt="Star 2" />
                                <img src="images/star.png" style={{width:'1rem'}} alt="Star 3" />
                                <img src="images/star.png" style={{width:'1rem'}} alt="Star 4" />
                                <img src="images/no-star.png" style={{width:'1rem'}} alt="No Star" />
                            </div>
                        </Flex>
                    </Card>
                </Flex>
            </Flex>
        </div>
    );
}