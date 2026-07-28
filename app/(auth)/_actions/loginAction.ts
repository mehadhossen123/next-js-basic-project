"use server"

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt, { JwtPayload } from "jsonwebtoken"

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
    const result=await res.json();

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

        // decoded the access token to redirect particular role dashboard
        const decodedToken= jwt.decode(result?.data?.accessToken) as JwtPayload
       if(decodedToken.role=="user"){
          redirect("/dashboard");

       }else if (decodedToken.role=="admin"){
        redirect("admin-dashboard")
       } else if (decodedToken.role=="author"){
        redirect("/author-dashboard")
       }
       
      
    }

    return result

}