import { NextRequest, NextResponse } from "next/server";
// import schema from "../api/users/schema";
import { prisma } from "@/prisma/client";
import z from "zod";
import bcrypt from 'bcrypt'
   const schema = z.object({
        email: z.email(),
        password: z.string().min(8)
    })

// Need NextRequest to prevent caching
// export async function GET(request: NextRequest){
//     const users = await prisma.user.findMany()
//     return NextResponse.json(users)
// }

export  async function POST(request: NextRequest){
    const body = await request.json()
    //Validate the data
    const validation = schema.safeParse(body)
    if(!validation.success)
    {
        return NextResponse.json(validation.error,{status : 400})
    }
    const user = await prisma.user.findUnique({where : {email : body.email}})
     
    if(user){
     return NextResponse.json({error : "User already exist"},{status: 400})
    }
    else{
    const hashedPassword = await bcrypt.hash(body.password, 10)
    const newUser = await prisma.user.create({
        data: {
            name: body.name,
            email: body.email,
            password: hashedPassword
        }
    })
    return NextResponse.json({email: newUser.email, password: newUser.password})
    }
}