import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";
import { prisma } from "@/prisma/client";


// Need NextRequest to prevent caching
export async function GET(request: NextRequest){
    const users = await prisma.user.findMany()
    return NextResponse.json(users)
}

export  async function POST(request: NextRequest){
    const body = await request.json()
    //Validate the data
    const validation = schema.safeParse(body)
    if(!validation.success)
    {
        return NextResponse.json(validation.error,{status : 400})
    }
    prisma.user.create({
        data: {
            name: body.name,
            email: body.email,
        }
    })
    return NextResponse.json(validation.data)
    
}