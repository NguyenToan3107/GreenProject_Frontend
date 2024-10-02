
import {create} from "zustand";
import {handleApiRequest} from "@/app/util/utils";
import {getMyVoucher,redeemVoucher} from "@/apis/modules/user_voucher";
import {PAGE_SIZE} from "@/app/util/constant";

interface UserVoucherState {
    userVouchers: any[];
    getMyVoucher: (page: number) => Promise<void>;
    redeemVoucher: (id:number) => Promise<void>;
    current: number;
    totalElements: number;

}

export const useVoucherStore=create<UserVoucherState>((set,get)=>({
    userVouchers:[],
    current: 1,
    totalElements: 0,

    getMyVoucher: async (page: number) => {
        const apiCall = () => getMyVoucher(page);
        const onSuccess = (response: any) => {
                set({
                    userVouchers: response.data.content,
                    current: page,
                    totalElements: response.data.totalElements,
                });

        };
        return await handleApiRequest(apiCall, onSuccess);
    },

    redeemVoucher:async (id:number) => {
        const apiCall = () => redeemVoucher(id);
        const onSuccess = (response: any) => {
        
        };
    return await handleApiRequest(apiCall, onSuccess);
    }
}))
