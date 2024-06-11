import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    // Logique du middleware
    // Vérifie la présence du cookie de session
    const sessionCookie = request.cookies.get('appwriteSession')

    if (!sessionCookie) {
        // Si pas de session, redirige vers le login
        return NextResponse.redirect(new URL('/sign-in', request.url))
    }


    // Si session valide, passe la requête à la route
    return NextResponse.next()
}