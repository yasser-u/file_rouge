import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const isAuthenticated = request.cookies.has('appwriteSession');
    const isAuthPage =
        request.nextUrl.pathname === '/sign-in' ||
        request.nextUrl.pathname === '/sign-up';

    if (isAuthenticated && isAuthPage) {
        return NextResponse.redirect(new URL('/accueil', request.url));
    }

    if (!isAuthenticated && !isAuthPage) {
        return NextResponse.redirect(new URL('/sign-in', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Correspond à toutes les requêtes sauf celles commençant par :
         * - _next
         * - static (les fichiers statiques)
         * - favicon.ico
         * - images
         * - (authentification)
         * - (preConnection)
         */
        '/((?!_next|static|favicon.ico|images|\\(authentification\\)|\\(preConnection\\)|\\/).*)',
    ],
};