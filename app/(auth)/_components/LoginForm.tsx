"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { loginAction } from "../_actions/loginAction"


const LoginForm = () => {
  return (
    <form action={loginAction} className="space-y-5 ">
        <Card className="p-5 space-y-4">
            <Input required placeholder="Enter your email" name="email" type="email"></Input>
            <Input required placeholder="Enter your password" name="password" type="password"></Input>
            <Button type="submit">Login</Button>
        </Card>
    </form>
  )
}

export default LoginForm