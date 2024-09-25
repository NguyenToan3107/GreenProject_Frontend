import React from 'react';
import { Flex, Image, Input } from 'antd';

const ImageComponent: React.FC<any> = ({ product }) => {

    return(
        <div>
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
    );
}

export default ImageComponent;