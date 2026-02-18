
// Esta página sirve como fallback si un usuario está logueado pero su perfil no tiene rol.
// Esto podría ocurrir si el proceso de registro se interrumpe.
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import ConfiguracionForm from "@/components/jugador/ConfiguracionForm";

export default async function OnboardingPage() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/auth/login');
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .single();
    
    // Si el perfil ya tiene un rol, el middleware o la página principal ya lo habrían redirigido.
    // Si llega aquí, es porque necesita completar sus datos.
    if (!profile) {
        // En un caso extremo, el perfil no existe. Forzamos el cierre de sesión para que se registre de nuevo.
        await supabase.auth.signOut();
        redirect('/auth/register?message=Error en el perfil, por favor regístrate de nuevo.');
    }

    return (
        <div className="min-h-screen bg-dark-bg flex items-center justify-center p-4">
            <div className="max-w-md w-full space-y-6">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-white">¡Casi hemos terminado!</h1>
                    <p className="text-slate-300 mt-2">Por favor, completa tus datos para finalizar la configuración de tu cuenta.</p>
                </div>
                <ConfiguracionForm profile={profile} />
            </div>
        </div>
    );
}
