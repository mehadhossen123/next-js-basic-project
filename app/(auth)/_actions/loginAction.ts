"use server"

import { cookies } from "next/headers";

type PrevState = {
  success: boolean
  successStatus:number
  message: string
  data:{
    accessToken:string,
    refreshToken:string
  }
};

export const loginAction=async(prevState:PrevState,formData:FormData)=>{
   
    const email=formData.get("email");
    const password=formData.get("password");
    const payload={
        email,
        password
    }

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/login`,{
        method:"POST",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify(payload)
    });
    const result:PrevState=await res.json();

    // set cookies into browser
    if(result.success){
        const cookieStore=await cookies()
        // set access token 
        cookieStore.set("accessToken",result.data.accessToken,{
            httpOnly:true,
            maxAge:60*60*24,
            sameSite:"lax"
            
        })
        // set refresh token 
        cookieStore.set("refreshToken",result.data.accessToken,{
            httpOnly:true,
            maxAge:60*60*24*7,
            sameSite:"lax"
            
        })
    }

    return result

}