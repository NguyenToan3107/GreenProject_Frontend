import { create } from "zustand";
import { message } from "antd"; // Import hàm handleApiRequest
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
    loading: boolean;
    search: string;
    setSearch: (key: string) => void;
    getAllProducts: (page: number, size: number) => Promise<void>;
    createProduct: (product: ProductDto) => Promise<void>;
    updateProduct: (id: number, product: ProductDto) => Promise<void>;
    deleteProduct: (id: number) => Promise<void>;
    current: number;
    pageSize: number;
    totalElements: number;
}

export const useProductStore = create<ProductState>((set, get) => ({
    products: [],
    loading: false,
    search: "",
    current: 1,
    pageSize: 5,
    totalElements: 0,

    setSearch: (key: string) => {
        set({ search: key });
    },

    getAllProducts: async (page: number, size: number) => {
        const apiCall = () => getAllProducts(page, size, get().search);
        const onSuccess = (response: any) => {
            set({
                products: response.data.content,
                current: page,
                pageSize: size,
                totalElements: response.data.totalElements,
            });
        };
        await handleApiRequest(apiCall, onSuccess, (loading:boolean) => set({ loading }));
    },

    createProduct: async (product: ProductDto) => {
        const apiCall = () => createNewProduct(product);
        const onSuccess = (response: any) => get().getAllProducts(get().current, get().pageSize);
        await handleApiRequest(apiCall, onSuccess, (loading:boolean) => set({ loading }));
    },

    updateProduct: async (id: number, product: ProductDto) => {
        const apiCall = () => updateProductById(id, product);
        const onSuccess = (response: any) => get().getAllProducts(get().current, get().pageSize);
        await handleApiRequest(apiCall, onSuccess, (loading:boolean) => set({ loading }));
    },

    deleteProduct: async (id: number) => {
        const apiCall = () => deleteProductById(id);
        const onSuccess = (response: any) => get().getAllProducts(get().current, get().pageSize);
        await handleApiRequest(apiCall, onSuccess, (loading:boolean) => set({ loading }));
    },
}));
