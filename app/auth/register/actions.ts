
'use server'

import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

export async function signup(formData: FormData) {
  const origin = headers().get('origin')
  const supabase = createClient()

  const data = Object.fromEntries(formData.entries());
  
  const email = data.email as string;
  const password = data.password as string;
  const rol = data.rol as 'jugador' | 'entrenador';
  const nombre = data.nombre as string;
  const deporte = data.deporte as string;
  const club = data.club as string;

  // 1. Create the user in the 'auth.users' table
  const { data: { user }, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  })

  if (signUpError || !user) {
    console.error("Sign up error:", signUpError)
    const errorMessage = encodeURIComponent(signUpError?.message || 'No se pudo registrar al usuario.');
    return redirect(`/auth/register?message=${errorMessage}`)
  }

  // 2. Use the admin client to securely insert the profile, bypassing RLS.
  // This is necessary because the user is not logged in yet (due to email confirmation).
  const supabaseAdmin = createAdminClient();

  let profileData: any = {
    id: user.id,
    email: user.email,
    rol,
    nombre,
    deporte,
    club,
    acepta_notas_visibles: false, // Safer default
  };

  if (rol === 'jugador') {
    const edad = parseInt(data.edad as string, 10);
    profileData.edad = edad;
    let age_range: '8-11' | '12-14' | '15-18' = '15-18';
    if (edad >= 8 && edad <= 11) age_range = '8-11';
    if (edad >= 12 && edad <= 14) age_range = '12-14';
    profileData.age_range = age_range;

    const codigo_entrenador = data.codigo_entrenador as string;
    if (codigo_entrenador) {
        const { data: coachProfile } = await supabaseAdmin
            .from('profiles')
            .select('id')
            .eq('codigo_entrenador', codigo_entrenador.trim())
            .eq('rol', 'entrenador')
            .single();
        
        if (coachProfile) {
            profileData.entrenador_id = coachProfile.id;
        } else {
             console.warn(`Coach code "${codigo_entrenador}" was provided but not found. User can link later.`);
        }
    }

  } else { // entrenador
    const coachCode = data.codigo_entrenador as string;
    if (!coachCode || coachCode.trim() === '') {
        const errorMessage = encodeURIComponent('Como entrenador, debes crear un código de equipo único.');
        // Cleanup the created auth user to allow retrying with the same email
        await supabaseAdmin.auth.admin.deleteUser(user.id);
        return redirect(`/auth/register?message=${errorMessage}`);
    }
    profileData.codigo_entrenador = coachCode.trim();
  }
  
  const { error: profileError } = await supabaseAdmin
    .from('profiles')
    .insert(profileData);

  if (profileError) {
    console.error("Profile creation error:", profileError)
    // IMPORTANT: If profile creation fails, delete the auth user to prevent orphaned accounts.
    await supabaseAdmin.auth.admin.deleteUser(user.id);
    const errorMessage = encodeURIComponent(`Error crítico al crear el perfil. Por favor, inténtalo de nuevo.`);
    return redirect(`/auth/register?message=${errorMessage}`)
  }

  // Redirect to the login page with a success message about email confirmation.
  const successMessage = encodeURIComponent('¡Registro completado! Revisa tu email para confirmar tu cuenta antes de iniciar sesión.');
  return redirect(`/auth/login?message=${successMessage}&type=success`)
}
