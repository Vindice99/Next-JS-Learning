// src/auth.ts
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "@auth/core/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/prisma/client"
import bcrypt from 'bcrypt'

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        identifier: {
          label: "Email or Username",
          type: "text",
          placeholder: "you@example.com OR yourusername",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(raw) {
        //check if user is valid
        const { identifier, password } = raw as { identifier: string; password: string }
        const isEmail = /\S+@\S+\.\S+/.test(identifier)
        if(!password) return null
        const user = await prisma.user.findFirst({
          where: isEmail ? { email: identifier } : { name: identifier },
        })
        if (!user) return null
        const passwordMatch = await bcrypt.compare(password, user.password!)
        return passwordMatch ? user : null
      },
    }),
    Google,
  ],
})
