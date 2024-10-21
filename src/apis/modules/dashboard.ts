import api from "@/apis/request";
export function getDashBoard(){
    return api.get(`dashboard/statistics`);
}

export function getOrderDashBoard(quarter:number,year:number){
    return api.get(`dashboard/order?quarter=${quarter}&year=${year}`);
}

export function getRevenueDashBoard(quarter:number,year:number){
    return api.get(`dashboard/revenue?quarter=${quarter}&year=${year}`);
}

export function getUserDashBoard(quarter:number,year:number){
    return api.get(`dashboard/user?quarter=${quarter}&year=${year}`);
}

export function getTopUserDashBoard(){
    return api.get(`dashboard/top-user`);
}

export function getProductDashBoard(){
    return api.get(`dashboard/products`);
}

export function getPercentageDashBoard(){
    return api.get(`dashboard/percentage-returned-order`);
}