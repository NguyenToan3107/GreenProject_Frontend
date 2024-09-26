import api from "@/apis/request";
import {ProductDto} from "@/app/admin/_components/products/ProductForm";
import {PAGE_SIZE, PRODUCT_ITEM_PAGE_SIZE,TOP_SOLD_PAGE_NUM,TOP_SOLD_PAGE_SIZE} from "@/app/util/constant";


export function getAllProducts(pageNum:number,search:string,categoryId:number) {
    if(pageNum==0){
        return api.get("products");
    }

    if(search.trim()!=""&&categoryId!=0){
        return api.get(`products?pageNum=${pageNum}&pageSize=${PAGE_SIZE}&search=${search.trim()}&categoryId=${categoryId}`);
    }

    if(search.trim()!=""){
        return api.get(`products?pageNum=${pageNum}&pageSize=${PAGE_SIZE}&search=${search.trim()}`);
    }

    if(categoryId!=0){
        return api.get(`products?pageNum=${pageNum}&pageSize=${PAGE_SIZE}&categoryId=${categoryId}`);
    }

    return api.get(`products?pageNum=${pageNum}&pageSize=${PAGE_SIZE}`);


}
export function getAllRelatedProduct(pageNum:number,categoryId:number){
    return api.get(`products/related_product?pageNum=${pageNum}&pageSize=${PAGE_SIZE}&categoryId=${categoryId}`);
}

export function getProductOnTopSold(){
    return api.get(`products/top_sold?pageNum=${TOP_SOLD_PAGE_NUM}&pageSize=${TOP_SOLD_PAGE_SIZE}`);
}


export function getAllProductsView(pageNum:number){
    return api.get(`products/view?pageNum=${pageNum}&pageSize=${PRODUCT_ITEM_PAGE_SIZE}`);
}

export function getProductById(productId:number){
    return api.get(`products/${productId}`);
}

export function createNewProduct(product:ProductDto){
    return api.post('products/create',product);
}


export function updateProductById(id:number,product:ProductDto){
    return api.put(`products/update/${id}`,product);
}

export function deleteProductById(id:number){
    return api.delete(`products/delete/${id}`);
}