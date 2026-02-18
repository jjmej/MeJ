import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient, type CookieOptions } from '@supabase/ssr'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  try {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value
          },
          set(name: string, value: string, options: CookieOptions) {
            response.cookies.set({ name, value, ...options })
          },
          remove(name: string, options: CookieOptions) {
            response.cookies.set({ name, value: '', ...options })
          },
        },
      }
    )

    // Refresca la sesión del usuario si ha expirado
    const { data: { user } } = await supabase.auth.getUser()

    const { pathname } = request.nextUrl

    // Si el usuario no está logueado y no está en una página de autenticación, lo redirige al login
    if (!user && !pathname.startsWith('/auth')) {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }

    // Si el usuario está logueado e intenta acceder a las páginas de autenticación, lo redirige a la página principal
    if (user && pathname.startsWith('/auth')) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  } catch (e) {
    console.error("Error en el middleware:", e);
    // Si hay un error (ej. variables de entorno faltantes), se permite que la petición continúe para no bloquear el sitio.
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
