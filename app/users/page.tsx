import React, { Suspense } from 'react'
import Usertable from './userTable'
import Link from 'next/link'
interface Props{
  searchParams: {sortOrder: string}
}
const userPage = async ({searchParams} : Props) => {
  // Dont need await cause searchParams is alreadyplain
  const {sortOrder} = await searchParams
  console.log(sortOrder)
  return (
    <>
      <h1 className='ml-3'>Users</h1>
      <Link href='/users/news' className='btn mb-5'>New User</Link>
      {/* What user will see when first loading the page - still guaranteeing SEO */}
    <Suspense fallback={<p>Loading...</p>}>
      <Usertable sortOrder={sortOrder}/>
    </Suspense>
    </>
  )
}

export default userPage