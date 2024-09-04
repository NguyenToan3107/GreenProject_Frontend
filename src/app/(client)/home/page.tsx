"use client"
import {logoutRequest} from "@/apis/modules/auth";
import {getAllCategories} from "@/apis/modules/category";
import {getLocalStorage, removeLocalStorage} from "@/ultis/localStorageUtils";
import {Button} from "antd";

export default function page(){
    async function logout() {
        const res= await logoutRequest();
        console.log(res)
        console.log("run logout")
        removeLocalStorage("user_data")
        window.location.href="/auth"
    }

    async function getCategories() {
        const res= await getAllCategories();
        console.log(res)
    }
    //console.log(getLocalStorage("user_data"))


    return (<div>

        <Button type="primary"  onClick={logout}>Log out</Button >
        <button onClick={getCategories}>Get category</button>
    </div>)
}