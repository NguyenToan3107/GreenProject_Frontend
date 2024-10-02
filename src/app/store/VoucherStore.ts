
import {create} from "zustand";
import {handleApiRequest} from "@/app/util/utils";
import {createVoucher,getAllVouchers,updateVoucherById,deleteVoucherById,getAllVoucherValid} from "@/apis/modules/voucher";
import {PAGE_SIZE} from "@/app/util/constant";

interface VoucherState {
    vouchers: any[];
    search: string;
    setSearch: (key: string) => void;
    getAllVouchers: (page: number) => Promise<void>;
    getAllValidVoucher: (page:number) => Promise<void>;
    createVoucher: (voucher: any) => Promise<void>;
    updateVoucher: (id: number, voucher: any) => Promise<void>;
    deleteVoucher: (id: number) => Promise<void>;
    current: number;
    totalElements: number;
}

export const useVoucherStore=create<VoucherState>((set,get)=>({
    vouchers:[],
    search:"",
    current: 1,
    totalElements: 0,


    setSearch:(s)=>{
        set({search:s})
    },

    getAllVouchers: async (page: number) => {
        const apiCall = () => getAllVouchers(page, get().search);
        const onSuccess = (response: any) => {
                set({
                    vouchers: response.data.content,
                    current: page,
                    totalElements: response.data.totalElements,
                });

        };
        return await handleApiRequest(apiCall, onSuccess);
    },

    createVoucher: async (voucher:any) => {
        const apiCall = () => createVoucher(voucher);
        const onSuccess = (response: any) => {
            if(get().vouchers.length<PAGE_SIZE){
                set({
                    vouchers:[...get().vouchers,response.data],
                })
                return;
            }
            get().getAllVouchers(get().current + 1);
        };
        return await handleApiRequest(apiCall, onSuccess);
    },
    updateVoucher:async (id:number,voucher:any)=>{
        const apiCall = () => updateVoucherById(id, voucher);
        const onSuccess = (response: any) => {
            const updated = get().vouchers.map((op: any) =>
                op.id === id ? response.data : op
            );

            set({
                vouchers: updated
            });
        };
        return await handleApiRequest(apiCall, onSuccess);
    },
    deleteVoucher:async (id:number)=>{
        const apiCall = () => deleteVoucherById(id);
        const onSuccess = (response: any) => {
            const updated = get().vouchers.filter((op: any) => op.id !== id);

            if (get().vouchers.length === 1 && get().current > 1) {
                get().getAllVouchers(get().current - 1);
                return;
            }
            set({
                vouchers: updated,

            });
        };
        return await handleApiRequest(apiCall, onSuccess);
    },

    /* Mới thêm */
    getAllValidVoucher:async (page:number) => {
        const apiCall = () => getAllVoucherValid(page);
        const onSuccess = (response: any) => {
            set({
                vouchers: response.data.content,
                current: page,
                totalElements: response.data.totalElements,
            });
        };
        return await handleApiRequest(apiCall, onSuccess);
    }
    /* Mới thêm */
}))
