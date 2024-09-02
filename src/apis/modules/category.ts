import api from "@/apis/request";

export function getAllCategories() {
    return api.get(`categories`);
}
