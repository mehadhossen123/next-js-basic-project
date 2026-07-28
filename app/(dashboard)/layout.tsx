import { Navbar } from '@/components/ui/navbar';
import React from 'react'
import getMe from '../service/myProfile';

const DashboardLayout = async({children}:{children:React.ReactNode}) => {
    const user = await getMe();
  return (
    <>
      <Navbar user={user}></Navbar>
      {children}
    </>
  );
}

export default DashboardLayout