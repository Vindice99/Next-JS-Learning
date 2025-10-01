import Image from 'next/image'
import Link from 'next/link'
import ProductCard from './component/productCart'
import { auth } from "@/auth"
import va11 from '@/public/images/71GLTculCrL._UF1000,1000_QL80_.jpg'
import { object } from 'zod'
import { Metadata } from 'next'
export default async function Home() {
   const session = await auth() // server-side session
  return (
    <main className='relative h-screen'>
      <h1>Hello {session && <span>{session.user!.name}</span>}</h1> 
      {session ? (
        <>
          <p>Signed in as {session.user?.email}</p>
           <Link href="/api/auth/signout">Sign out</Link>
        </>
      ) : (
         <Link href="/api/auth/signin">Sign in with Google</Link>
      )}
      <Link  href="/users">Users</Link>
      <ProductCard/>
      <Image src={va11} alt=''/>
      <Image src="https://bit.ly/react-cover" alt='' fill className='object-cover'
       sizes= '(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw' quality={100}
       priority
       />
    </main>
  )
}

// export const metadata: Metadata = {
//   title: 'Home',

// }

export async function generateMetadata():
 Promise<Metadata> {
  const product = await fetch('')
  return {
    title: 'product.title', //without the quote
    description: 'product.description'
  }
}

