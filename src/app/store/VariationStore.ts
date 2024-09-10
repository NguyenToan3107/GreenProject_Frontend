import {Variation} from "@/app/model/Variation";
import {create} from "zustand";
import {message} from "antd";
import {createVariation, deleteVariation, getAllVariations, updateVariation} from "@/apis/modules/variation";
import {CreateVariationRequest, UpdateVariationRequest} from "@/app/admin/_components/categories/VariationForm";

interface VariationState {
    categoryId:number
    variationId:number|null
    loading: boolean
    variations:Variation[]
    setCategoryId:(id:number)=>void
    setVariationId:(id:number)=>void
    reload:()=>void
    getVariationsByCategoryId: (categoryId:number) => Promise<void>
    createVariation: (variation:CreateVariationRequest) => Promise<void>
    updateVariationById:(id:number,v:UpdateVariationRequest)=>Promise<void>
    deleteVariationById:(id:number)=>Promise<void>


}


export const useVariationStore=create<VariationState>((set,get)=>({
    categoryId:0,
    variationId:null,
    loading: false,
    variations:[],
    setCategoryId:(id:number)=>{
        set({categoryId:id})

    },
    setVariationId:(id:number)=>{
        set({variationId:id})

    },
    reload:()=>{
        get().getVariationsByCategoryId(get().categoryId)

    },

    getVariationsByCategoryId: async (categoryId:number) => {
        set({ loading: true });
        try {
            const res:any=await getAllVariations(categoryId);
            if(res.code==200){
                set({
                    variations: res.data,
                    loading: false
                });
                console.log(res)
                message.success(res.message);
            }

        } catch (error:any) {
            message.error(error.response.message);
            set({ loading: false });
        }
    },

    // Create category
    createVariation: async (variation:CreateVariationRequest) => {
        set({ loading: true });
        try {
            const res:any = await createVariation(variation);
            if(res.code==201){
                message.success(res.message)
                get().reload();


            }

            set({ loading: false });
        } catch (error:any) {
            message.error(error.response.message);

            set({ loading: false });
        }
    },
    updateVariationById:async (id:number,v:UpdateVariationRequest)=>{
        set({ loading: true });
        try {
            const res:any = await updateVariation(id,v);
            if(res.code==200){
                message.success(res.message)
                get().reload();
            }

            set({ loading: false });
        } catch (error:any) {
            message.error(error.response.message);

            set({ loading: false });
        }
    },
    deleteVariationById:async (id:number)=>{
        set({ loading: true });
        try {
            const res:any = await deleteVariation(id);
            console.log(res)
            if(res.code==200){
                message.success(res.message)
                get().reload();
            }

            set({ loading: false });
        } catch (error:any) {
            message.error(error.response.message);

            set({ loading: false });
        }
    }
}))
