"use server"




export type RegisterResponse = {
  success: boolean;
  successStatus: number;
  message: string;
  data: any;
}; 
export const registerAction = async (
  prevState: RegisterResponse,
  formData: FormData,
) => {
  const name = formData.get("name");
  console.log(name, "name");
  const email = formData.get("email");
  const password = formData.get("password");
  const payload = {
    name,
    email,
    password,
  };
  //   send request and get response
  const res = await fetch(`${process.env.BACKEND_API_URL}/api/user/register`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result = await res.json();

  return result;
    
};