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

interface VariationState {
    variations: any[];
    variationsNoPage: any[];
    variationsByproductId:any[];
    setVariationsByproductId:(v:any[])=>void;
    loading: boolean;
    search: string;
    setSearch: (key: string) => void;
    getAllVariations: (page: number, size: number) => Promise<void>;
    getAllVariationsByProductId: (productId:number) => Promise<void>;
    createVariation: (variation: VariationDto) => Promise<void>;
    updateVariation: (id: number, variation: VariationDto) => Promise<void>;
    deleteVariation: (id: number) => Promise<void>;
    current: number;
    pageSize: number;
    totalElements: number;
    isUpdated:boolean;
}

export const useVariationStore=create<VariationState>((set,get)=>({
    variations:[],
    variationsNoPage:[],
    variationsByproductId:[],
    loading: false,
    search:"",
    current: 1,
    pageSize: 5,
    totalElements: 0,
    isUpdated:false,

    setVariationsByproductId:(a:any[])=> {
        set({variationsByproductId:a})

    },
    setSearch:(s)=>{
        set({search:s})
    },

    getAllVariations: async (page: number, size: number) => {
        if(page==0&&size==0&&get().isUpdated){
            return;
        }
        const apiCall = () => getAllVariations(page, size, get().search);
        const onSuccess = (response: any) => {
            if(!response.data.content){
                set({
                    variationsNoPage:response.data,
                    isUpdated:true
                })
            }else {
                set({
                    variations: response.data.content,
                    current: page,
                    pageSize: size,
                    totalElements: response.data.totalElements,

                });
            }


        };


        await handleApiRequest(apiCall, onSuccess, (loading:boolean) => set({ loading }));
    },
    getAllVariationsByProductId:async (productId)=>{
        const apiCall = () => getAllVariationsByproductId(productId);
        const onSuccess = (response: any) => {
            set({
                variationsByproductId:response.data
            })
        };
        await handleApiRequest(apiCall, onSuccess, (loading:boolean) => set({ loading }));
    },
    createVariation: async (variation:VariationDto) => {
        const apiCall = () => createVariation(variation);
        const onSuccess = (response: any) => {
            get().getAllVariations(get().current, get().pageSize);
            set({
                isUpdated:false
            })
        };
        await handleApiRequest(apiCall, onSuccess, (loading:boolean) => set({ loading }));
    },
    updateVariation:async (id:number,v:VariationDto)=>{
        const apiCall = () => updateVariationById(id, v);
        const onSuccess = (response: any) => {
            get().getAllVariations(get().current, get().pageSize);
            set({
                isUpdated:false
            })
        };
        await handleApiRequest(apiCall, onSuccess, (loading:boolean) => set({ loading }));
    },
    deleteVariation:async (id:number)=>{
        const apiCall = () => deleteVariationById(id);
        const onSuccess = (response: any) => {
            get().getAllVariations(1, get().pageSize);
            set({
                isUpdated:false
            })
        };
        await handleApiRequest(apiCall, onSuccess, (loading:boolean) => set({ loading }));
    }
}))
