import api from "@/apis/request";
import {VariationDto} from "@/app/admin/_components/variations/VariationForm";
import {PAGE_SIZE} from "@/app/util/constant";

export function getAllVariations(pageNum:any,search:string) {
    if(pageNum==0){
        return api.get(`variations`);
    }

    if(search.trim()!=""){
        return api.get(`variations?pageNum=${pageNum}&pageSize=${PAGE_SIZE}&search=${search.trim()}`);
    }else {
        return api.get(`variations?pageNum=${pageNum}&pageSize=${PAGE_SIZE}`);
    }

}
export function getAllVariationsByproductId(productId:number) {
    return api.get(`variations/${productId}`);
}


export function createVariation(variation:VariationDto){
    return api.post('variations/create',variation)
}

export function updateVariationById(id:number,variation:VariationDto){
    return api.put(`variations/update/${id}`,variation)
}

export function deleteVariationById(id:number){
    return api.delete(`variations/delete/${id}`)
}