import { Navbar } from '@/components/ui/navbar';
import React from 'react'
import getMe from '../service/myProfile';

const AuthLayout =async ({children}:{children:React.ReactNode}) => {
  const user=await getMe()
  return (
   <div >
    <Navbar user={user}></Navbar>
    {children}
    </div>
  )
}

export default AuthLayout;