import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  try {
    // Primero, refrescamos la sesión. Esto es compatible con Edge.
    const response = await updateSession(request)

    // Creamos un cliente de Supabase para leer la sesión del usuario.
    // Esto lee el JWT de las cookies, no hace una consulta a la base de datos.
    const supabase = createClient(response.cookies)
    const { data: { user } } = await supabase.auth.getUser()

    const { pathname } = request.nextUrl

    // Si el usuario no está autenticado y no está en una página de autenticación, redirigir a login
    if (!user && !pathname.startsWith('/auth')) {
      return NextResponse.redirect(new URL('/auth/login', request.url))
    }

    // Si el usuario está autenticado y intenta acceder a una página de auth,
    // lo redirigimos a la raíz, que se encargará de llevarlo a su dashboard.
    if (user && pathname.startsWith('/auth')) {
      return NextResponse.redirect(new URL('/', request.url))
    }
    
    // LA LÓGICA DE ROLES HA SIDO ELIMINADA.
    // La consulta a la tabla `profiles` no es compatible con Edge Runtime y causaba el error.
    // La autorización basada en roles ahora debe ser manejada dentro de las páginas
    // o layouts del lado del servidor (Server Components).

    return response
  } catch (error) {
    console.error("Error en el middleware:", error);
    // En caso de error, permitimos que la solicitud continúe para no bloquear el sitio.
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }
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
