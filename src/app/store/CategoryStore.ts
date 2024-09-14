import { create } from "zustand";

import {
    getAllCategories,
    createNewCategory,
    updateCategoryById,
    deleteCategoryById,
    getAllCategoriesParent
} from "@/apis/modules/category";
import { Category } from "@/app/model/Category";
import { CategoryDto } from "@/app/admin/_components/categories/CategoryForm";
import {handleApiRequest} from "@/app/util/utils";

interface CategoryState {
    categories: any[];
    categoriesWithPagination: Category[];
    loading: boolean;
    search: string;
    setSearch: (key: string) => void;
    fetchCategories: () => Promise<void>;
    getAllCategories: (page: number, size: number) => Promise<void>;
    createCategory: (newCategory: CategoryDto) => Promise<void>;
    updateCategory: (id: number, category: CategoryDto) => Promise<void>;
    deleteCategory: (id: number) => Promise<void>;
    current: number;
    pageSize: number;
    totalElements: number;
}

export const useCategoryStore = create<CategoryState>((set, get) => ({
    categories: [],
    categoriesWithPagination: [],
    loading: false,
    search: "",
    current: 1,
    pageSize: 5,
    totalElements: 0,

    setSearch: (key: string) => {
        set({ search: key });
    },

    // Fetch categories không phân trang
    fetchCategories: async () => {
        const apiCall = () => getAllCategoriesParent();
        const onSuccess = (response: any) => {
            set({
                categories: response.data,
            });
        };
        await handleApiRequest(apiCall, onSuccess, (loading:boolean) => set({ loading }));
    },

    // Fetch categories có phân trang
    getAllCategories: async (page: number, size: number) => {
        const apiCall = () => getAllCategories(page, size, get().search);
        const onSuccess = (response: any) => {
            set({
                categoriesWithPagination: response.data.content,
                current: page,
                pageSize: size,
                totalElements: response.data.totalElements,
            });
        };
        await handleApiRequest(apiCall, onSuccess, (loading:boolean) => set({ loading }));
    },

    // Create category
    createCategory: async (newCategory: CategoryDto) => {
        const apiCall = () => createNewCategory(newCategory);
        const onSuccess = (response: any) => {
            get().fetchCategories();
            get().getAllCategories(get().current, get().pageSize);
        };
        await handleApiRequest(apiCall, onSuccess, (loading:boolean) => set({ loading }));
    },

    // Update category
    updateCategory: async (id: number, category: CategoryDto) => {
        const apiCall = () => updateCategoryById(id, category);
        const onSuccess = (response: any) => {
            get().fetchCategories();
            get().getAllCategories(get().current, get().pageSize);
        };
        await handleApiRequest(apiCall, onSuccess, (loading:boolean) => set({ loading }));
    },

    // Delete category
    deleteCategory: async (id: number) => {
        const apiCall = () => deleteCategoryById(id);
        const onSuccess = (response: any) => {
            get().fetchCategories();
            get().getAllCategories(get().current, get().pageSize);
        };
        await handleApiRequest(apiCall, onSuccess, (loading:boolean) => set({ loading }));
    },
}));
