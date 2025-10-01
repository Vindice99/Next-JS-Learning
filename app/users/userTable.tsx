import React from 'react'
import { sort } from 'fast-sort'
import Link from 'next/link';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  zipcode: string;
}

interface Props {
  sortOrder: string
}
const userTable = async ({ sortOrder }: Props) => {
  //Caching in nextjs - revalidate after 10 seconds {next: {revalidate: 10}}
  const response = await fetch('https://jsonplaceholder.typicode.com/users', { cache: 'no-store' });
  const rawUsers = await response.json();

  //Flatten the json data
  const users: User[] = rawUsers.map((user: any) => ({
    id: user.id,
    name: user.name,
    username: user.username,
    email: user.email,
    zipcode: user.address.zipcode,
  }));

  let sortedUser
  if ((sortOrder) === 'email') {
    sortedUser = sort(users).asc(user => user.email)
  }
  else if ((sortOrder) === 'username') {
    sortedUser = sort(users).asc(user => user.username)
  }
  else if ((sortOrder) === 'zipcode') {
    sortedUser = sort(users).asc(user => user.zipcode)
  }
  else
    sortedUser = sort(users).asc(user => user.name)

  return (
    <>
      {/* <p>{new Date().toLocaleTimeString()}</p> */}
      <button className="btn p-3 ml-3 mb-5" popoverTarget="popover-1" style={{ anchorName: "--anchor-1" }  as React.CSSProperties }>
        Sort Order
      </button>

      <ul className="dropdown menu w-52 rounded-box bg-base-100 shadow-sm"
        popover="auto" id="popover-1" style={{ positionAnchor: "--anchor-1" }  as React.CSSProperties }>
        <li><Link href="/users?sortOrder=name">Name</Link></li>
        <li><Link href="/users?sortOrder=email">Email</Link></li>
      </ul>
      <table className='table-auto border-separate border border-gray-400'>
        <thead>
          <tr>
            <th className="border border-gray-300"><Link href="/users?sortOrder=name">Name</Link></th>
            <th className="border border-gray-300"><Link href="/users?sortOrder=username">User Name</Link></th>
            <th className="border border-gray-300"><Link href="/users?sortOrder=email">Email</Link></th>
            <th className="border border-gray-300"><Link href="/users?sortOrder=zipcode">Zipcode</Link></th>
          </tr>
        </thead>
        <tbody>
          {sortedUser.map(user => <tr key={user.id}>
            <td className="border border-gray-300">{user.name}</td>
            <td className="border border-gray-300">{user.username}</td>
            <td className="border border-gray-300">{user.email} </td>
            <td className="border border-gray-300">{user.zipcode}</td>
          </tr>)}
        </tbody>
      </table>
    </>
  )
}

export default userTable