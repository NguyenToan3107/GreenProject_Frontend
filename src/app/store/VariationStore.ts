import {Variation} from "@/app/model/Variation";
import {create} from "zustand";
import {message} from "antd";
import {
    createVariation,
    deleteVariationById,
    getAllVariations, getAllVariationsByproductId,
    updateVariationById
} from "@/apis/modules/variation";


import {VariationDto} from "@/app/admin/_components/variations/VariationForm";

import {handleApiRequest} from "@/app/util/utils";
import {PAGE_SIZE} from "@/app/util/constant";

interface VariationState {
    variations: any[];
    variationsSelect: any[];
    variationsByproductId:any[];
    setVariationsByproductId:(v:any[])=>void;
    search: string;
    current: number;
    totalElements: number;
    setSearch: (key: string) => void;
    getAllVariations: (page: number) => Promise<void>;
    getAllVariationsByProductId: (productId:number) => Promise<void>;
    createVariation: (variation: VariationDto) => Promise<void>;
    updateVariation: (id: number, variation: VariationDto) => Promise<void>;
    deleteVariation: (id: number) => Promise<void>;


}

export const useVariationStore=create<VariationState>((set,get)=>({
    variations:[],
    variationsSelect:[],
    variationsByproductId:[],
    loading: false,
    search:"",
    current: 1,
    totalElements: 0,


    setVariationsByproductId:(a:any[])=> {
        set({variationsByproductId:a})

    },
    setSearch:(s)=>{
        set({search:s})
    },

    getAllVariations: async (page: number) => {
        const apiCall = () => getAllVariations(page, get().search);
        const onSuccess = (response: any) => {
            if(!response.data.content){
                set({
                    variationsSelect:response.data,
                })
            }else {
                set({
                    variations: response.data.content,
                    current: page,
                    totalElements: response.data.totalElements,

                });
            }


        };


        return await handleApiRequest(apiCall, onSuccess);
    },
    getAllVariationsByProductId:async (productId)=>{
        const apiCall = () => getAllVariationsByproductId(productId);
        const onSuccess = (response: any) => {
            set({
                variationsByproductId:response.data
            })
        };
        return await handleApiRequest(apiCall, onSuccess);
    },
    createVariation: async (variation:VariationDto) => {
        const apiCall = () => createVariation(variation);
        const onSuccess = (response: any) => {
            get().getAllVariations(get().current);
            get().getAllVariations(0);

        };
        return await handleApiRequest(apiCall, onSuccess);
    },
    updateVariation:async (id:number,v:VariationDto)=>{
        const apiCall = () => updateVariationById(id, v);
        const onSuccess = (response: any) => {
            get().getAllVariations(get().current);
            get().getAllVariations(0);

        };
        return await handleApiRequest(apiCall, onSuccess);
    },
    deleteVariation:async (id:number)=>{
        const apiCall = () => deleteVariationById(id);
        const onSuccess = (response: any) => {
            if (get().variations.length === 1 && get().current > 1) {
                get().getAllVariations(get().current - 1);
            } else {
                get().getAllVariations(get().current);
            }
            get().getAllVariations(0);
        };
        return await handleApiRequest(apiCall, onSuccess);
    }
}))
