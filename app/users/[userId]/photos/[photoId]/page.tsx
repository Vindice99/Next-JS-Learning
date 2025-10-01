'use client'
import React from 'react'
import { useParams } from 'next/navigation'


const userPhotos = () => {
   const params = useParams();
  // params will be { userId: '1', photoId: '2' } for /users/1/photos/2
  return (
    <div>
      User ID: {params.userId}
      <br />
      Photo ID: {params.photoId}
    </div>
  )
}

export default userPhotos