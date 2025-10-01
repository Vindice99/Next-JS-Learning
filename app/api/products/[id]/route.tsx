import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";
import { safeParse } from "zod";
import { prisma } from "@/prisma/client";

// Need NextRequest to prevent caching
export async function GET(request: NextRequest, {params} : {params : {id: string}}){
  const id = Number(params.id)
  const userWithId = prisma.user.findUnique({
    where : {id: id}
  })
  if (id > 10) {
    return NextResponse.json({error : 'User not found'}, {status : 404})
  }
  else{
    return NextResponse.json(userWithId)
  }
}
