// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(req: NextRequest) {
    const accessToken = req.cookies.get('accessToken')?.value;
    const refreshToken = req.cookies.get('refreshToken')?.value;
    if(accessToken && refreshToken){

    } else {
        return NextResponse.rewrite(new URL('/login', req.url))
    }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/coverLetterWriter', '/emailWriter', '/interviewQuestions', '/productDescription'],
}