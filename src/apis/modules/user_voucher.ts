import api from "@/apis/request";
import { PAGE_SIZE } from "@/app/util/constant";

/* Mới thêm */
export function getMyVoucher(pageNum: any) {
    if(pageNum == 0){
        return api.get(`user_voucher/my_voucher`);
    }
    return api.get(`user_voucher/my_voucher?pageNum=${pageNum}&pageSize=${PAGE_SIZE}`);
}

export function redeemVoucher(voucherId: number) {
    return api.post(`user_voucher/redeem?voucherId=${voucherId}`)
}
/* Mới thêm */