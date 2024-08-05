
import { AuthHook } from '@/app/Context/AuthContext'
import { useRouter } from 'next/router'
import React, { ReactNode } from 'react'

const RequireAuth:React.FC<{children:ReactNode}> = ({children}) => {
    const authHook=AuthHook()
    const router=useRouter()
  return (
    <div>
      {authHook?router.push('/taskmanagement'):children}
    </div>
  )
}

export default RequireAuth
