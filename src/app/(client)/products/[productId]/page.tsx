"use client"
import {useEffect, useState} from 'react';
import './product_details.css'
import { MinusOutlined,PlusOutlined } from '@ant-design/icons';
import {Image, PaginationProps, Rate} from 'antd';
import { Button,Card,Input, Divider, Flex, Radio ,Col, Row, Pagination  } from 'antd';
import {getProductById,getAllRelatedProduct} from "@/apis/modules/product";
import ReviewComponent from './component/ReviewComponent';
import ImageComponent from './component/ImageComponent';
import ProductInfoComponent from './component/ProductInfoComponent';
import RelatedProductComponent from './component/RelatedProductComponent';

export default function page({params}:any) {
    const [qty,setQty]=useState(1);
    const [product,setProduct]=useState<any>(null);
    const [relatedProduct,setRelatedProduct] = useState<any>(null);
    const [loading,setLoading]=useState(false);

    const getProduct=async (productId:number)=>{
        setLoading(true)
        const res:any=await getProductById(productId);
        setLoading(false)
        console.log(res)
        if(res.code==200){
            setProduct(res.data);

            getRelatedProduct(1, res.data.category.id);
        }
    }

    const getRelatedProduct = async (pageNum:number, categoryId: number)=>{
        const res:any = await getAllRelatedProduct(pageNum,categoryId);
        console.log(res)
        if(res.code ==200){
            setRelatedProduct(res.data.content);
        }
    }

    useEffect(() => {
        getProduct(params.productId)
    }, []);

    const onShowSizeChange: PaginationProps['onShowSizeChange'] = (current, pageSize) => {
        console.log(current, pageSize);
      };

    return (
        <div style={{width:'1200px',marginLeft:'auto',marginRight:'auto',marginBottom:'2rem'}}>
            <div className="grid-container">

                <ImageComponent product={product}/>

                <ProductInfoComponent product={product}/>
                
                <ReviewComponent/>
            </div>
            <RelatedProductComponent relatedProduct={relatedProduct}/>
        </div>
    );
}