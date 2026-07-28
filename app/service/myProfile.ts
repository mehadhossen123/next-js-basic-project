"use server"

import { cookies } from "next/headers";

const getMe = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");

  if (!accessToken) {
    return{
      success:false,
      message:"User not logged in"
    }
  }

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/user/me`, {
   
    headers: {
      Cookie: `accessToken=${accessToken.value}`,
    },
    cache:"force-cache",
    next:{
      revalidate:60*60*24,
      tags:["my-profile"]
    }
  });

  const result =await  res.json();
  console.log(result)
  return result;
};

export default getMe;
