import { create } from "zustand";

import {handleApiRequest} from "@/app/util/utils";
import {
    createNewProductItem,
    deleteProductItemById,
    getAllProductItems,
    updateProductItemById
} from "@/apis/modules/product_item";

interface ProductItemState {
    productItems: any[];
    loading: boolean;
    search: string;
    setSearch: (key: string) => void;
    getAllProductItems: (page: number, size: number) => Promise<void>;
    createProductItem: (product: any) => Promise<void>;
    updateProductItem: (id: number, product: any) => Promise<void>;
    deleteProductItem: (id: number) => Promise<void>;
    current: number;
    pageSize: number;
    totalElements: number;
    isUpdated:boolean;
}

export const useProductItemStore = create<ProductItemState>((set, get) => ({
    productItems: [],
    loading: false,
    search: "",
    current: 1,
    pageSize: 5,
    totalElements: 0,
    isUpdated:false,

    setSearch: (key: string) => {
        set({ search: key });
    },

    getAllProductItems: async (page: number, size: number) => {
        const apiCall = () => getAllProductItems(page, size, get().search);
        const onSuccess = (response: any) => {
                set({
                    productItems: response.data.content,
                    current: page,
                    pageSize: size,
                    totalElements: response.data.totalElements,
                    isUpdated:true,
                });

        };
        await handleApiRequest(apiCall, onSuccess, (loading:boolean) => set({ loading }));
    },

    createProductItem: async (productItem: any) => {
        const apiCall = () => createNewProductItem(productItem);
        const onSuccess = (response: any) =>{
           set({
               isUpdated:false
           })

        }
        await handleApiRequest(apiCall, onSuccess, (loading:boolean) => set({ loading }));
    },

    updateProductItem: async (id: number, productItem: any) => {
        const apiCall = () => updateProductItemById(id, productItem);
        const onSuccess = (response: any) => {
            set({
                isUpdated:false
            })
        }
        await handleApiRequest(apiCall, onSuccess, (loading:boolean) => set({ loading }));
    },

    deleteProductItem: async (id: number) => {
        const apiCall = () => deleteProductItemById(id);
        const onSuccess = (response: any) => {
            set({
                isUpdated:false
            })
        }
        await handleApiRequest(apiCall, onSuccess, (loading:boolean) => set({ loading }));
    },
}));
