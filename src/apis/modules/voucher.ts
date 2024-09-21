import api from "@/apis/request";
import {PAGE_SIZE} from "@/app/util/constant";


export function getAllVouchers(pageNum:any,search:string) {
    if(pageNum==0){
        return api.get(`vouchers`);
    }
    if(search.trim()!=""){
        return api.get(`vouchers?pageNum=${pageNum}&pageSize=${PAGE_SIZE}&search=${search.trim()}`);
    }else {
        return api.get(`vouchers?pageNum=${pageNum}&pageSize=${PAGE_SIZE}`);
    }

}

export function createVoucher(voucher:any){
    return api.post('vouchers/create',voucher)
}

export function updateVoucherById(id:number,voucher:any){
    return api.put(`vouchers/update/${id}`,voucher)
}

export function deleteVoucherById(id:number){
    return api.delete(`vouchers/delete/${id}`)
}