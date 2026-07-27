"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { loginAction } from "../_actions/loginAction"
import { useActionState, useEffect } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"


const LoginForm = () => {
  const [state,action,pending]=useActionState(loginAction,false)
  const router=useRouter()

  // to see toast message
 useEffect(() => {
   if (!state) return;

   if (state.success) {
     toast.success(state.message);
    //  after login redirect dashboard
    // router.push("/dashboard")

   } else {
     toast.error(state.message);
   }
 }, [state,router]);

  return (
    <form action={action} className="space-y-5 ">
        <Card className="p-5 space-y-4">
            <Input required placeholder="Enter your email" name="email" type="email"></Input>
            <Input required placeholder="Enter your password" name="password" type="password"></Input>
            <Button  type="submit">{pending?"Submitting":"Login"}</Button>
        </Card>
    </form>
  )
}

export default LoginForm