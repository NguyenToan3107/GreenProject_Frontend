import api from "@/apis/request";
export function getDashBoard(){
    return api.get(`dashboard/statistics`);
}

export function getOrderDashBoard(){
    return api.get(`dashboard/order`);
}

export function getRevenueDashBoard(){
    return api.get(`dashboard/revenue`);
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