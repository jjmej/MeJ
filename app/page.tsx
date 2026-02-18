
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const supabase = createClient();

  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect('/auth/login');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('rol')
    .single();
  
  if (profile?.rol === 'jugador') {
    redirect('/dashboard');
  } else if (profile?.rol === 'entrenador') {
    redirect('/admin/dashboard');
  } else {
    // Si el perfil no se ha creado o no tiene rol, va a la página de onboarding/configuración.
    // Esto es un fallback por si el registro falla a mitad.
    redirect('/onboarding');
  }

  return null; // Esta página nunca renderiza UI
}