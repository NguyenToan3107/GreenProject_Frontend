import api from "@/apis/request";
import {CategoryDto} from "@/app/admin/_components/categories/CategoryForm";


export function getAllCategories(pageNum:any,pageSize:any,search:string) {
    console.log(pageSize+" "+pageNum)
    if(search.trim()!=""){

        return api.get(`categories?pageNum=${pageNum}&pageSize=${pageSize}&search=${search.trim()}`);
    }else {
        return api.get(`categories?pageNum=${pageNum}&pageSize=${pageSize}`);
    }

}
export function getAllCategoriesParent() {
    return api.get(`categories/parents`);
}

export function createNewCategory(category:CategoryDto){
    return api.post('categories/create',category)
}


export function updateCategoryById(id:number,category:CategoryDto){
    return api.put(`categories/update/${id}`,category)
}

export function deleteCategoryById(id:number){
    return api.delete(`categories/delete/${id}`)
}