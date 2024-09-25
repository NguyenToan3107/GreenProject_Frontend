"use client"
import {useState} from 'react';
import React from 'react';
import { Flex, Rate, Button,Radio } from 'antd';
import { MinusOutlined,PlusOutlined } from '@ant-design/icons';

const ProductInfoComponent:React.FC<any> = ({ product }) => {
    const [qty,setQty]=useState(1);

    return (
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
    );
};

export default ProductInfoComponent;