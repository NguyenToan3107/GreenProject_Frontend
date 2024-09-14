
import api from "@/apis/request";

import {VariationOptionDto} from "@/app/admin/_components/options/OptionForm";

export function getAllVariationOptions(pageNum:any,pageSize:any,search:string) {
    console.log(pageSize+" "+pageNum)
    if(search.trim()!=""){
        return api.get(`variation_options?pageNum=${pageNum}&pageSize=${pageSize}&search=${search.trim()}`);
    }else {
        return api.get(`variation_options?pageNum=${pageNum}&pageSize=${pageSize}`);
    }

}
export function createVariationOption(variation:VariationOptionDto){
    return api.post('variation_options/create',variation)
}

export function updateVariationOptionById(id:number,variation:VariationOptionDto){
    return api.put(`variation_options/update/${id}`,variation)
}

export function deleteVariationOptionById(id:number){
    return api.delete(`variation_options/delete/${id}`)
}