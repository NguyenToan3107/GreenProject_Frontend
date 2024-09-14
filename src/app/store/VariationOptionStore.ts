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
    loading: boolean;
    search: string;
    setSearch: (key: string) => void;
    getAllVariationOptions: (page: number, size: number) => Promise<void>;
    createVariationOption: (option: VariationOptionDto) => Promise<void>;
    updateVariationOption: (id: number, option: VariationOptionDto) => Promise<void>;
    deleteVariationOption: (id: number) => Promise<void>;
    current: number;
    pageSize: number;
    totalElements: number;
}

export const useVariationOptionStore=create<VariationOptionState>((set,get)=>({
    variationOptions:[],
    loading: false,
    search:"",
    current: 1,
    pageSize: 5,
    totalElements: 0,
    setSearch:(s)=>{
        set({search:s})
    },

    getAllVariationOptions: async (page: number, size: number) => {
        const apiCall = () => getAllVariationOptions(page, size, get().search);
        const onSuccess = (response: any) => {
            set({
                variationOptions: response.data.content,
                current: page,
                pageSize: size,
                totalElements: response.data.totalElements,
            });
        };
        await handleApiRequest(apiCall, onSuccess, (loading:boolean) => set({ loading }));
    },
    createVariationOption: async (option:VariationOptionDto) => {
        const apiCall = () => createVariationOption(option);
        const onSuccess = (response: any) => {
            get().getAllVariationOptions(get().current, get().pageSize);
        };
        await handleApiRequest(apiCall, onSuccess, (loading:boolean) => set({ loading }));
    },
    updateVariationOption:async (id:number,option:VariationOptionDto)=>{
        const apiCall = () => updateVariationOptionById(id, option);
        const onSuccess = (response: any) => {
            get().getAllVariationOptions(get().current, get().pageSize);
        };
        await handleApiRequest(apiCall, onSuccess, (loading:boolean) => set({ loading }));
    },
    deleteVariationOption:async (id:number)=>{
        const apiCall = () => deleteVariationOptionById(id);
        const onSuccess = (response: any) => {
            get().getAllVariationOptions(get().current, get().pageSize);
        };
        await handleApiRequest(apiCall, onSuccess, (loading:boolean) => set({ loading }));
    }
}))
