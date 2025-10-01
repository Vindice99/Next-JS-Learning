import { notFound } from 'next/navigation'
import React from 'react'


interface Props{
    params: {userId: number}
}
const UserDetailPasge = ({params: {userId} }: Props) => {
  if(userId > 5) notFound()
  return (
    <div >UserDetailPasge :{userId}</div>
  )
}

export default UserDetailPasge