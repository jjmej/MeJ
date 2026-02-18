'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function login(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const supabase = createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    console.error('Login error:', error.message)
    // Redirige con el mensaje de error específico para que el usuario sepa qué pasó.
    const errorMessage = encodeURIComponent(error.message);
    return redirect(`/auth/login?message=${errorMessage}`)
  }

  return redirect('/')
}
