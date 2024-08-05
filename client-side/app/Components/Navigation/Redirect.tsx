import { redirect } from 'next/navigation'
import React from 'react'

const Redirect = async(path:string) => {
    redirect(path)
}

export default Redirect
