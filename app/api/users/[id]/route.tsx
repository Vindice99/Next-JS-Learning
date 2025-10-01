import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";
import { safeParse } from "zod";
import { prisma } from "@/prisma/client";

// Need NextRequest to prevent caching
export async function GET(request: NextRequest, {params} : {params : {id: string}}){
  const id = Number(params.id)
  const userWithId = await prisma.user.findUnique({
    where : {id: id} // can use parseInt(params.id)
  })
  if (!userWithId) {
    return NextResponse.json({error : 'User not found'}, {status : 404})
  }
  else{
    return NextResponse.json(userWithId)
  }
}

// PUT function if you want to replace an object - PATCH function if you want to replace some properties in the object
export async function PATCH(
  request: NextRequest, 
  {params} : {params : {id: number}}){
  const body = await request.json()
  const validation = schema.safeParse(body)
  if(!validation.success) 
    return NextResponse.json( validation.error, {status : 400})
  if(params.id > 10)
    return NextResponse.json({error: 'User not found'}, {status : 404})
  return NextResponse.json({id : 1, name : body.name})
}

export async function DELETE(  
  request: NextRequest, 
  {params} : {params : {id: string}}){
  const id = Number(params.id)
  const userWithId = await prisma.user.findUnique({
    where : {id: id} // can use parseInt(params.id)
  })
     if(!userWithId)
    return NextResponse.json({error: 'User not found'}, {status : 404})
  await prisma.user.delete({
    where: {id: userWithId.id}
  })
  return NextResponse.json({})
  }