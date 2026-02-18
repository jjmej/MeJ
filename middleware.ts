
import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  // Primero, refrescamos la sesión
  const response = await updateSession(request)

  // Para leer la sesión actualizada, necesitamos una nueva instancia de cliente
  // que use las cookies actualizadas de la 'response'
  const supabase = createClient(response.cookies)
  const { data: { user } } = await supabase.auth.getUser()

  const { pathname } = request.nextUrl

  // Si el usuario no está autenticado y no está en una página de autenticación, redirigir a login
  if (!user && !pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  // Si el usuario está autenticado
  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('rol')
      .single()

    // Si está en una página de autenticación, redirigir a la página principal
    if (pathname.startsWith('/auth')) {
       return NextResponse.redirect(new URL('/', request.url))
    }
    
    // Proteger rutas de admin
    if (pathname.startsWith('/admin') && profile?.rol !== 'entrenador') {
      return NextResponse.redirect(new URL('/dashboard', request.url)) // Un jugador intenta acceder a /admin
    }

    // Proteger rutas de jugador (cualquier cosa que no sea /admin)
    if (!pathname.startsWith('/admin') && profile?.rol === 'entrenador' && pathname !== '/') {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url)) // Un entrenador intenta acceder a una página de jugador
    }
  }

  return response
}

// Necesitamos importar el createServerClient de una manera que acepte cookies
// Así que creamos una función helper aquí mismo.
import { createServerClient, type CookieOptions } from '@supabase/ssr'
function createClient(cookies: NextRequest['cookies'] | NextResponse['cookies']) {
    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return cookies.get(name)?.value
                },
            },
        }
    )
}


export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}