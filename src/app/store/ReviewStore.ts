
import {create} from "zustand";
import {handleApiRequest} from "@/app/util/utils";
import {getAllReviewByProductItemId,createReview,deleteReviewById,getReviewById} from "@/apis/modules/review";
import { Anybody } from "next/font/google";

interface ReviewState {
    reviews: any[];
    currentProductItem: any;
    alreadyReview:boolean;
    setAlreadyReview:(isReview:boolean) => void,
    setCurrentProductItem:(productItem:any) => void,
    getReviewById: (productItemId:any) => Promise<void>;
    getAllReviewByProductItemId: (page: number,productItemId:any) => Promise<void>;
    createReview: (review: any,productItemId:any) => Promise<void>;
    // updateReviewById: (productItemId:any) => Promise<void>;
    deleteReviewById: (id: number,productItemId:any) => Promise<void>;
    current: number;
    setCurrent:(cur:number)=>void,
    totalElements: number;
}

export const useReviewStore=create<ReviewState>((set,get)=>({
    reviews:[],
    current: 1,
    totalElements: 0,
    alreadyReview: false,
    currentProductItem:null,

    setAlreadyReview:(isReview:boolean) =>{
        set({alreadyReview:isReview});
    },

    setCurrent:(cur:number) =>{
        set({current:cur});
    },

    setCurrentProductItem: (productItem:any) => {
        set({ currentProductItem: productItem });
    },

    getReviewById: async (productItemId:any) =>{
        const apiCall = () => getReviewById(productItemId);
        const onSuccess = (response: any) => {
               if(response.data == null){
                    set({
                        alreadyReview:false 
                    })
               }else{
                    set({
                        alreadyReview:true 
                    })
               }
        };
        return await handleApiRequest(apiCall, onSuccess);
    },

    getAllReviewByProductItemId: async (page: number,productItemId:any) => {
        const apiCall = () => getAllReviewByProductItemId(page,productItemId);
        const onSuccess = (response: any) => {
                set({
                    reviews: response.data.content,
                    current: page,
                    totalElements: response.data.totalElements,
                });

        };
        return await handleApiRequest(apiCall, onSuccess);
    },

    createReview: async (voucher:any,productItemId:any) => {
        const apiCall = () => createReview(voucher);
        const onSuccess = (response: any) => {
            get().getAllReviewByProductItemId(get().current,productItemId);
        };
        return await handleApiRequest(apiCall, onSuccess);
    },

    // updateReviewById:async (productItemId:any)=>{
    //     const apiCall = () => updateReviewById(productItemId);
    //     const onSuccess = (response: any) => {
    //         get().getAllReviewByProductItemId(get().current,productItemId);
    //     };
    //     return await handleApiRequest(apiCall, onSuccess);
    // },

    deleteReviewById:async (id:number,productItemId:any)=>{
        const apiCall = () => deleteReviewById(id);
        const onSuccess = (response: any) => {
            if (get().reviews.length === 1 && get().current > 1) {
                get().getAllReviewByProductItemId(get().current - 1,productItemId);
            } else {

                get().getAllReviewByProductItemId(get().current,productItemId);
            }
        };
        return await handleApiRequest(apiCall, onSuccess);
    }
}))
