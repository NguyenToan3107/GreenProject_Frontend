import { create } from "zustand";
import {
    createNewProduct,
    deleteProductById,
    getAllProducts,
    updateProductById
} from "@/apis/modules/product";
import { ProductDto } from "@/app/admin/_components/products/ProductForm";
import {handleApiRequest} from "@/app/util/utils";

interface ProductState {
    products: any[];
    productsSelect:any[];
    search: string;
    setSearch: (key: string) => void;
    getAllProducts: (page: number) => Promise<void>;
    createProduct: (product: ProductDto) => Promise<void>;
    updateProduct: (id: number, product: ProductDto) => Promise<void>;
    deleteProduct: (id: number) => Promise<void>;
    current: number;
    totalElements: number;
    categoryId:number;
    setCategoryId:(key: number) => void;


}

export const useProductStore = create<ProductState>((set, get) => ({
    products: [],
    productsSelect:[],
    search: "",
    current: 1,
    pageSize: 5,
    totalElements: 0,
    categoryId:0,


    setSearch: (key: string) => {
        set({ search: key });
    },
    setCategoryId: (key) => {
        set({ categoryId: key });
    },

    getAllProducts: async (page: number) => {
        const apiCall = () => getAllProducts(page, get().search,get().categoryId);
        const onSuccess = (response: any) => {
            if(!response.data.content){
                set({
                    productsSelect:response.data,
                })
            }else {
                set({
                    products: response.data.content,
                    current: page,
                    totalElements: response.data.totalElements,
                });
            }

        };
        return await handleApiRequest(apiCall, onSuccess);
    },

    createProduct: async (product: ProductDto) => {
        const apiCall = () => createNewProduct(product);
        const onSuccess = (response: any) =>{
            get().getAllProducts(get().current);
            get().getAllProducts(0);

        }
        return await handleApiRequest(apiCall, onSuccess);
    },

    updateProduct: async (id: number, product: ProductDto) => {
        const apiCall = () => updateProductById(id, product);
        const onSuccess = (response: any) => {
            get().getAllProducts(get().current);
            get().getAllProducts(0);
        }
        return await handleApiRequest(apiCall, onSuccess);
    },

    deleteProduct: async (id: number) => {
        const apiCall = () => deleteProductById(id);
        const onSuccess = (response: any) => {
            if (get().products.length === 1 && get().current > 1) {
                get().getAllProducts(get().current - 1);
            } else {
                get().getAllProducts(get().current);
            }
            get().getAllProducts(0);
        }
        return await handleApiRequest(apiCall, onSuccess);
    },
}));
