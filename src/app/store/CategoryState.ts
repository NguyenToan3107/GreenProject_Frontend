import { create } from 'zustand';
import {
    getAllCategories,
    createNewCategory, updateCategoryById, deleteCategoryById
} from "@/apis/modules/category";
import { message } from "antd"
    ;
import { Category } from "@/app/model/Category";
import {CategoryDto} from "@/app/admin/_components/categories/CategoryForm";


interface CategoryState {
    categories: Category[];
    categoriesWithPagination: Category[];
    loading: boolean;
    fetchCategories: () => Promise<void>;
    getAllCategories: (page: number, size: number) => Promise<void>;
    createCategory: (newCategory: CategoryDto) => Promise<void>;
    updateCategory: (id: number, category: CategoryDto) => Promise<void>;
    deleteCategory: (id: number) => Promise<void>;
    current: number;
    pageSize: number;
    totalElements: number;
}

export const useCategoryStore = create<CategoryState>((set,get) => ({
    categories: [],
    categoriesWithPagination: [],
    loading: false,
    current: 1,
    pageSize: 10,
    totalElements: 0,

    // Fetch categories không phân trang
    fetchCategories: async () => {
        console.log("fetch categories")
        set({ loading: true });
        try {
            const response = await getAllCategories(null, null); // Gọi API không phân trang
            set({
                categories: response.data,
                loading: false
            });
        } catch (error) {
            console.error("Error fetching categories:", error);
            set({ loading: false });
        }
    },

    // Fetch categories có phân trang
    getAllCategories: async (page: number, size: number) => {
        console.log("fetch categories with pagination")
        set({ loading: true });
        try {
            const response = await getAllCategories(page, size); // Gọi API phân trang
            set({
                categoriesWithPagination: response.data.content,
                current: page,
                pageSize: size,
                totalElements: response.data.totalElements,
                loading: false
            });
        } catch (error) {
            console.error("Error fetching paginated categories:", error);
            set({ loading: false });
        }
    },

    // Create category
    createCategory: async (newCategory: CategoryDto) => {
        set({ loading: true });
        try {
            const res:any= await createNewCategory(newCategory);
            if(res.code==201){
                message.success(res.message)
                get().fetchCategories()
                get().getAllCategories(get().current,get().pageSize)

            }



            set({ loading: false });
        } catch (error:any) {
            console.log("Error updating category:", error);
            message.error(error.response.message);
            set({ loading: false });
        }
    },

    // Update category
    updateCategory: async (id: number, category: CategoryDto) => {
        set({ loading: true });
        try {
            const res:any=await updateCategoryById(id,category);
            if(res.code==200){
                message.success(res.message)
                get().fetchCategories()
                get().getAllCategories(get().current,get().pageSize)

            }

            set({ loading: false });
        } catch (error:any) {
            console.log("Error updating category:", error);
            message.error(error.response.message);
            set({ loading: false });
        }
    },

    // Delete category
    deleteCategory: async (id: number) => {
        set({ loading: true });
        try {
            const res:any=await deleteCategoryById(id);
            if(res.code==200){
                message.success(res.message)
                get().fetchCategories()
                get().getAllCategories(get().current,get().pageSize)
            }

            set({ loading: false });
        } catch (error:any) {
            console.error("Error deleting category:", error);
            message.error(error.response.message)
            set({ loading: false });
        }
    }
}));
