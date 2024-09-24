import {create} from "zustand";
import {handleApiRequest} from "@/app/util/utils";
import {VariationOptionDto} from "@/app/admin/_components/options/OptionForm";
import {
    createVariationOption, deleteVariationOptionById,
    getAllVariationOptions,
    updateVariationOptionById
} from "@/apis/modules/variation_option";

interface VariationOptionState {
    variationOptions: any[];
    search: string;
    variationId:number;
    setVariationId:(key: number) => void;
    setSearch: (key: string) => void;
    getAllVariationOptions: (page: number) => Promise<void>;
    createVariationOption: (option: VariationOptionDto) => Promise<void>;
    updateVariationOption: (id: number, option: VariationOptionDto) => Promise<void>;
    deleteVariationOption: (id: number) => Promise<void>;
    current: number;
    totalElements: number;

}

export const useVariationOptionStore=create<VariationOptionState>((set,get)=>({
    variationOptions:[],
    search:"",
    current: 1,
    totalElements: 0,
    variationId:0,

    setSearch:(s)=>{
        set({search:s})
    },
    setVariationId:(s)=>{
        set({variationId:s})
    },

    getAllVariationOptions: async (page: number) => {
        const apiCall = () => getAllVariationOptions(page, get().search,get().variationId);
        const onSuccess = (response: any) => {
            set({
                variationOptions: response.data.content,
                current: page,
                totalElements: response.data.totalElements,

            });
        };
        return await handleApiRequest(apiCall, onSuccess);
    },
    createVariationOption: async (option:VariationOptionDto) => {
        const apiCall = () => createVariationOption(option);
        const onSuccess = (response: any) => {
            get().getAllVariationOptions(get().current);

        };
        return await handleApiRequest(apiCall, onSuccess);
    },
    updateVariationOption:async (id:number,option:VariationOptionDto)=>{
        const apiCall = () => updateVariationOptionById(id, option);
        const onSuccess = (response: any) => {
            get().getAllVariationOptions(get().current);
        };
        return await handleApiRequest(apiCall, onSuccess);
    },
    deleteVariationOption:async (id:number)=>{
        const apiCall = () => deleteVariationOptionById(id);
        const onSuccess = (response: any) => {
            if (get().variationOptions.length === 1 && get().current > 1) {
                get().getAllVariationOptions(get().current - 1);
            } else {

                get().getAllVariationOptions(get().current);
            }
        };
        return await handleApiRequest(apiCall, onSuccess);
    }
}))
