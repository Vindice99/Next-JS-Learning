'use client'
import { useRouter } from 'next/navigation'
import React from 'react'

const NewUserPage = () => {
//Programmic Navigaiton
 const router = useRouter()

  return (
    <button className='btn-primary bg-emerald-300 p-4 rounded-3xl cursor-pointer'
    onClick={() => router.push('/users')} 
    >Create User</button>
  )
}

export default NewUserPage