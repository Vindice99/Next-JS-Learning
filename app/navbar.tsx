'use client'

import Link from 'next/link'
import React from 'react'
import SignIn from './component/signin'
import { useSession } from 'next-auth/react'
const Navbar = () => {
  const {status, data: session} = useSession();

  return (
    <div className='flex bg-blue-300 p-5 space-x-3'>
        <Link href='/' className='mr-5'>Next.js</Link>
        <Link href='/users'>users</Link>
        {status === 'loading' && <div>Loading..</div> }
        {status === 'authenticated' &&  <div>{session.user!.name} 
          <Link href="/api/auth/signout" className='ml-3'>Sign Out</Link>
          </div>}
        {status === 'unauthenticated' &&  <Link href='/api/auth/signin'>Login with Google</Link>}
    </div>
  )
}

export default Navbar