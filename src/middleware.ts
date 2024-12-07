import { NextRequest, NextResponse } from "next/server";



export default function middleware(request: NextRequest) {
    const authToken = request.cookies.get("next-auth.session-token")
    const currentUrl = request.nextUrl.pathname






    if (!authToken) {
        return NextResponse.rewrite(new URL("/login", request.url))
    }

    return NextResponse.next()
}
export const config = {
    matcher: ['/']
}
