import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // 1. Lấy token từ cookie
    const token = request.cookies.get('auth_token')?.value;

    // 2. Logic bảo vệ: Nếu chưa đăng nhập mà vào /dashboard
    if (!token && pathname.startsWith('/dashboard')) {
        const loginUrl = new URL('/login', request.url);
        // Lưu lại trang định vào để sau khi login xong có thể quay lại đúng chỗ đó
        loginUrl.searchParams.set('from', pathname);
        return NextResponse.redirect(loginUrl);
    }

    // 3. Logic chặn: Nếu đã đăng nhập mà cố vào /login
    if (token && pathname === '/login') {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return NextResponse.next();
}

// Giữ nguyên matcher để middleware chỉ chạy ở những route cần thiết
export const config = {
    matcher: ['/dashboard/:path*', '/login'],
};