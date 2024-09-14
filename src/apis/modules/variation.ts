import api from "@/apis/request";
import {VariationDto} from "@/app/admin/_components/variations/VariationForm";

export function getAllVariations(pageNum:any,pageSize:any,search:string) {
    if(pageNum==0&&pageSize==0){
        return api.get(`variations`);
    }

    if(search.trim()!=""){
        return api.get(`variations?pageNum=${pageNum}&pageSize=${pageSize}&search=${search.trim()}`);
    }else {
        return api.get(`variations?pageNum=${pageNum}&pageSize=${pageSize}`);
    }

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