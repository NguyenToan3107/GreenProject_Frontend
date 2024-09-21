import api from "@/apis/request";
import {CategoryDto} from "@/app/admin/_components/categories/CategoryForm";
import {ProductDto} from "@/app/admin/_components/products/ProductForm";
import {PAGE_SIZE} from "@/app/util/constant";


export function getAllProducts(pageNum:number,search:string) {
    if(pageNum==0){
        return api.get("products");
    }
    if(search.trim()!=""){
        return api.get(`products?pageNum=${pageNum}&pageSize=${PAGE_SIZE}&search=${search.trim()}`);
    }else {
        return api.get(`products?pageNum=${pageNum}&pageSize=${PAGE_SIZE}`);
    }

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