
import React, { use } from 'react'
import getMe from '../service/myProfile'

const PublicPage =async () => {
  const user=await getMe();
  console.log("user",user)
  
  return (
    <div>Hello this is prisma press project</div>
  )
}

export default PublicPage