import {create} from "zustand";



interface OrderState{
    orderId:number,
    order:any,
    setOrderId:(id:number)=>void
    setOrder:(order:any)=>void,
    setContactToOrder:(contact:any)=>void

}

export const useOrderStore=create<OrderState>((set,get)=>({
    orderId:0,
    order:null,
    setOrderId:(id:number)=>{
        set({orderId:id})
    },
    setOrder:(order:any)=>{
        set({
            order:order
        })
    },
    setContactToOrder:(contact:any)=>{
        set({
            order:{
                ...get().order,
                contact
            }
        })
    }


}))