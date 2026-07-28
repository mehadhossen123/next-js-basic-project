import { Navbar } from "@/components/ui/navbar";
import React from "react";
import getMe from "../service/myProfile";

const PublicLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getMe();
  return (
    <>
      <Navbar user={user}></Navbar>
      {children}
    </>
  );
};

export default PublicLayout;
