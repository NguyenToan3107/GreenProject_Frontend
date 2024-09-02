"use client"
import {logoutRequest} from "@/apis/modules/auth";
import {getAllCategories} from "@/apis/modules/category";
import {getLocalStorage, removeLocalStorage} from "@/ultis/localStorageUtils";

export default function page(){
    async function logout() {
        const res= await logoutRequest();
        console.log(res)
        removeLocalStorage("user_data")
        window.location.href="/auth"
    }

    async function getCategories() {
        const res= await getAllCategories();
        console.log(res)
    }
    console.log(getLocalStorage("user_data"))


    return (<div>

        <button onClick={logout}>Log out</button>
        <button onClick={getCategories}>Get category</button>
    </div>)
}