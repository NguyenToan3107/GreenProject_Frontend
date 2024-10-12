import api from "@/apis/request";
export function getDashBoard(){
    return api.get(`dashboard/statistics`);
}