"use client"
import React from 'react';
import {useEffect, useState} from 'react';
import { Flex, Row, Col, Rate, Pagination, Input,Image } from 'antd';
import {useReviewStore} from "@/app/store/ReviewStore";


const { TextArea } = Input;

const ReviewComponent = () => {

    const [rating, setRating] = useState(5); // Giá trị sao mặc định
    const [content, setContent] = useState(''); // Nội dung đánh giá

    const {
        reviews,
        current,
        totalElements,
        currentProductItemId,
        setCurrent,
        getAllReviewByProductItemId,
        createReview,
        updateReviewById,
        deleteReviewById,
    } = useReviewStore();

    useEffect(() => {
        if (currentProductItemId > 0) {
            getAllReviewsByProductItemId()
        }
    }, [currentProductItemId,current]);


    const getAllReviewsByProductItemId=async ()=>{
        console.log(currentProductItemId)

            const res:any = await getAllReviewByProductItemId(current, currentProductItemId);
            console.log(res)
            if(res.code == 200){
             console.log(reviews)
            }

     }

     const handleSubmit = () => {
        console.log('Rating:', rating);
        console.log('Content:', content);
    }

     const onPageChange = (page: any) => {
        setCurrent(page);
        console.log(current)
      }

    return (
        <div>
            <Flex gap={'middle'} vertical>
                <h2 style={{ fontWeight: '600', fontSize: '1.5rem' }}>Đánh giá sản phẩm</h2>
                <Flex align="center" gap={'small'}>
                    <span style={{ fontSize: '1.6rem', fontWeight: '700' }}>4.89</span>
                    <div className="star">
                        <Rate allowHalf 
                        value={rating} 
                        onChange={setRating}  />
                    </div>
                </Flex>
                <div className="review-container">
                    <div className="avatar-container">
                        <Image src="https://cdn-icons-png.flaticon.com/128/17286/17286792.png" alt="Avatar" className="avatar" />
                    </div>
                    <TextArea 
                    placeholder="Nhập đánh giá" 
                    className="custom-textarea"
                    value={content} // Gán giá trị nội dung
                    onChange={(e) => setContent(e.target.value)} />
                </div>
                <button className='review-button' onClick={handleSubmit}>Đánh giá</button>

                <Flex vertical gap={"middle"}>
                    <Flex justify='space-between' align='center'>
                        <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Bình luận gần đây</p>
                    </Flex>

                    {/* List of reviews */}
                    {reviews.map((review, index) => (
                        <Row key={index} style={{ borderBottom: '1px solid #8c8b8b85', paddingBottom: '1rem' }}>
                            <Col span={18} push={6}>
                                <Flex vertical gap={"small"}>
                                    <Flex justify='space-between'>
                                        <div>{review.user.username}</div>
                                        <time>12:30 15/11/2024</time>
                                    </Flex>
                                    <Flex className="star" gap={'small'}>
                                        <Rate allowHalf value={review.rating}  disabled />
                                    </Flex>
                                    <p>{review.content}</p>
                                </Flex>
                            </Col>
                            <Col span={6} pull={18}>
                                <Image src="https://cdn-icons-png.flaticon.com/128/17286/17286792.png" alt="Avatar" className="avatar" />
                                {/* <Image src="public/client/user/default_user.jpg" alt="Avatar" className="avatar" /> */}
                            </Col>
                        </Row>
                    ))}

                    <Pagination
                        style={{ marginTop: '1rem' }}
                        align='end'
                        showSizeChanger
                        onChange={onPageChange}
                        defaultCurrent={3}
                        total={totalElements}
                    />
                </Flex>
            </Flex>
        </div>
    );
};

export default ReviewComponent;