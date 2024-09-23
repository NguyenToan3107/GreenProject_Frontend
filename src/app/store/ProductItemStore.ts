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
    search: string;
    setSearch: (key: string) => void;
    getAllProductItems: (page: number) => Promise<void>;
    createProductItem: (product: any) => Promise<void>;
    updateProductItem: (id: number, product: any) => Promise<void>;
    deleteProductItem: (id: number) => Promise<void>;
    current: number;
    totalElements: number;

}

export const useProductItemStore = create<ProductItemState>((set, get) => ({
    productItems: [],
    search: "",
    current: 1,
    totalElements: 0,

    setSearch: (key: string) => {
        set({ search: key });
    },

    getAllProductItems: async (page: number) => {
        const apiCall = () => getAllProductItems(page, get().search);
        const onSuccess = (response: any) => {
                set({
                    productItems: response.data.content,
                    current: page,
                    totalElements: response.data.totalElements,
                });

        };
        return await handleApiRequest(apiCall, onSuccess);
    },

    createProductItem: async (productItem: any) => {
        const apiCall = () => createNewProductItem(productItem);
        const onSuccess = (response: any) =>{
            get().getAllProductItems(get().current)


        }
        return await handleApiRequest(apiCall, onSuccess);
    },

    updateProductItem: async (id: number, productItem: any) => {
        const apiCall = () => updateProductItemById(id, productItem);
        const onSuccess = (response: any) => {
            get().getAllProductItems(get().current)
        }
        return await handleApiRequest(apiCall, onSuccess);
    },

    deleteProductItem: async (id: number) => {
        const apiCall = () => deleteProductItemById(id);
        const onSuccess = (response: any) => {
            if (get().productItems.length === 1 && get().current > 1) {
                get().getAllProductItems(get().current - 1);
            } else {

                get().getAllProductItems(get().current);
            }
        }
        return await handleApiRequest(apiCall, onSuccess);
    },
}));
