
import {create} from "zustand";
import {handleApiRequest} from "@/app/util/utils";
import {createVoucher,getAllVouchers,updateVoucherById,deleteVoucherById} from "@/apis/modules/voucher";

interface VoucherState {
    vouchers: any[];
    loading: boolean;
    search: string;
    setSearch: (key: string) => void;
    getAllVouchers: (page: number, size: number) => Promise<void>;
    createVoucher: (voucher: any) => Promise<void>;
    updateVoucher: (id: number, voucher: any) => Promise<void>;
    deleteVoucher: (id: number) => Promise<void>;
    current: number;
    pageSize: number;
    totalElements: number;
    isUpdated:boolean

}

export const useVoucherStore=create<VoucherState>((set,get)=>({
    vouchers:[],
    loading: false,
    search:"",
    current: 1,
    pageSize: 5,
    totalElements: 0,
    isUpdated:false,

    setSearch:(s)=>{
        set({search:s})
    },

    getAllVouchers: async (page: number, size: number) => {
        const apiCall = () => getAllVouchers(page, size, get().search);
        const onSuccess = (response: any) => {
                set({
                    vouchers: response.data.content,
                    current: page,
                    pageSize: size,
                    totalElements: response.data.totalElements,

                });

        };

        await handleApiRequest(apiCall, onSuccess, (loading:boolean) => set({ loading }));
    },

    createVoucher: async (voucher:any) => {
        const apiCall = () => createVoucher(voucher);
        const onSuccess = (response: any) => {
            get().getAllVouchers(get().current, get().pageSize);
            set({
                isUpdated:false
            })

        };
        await handleApiRequest(apiCall, onSuccess, (loading:boolean) => set({ loading }));
    },
    updateVoucher:async (id:number,voucher:any)=>{
        const apiCall = () => updateVoucherById(id, voucher);
        const onSuccess = (response: any) => {
            get().getAllVouchers(get().current, get().pageSize);
            set({
                isUpdated:false
            })

        };
        await handleApiRequest(apiCall, onSuccess, (loading:boolean) => set({ loading }));
    },
    deleteVoucher:async (id:number)=>{
        const apiCall = () => deleteVoucherById(id);
        const onSuccess = (response: any) => {
            get().getAllVouchers(1, get().pageSize);
            set({
                isUpdated:false
            })

        };
        await handleApiRequest(apiCall, onSuccess, (loading:boolean) => set({ loading }));
    }
}))
