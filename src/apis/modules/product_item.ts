import api from "@/apis/request";


export function getAllProductItems(pageNum:any,pageSize:any,search:string) {
    if(pageNum==0&&pageSize==0){
        return api.get("productItems");
    }
    if(search.trim()!=""){
        return api.get(`productItems?pageNum=${pageNum}&pageSize=${pageSize}&search=${search.trim()}`);
    }else {
        return api.get(`productItems?pageNum=${pageNum}&pageSize=${pageSize}`);
    }

}

export function createNewProductItem(productItem:any){
    return api.post('productItems/create',productItem);
}


export function updateProductItemById(id:number,productItem:any){
    return api.put(`productItems/update/${id}`,productItem);
}

export function deleteProductItemById(id:number){
    return api.delete(`productItems/delete/${id}`);
}