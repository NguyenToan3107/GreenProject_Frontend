import {create} from "zustand";
import {getAllProducts} from "@/apis/modules/product";
import {handleApiRequest} from "@/app/util/utils";
import {registerRequest,logoutRequest, loginRequest} from "@/apis/modules/auth";

interface AuthState{
    pathname:string,
    loading:boolean,
    setPathname:(path:string)=>void,
    login:(data:any)=>Promise<void>,
    register:(data:any)=>Promise<void>,
    logout:()=>Promise<void>,
}

export const useAuthStore=create<AuthState>((set,get)=>({
    pathname:"/login",
    loading:false,
    setPathname:(path:string)=>{
        set({
            pathname:path
        })
    },
    login:async(data:any)=>{
        const apiCall = () => loginRequest(data);
        const onSuccess = (response: any) => {
            const authorities: Array<string> = response.data.authorities;
            if (authorities[0] == "ADMIN") {
                window.location.href = "/admin";
            } else if (authorities[0] == "USER") {
                window.location.href = "/home";
            }
        };
        await handleApiRequest(apiCall, onSuccess, (loading:boolean) => set({ loading }));

    },
    register:async(data:any)=>{
        const apiCall = () => registerRequest(data);
        const onSuccess = (response: any) => {
            set({
                pathname:"/login"
            })

        };
        await handleApiRequest(apiCall, onSuccess, (loading:boolean) => set({ loading }));

    },
    logout:async()=>{
        const apiCall = () => logoutRequest();
        const onSuccess = (response: any) => {
            window.location.href="/auth"

        };
        await handleApiRequest(apiCall, onSuccess, (loading:boolean) => set({ loading }));

    }
}))