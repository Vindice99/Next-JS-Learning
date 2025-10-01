// middleware.ts (root of your project)
export { default } from "next-auth"

export const config = {
    // *: zero or more
    // +: one or more
    // ?: zero or one
    matcher: ['/dashboard/:path*']
}