"use client"
import {logoutRequest} from "@/apis/modules/auth";
import {getAllCategories} from "@/apis/modules/category";
import {getLocalStorage, removeLocalStorage} from "@/app/util/localStorageUtils";
import {Button} from "antd";

export default function page(){
    async function logout() {

    }

    async function getCategories() {

    }
    //console.log(getLocalStorage("user_data"))


    return (<div>

        <Button type="primary"  onClick={logout}>Log out</Button >
        <button onClick={getCategories}>Get category</button>
    </div>)
}