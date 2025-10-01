// app/api/send/route.ts
import { NextResponse } from "next/server"
import { Resend } from "resend"
import React from "react" // needed if you pass a JSX element
import WelcomeTemplate from "@/emails/WelcomeTemplate"

export const runtime = "nodejs" // be explicit (Resend needs Node runtime)

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST() {
  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>", 
      to: "dokimlong30102@gmail.com",
      subject: "Welcome!",
      // call the component function (no React import needed):
    react: WelcomeTemplate({ name: "Long" }),
    })

    if (error) {
      return NextResponse.json({ error }, { status: 500 })
    }
    return NextResponse.json({ id: data?.id })
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}
