import api from "@/apis/request";

export function createOrderByNow(data:any){
    return api.post("orders/create",data)
}
export function createOrderByCart(){
    return api.post("orders/createByCart")
}

export function getOrderByNow(id:number){
    return api.get(`orders/${id}`)
}
export function deleteOrder(id:number){
    return api.delete(`orders/delete/${id}`)
}

export function updateContactOrder(data:any){
    return api.post(`orders/set-contact`,data)
}