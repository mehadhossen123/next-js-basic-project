import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'


const RegisterForm = () => {
  return (
    <form className="">
      <Card className="p-2  space-y-2">
        <div>
          <Label className="py-2">Your name </Label>
          <Input name="name" type="text" placeholder="Your name"></Input>
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
            <Label  className='py-2'>Your password</Label>
          <Input
            name="password"
            placeholder="Enter your password"
            type="password"
            required
          ></Input>
        </div>
      </Card>
    </form>
  );
}

export default RegisterForm