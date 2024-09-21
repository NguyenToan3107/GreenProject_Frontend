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
    categoriesTree: any[];
    categories: Category[];
    loading: boolean;
    search: string;
    current: number;
    totalElements: number;
    setSearch: (key: string) => void;
    fetchCategories: () => Promise<void>;
    getAllCategories: (page: number) => Promise<void>;
    createCategory: (newCategory: CategoryDto) => Promise<void>;
    updateCategory: (id: number, category: CategoryDto) => Promise<void>;
    deleteCategory: (id: number) => Promise<void>;


}

export const useCategoryStore = create<CategoryState>((set, get) => ({
    categoriesTree: [],
    categories: [],
    loading: false,
    search: "",
    current: 1,
    totalElements: 0,





    setSearch: (key: string) => {
        set({ search: key });
    },


    fetchCategories: async () => {
        const apiCall = () => getAllCategoriesParent();
        const onSuccess = (response: any) => {
            set({
                categoriesTree: response.data,
            });
        };
        return await handleApiRequest(apiCall, onSuccess);
    },


    getAllCategories: async (page: number) => {
        const apiCall = () => getAllCategories(page, get().search);
        const onSuccess = (response: any) => {
            set({
                categories: response.data.content,
                current: page,
                totalElements: response.data.totalElements,
            });
        };
        return await handleApiRequest(apiCall, onSuccess);
    },

    // Create category
    createCategory: async (newCategory: CategoryDto) => {
        const apiCall = () => createNewCategory(newCategory);
        const onSuccess = (response: any) => {
            get().getAllCategories(get().current);
            get().fetchCategories();

        };
        return await handleApiRequest(apiCall, onSuccess);
    },

    // Update category
    updateCategory: async (id: number, category: CategoryDto) => {
        const apiCall = () => updateCategoryById(id, category);
        const onSuccess = (response: any) => {
            get().getAllCategories(get().current);
            get().fetchCategories();

        };
        return await handleApiRequest(apiCall, onSuccess);
    },


    deleteCategory: async (id: number) => {
        const apiCall = () => deleteCategoryById(id);
        const onSuccess = (response: any) => {
            get().getAllCategories(1);
            get().fetchCategories();
        };
        return await handleApiRequest(apiCall, onSuccess);
    },
}));
