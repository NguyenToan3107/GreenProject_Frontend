import React from 'react';
import { Flex, Row, Col, Rate, Pagination, Input } from 'antd';

const { TextArea } = Input;

const ReviewComponent = () => {
    const onShowSizeChange = (current: number, size: number) => {
        console.log(current, size);
    };

    return (
        <div>
            <Flex gap={'middle'} vertical>
                <h2 style={{ fontWeight: '600', fontSize: '1.5rem' }}>Đánh giá sản phẩm</h2>
                <Flex align="center" gap={'small'}>
                    <span style={{ fontSize: '1.6rem', fontWeight: '700' }}>4.89</span>
                    <div className="star">
                        <Rate allowHalf defaultValue={5} disabled />
                    </div>
                </Flex>
                <div className="review-container">
                    <div className="avatar-container">
                        <img src="client/products/product2.png" alt="Avatar" className="avatar" />
                    </div>
                    <TextArea placeholder="Nhập đánh giá" className="custom-textarea" />
                </div>
                <button className='review-button'>Đánh giá</button>

                <Flex vertical gap={"middle"}>
                    <Flex justify='space-between' align='center'>
                        <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Bình luận gần đây</p>
                    </Flex>

                    {/* List of reviews */}
                    {[...Array(3)].map((_, index) => (
                        <Row key={index} style={{ borderBottom: '1px solid #8c8b8b85', paddingBottom: '1rem' }}>
                            <Col span={18} push={6}>
                                <Flex vertical gap={"small"}>
                                    <Flex justify='space-between'>
                                        <div>Nguyễn Văn C</div>
                                        <time>12:30 15/11/2024</time>
                                    </Flex>
                                    <Flex className="star" gap={'small'}>
                                        <Rate allowHalf defaultValue={5} disabled />
                                    </Flex>
                                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit...</p>
                                </Flex>
                            </Col>
                            <Col span={6} pull={18}>
                                <img src="client/products/product2.png" alt="Avatar" className="avatar" />
                            </Col>
                        </Row>
                    ))}

                    <Pagination
                        style={{ marginTop: '1rem' }}
                        align='end'
                        showSizeChanger
                        onShowSizeChange={onShowSizeChange}
                        defaultCurrent={3}
                        total={200}
                    />
                </Flex>
            </Flex>
        </div>
    );
};

export default ReviewComponent;