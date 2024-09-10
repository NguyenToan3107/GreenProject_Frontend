import api from "@/apis/request";
import {CategoryDto} from "@/app/admin/_components/categories/CategoryForm";
import {Variation} from "@/app/model/Variation";
import {CreateVariationRequest, UpdateVariationRequest} from "@/app/admin/_components/categories/VariationForm";

export function getAllVariations(categoryId:number) {
    return api.get(`variations/${categoryId}`);
}

export function createVariation(variation:CreateVariationRequest){
    return api.post('variations/create',variation)
}

export function updateVariation(id:number,variation:UpdateVariationRequest){
    return api.put(`variations/update/${id}`,variation)
}

export function deleteVariation(id:number){
    return api.delete(`variations/delete/${id}`)
}