import {CreateVariationRequest} from "@/app/admin/_components/categories/VariationForm";
import api from "@/apis/request";
import {CreateVariationOption} from "@/app/admin/_components/categories/OptionForm";

export function createVariationOption(variationOption:CreateVariationOption){
    return api.post('variation_options/create',variationOption)
}

export function deleteVariationOption(id:number){
    return api.delete(`variation_options/delete/${id}`)
}