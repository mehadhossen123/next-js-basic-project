"use client"
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { registerAction } from '../_actions/registerAction';
import { Button } from '@/components/ui/button';
import { useActionState, useEffect } from 'react';
import { toast } from 'sonner';


const RegisterForm = () => {
  const [state, action, pending] = useActionState(registerAction, false);

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
  }, [state]);

  return (
    <form action={action}>
      <Card className="p-2  space-y-2">
        <div>
          <Label className="py-2">Your name </Label>
          <Input
            className="bg-gray-200"
            name="name"
            type="text"
            placeholder="Your name"
          ></Input>
        </div>

        <div>
          <Label className="py-2">yor email</Label>
          <Input
            name="email"
            placeholder="Enter your email"
            type="email"
            required
          ></Input>
        </div>
        <div>
          <Label className="py-2">Your password</Label>
          <Input
            className="rounded-2xl"
            name="password"
            placeholder="Enter your password"
            type="password"
            required
          ></Input>
        </div>
        <Button type="submit">{pending ? "Registering..." : "Register"}</Button>
      </Card>
    </form>
  );
};

export default RegisterForm