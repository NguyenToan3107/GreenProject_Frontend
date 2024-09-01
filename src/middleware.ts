import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
    const url = req.nextUrl.clone();
    const token = req.cookies.get('token');
    const loginStatusCookie = req.cookies.get('isLoggedIn');
    const roleCookie = req.cookies.get('role');

    console.log(loginStatusCookie)
    console.log(roleCookie)
    if (loginStatusCookie?.value === 'true') {
        if (url.pathname.startsWith('/admin') && roleCookie?.value === 'ADMIN') {
            return NextResponse.next();
        } else if (url.pathname.startsWith('/home') && roleCookie?.value === 'USER') {
            return NextResponse.next();
        } else {
            return NextResponse.redirect(new URL('/auth', req.url));
        }
    } else {
        return NextResponse.redirect(new URL('/auth', req.url));
    }


}
export const config = {
    matcher: ['/admin/:path*', '/home/:path*'], // Áp dụng cho tất cả các route bắt đầu bằng /admin hoặc /home
};


