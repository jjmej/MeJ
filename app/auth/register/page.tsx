import { signup } from './actions'
import RegisterForm from '@/components/auth/RegisterForm'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import React from 'react'

const Messages = ({ message }: { message: string | null }) => {
  if (!message) return null;
  return (
    <div className="p-4 mb-4 bg-red-900/50 border border-red-500 text-red-300 rounded-lg text-center">
      <p>{decodeURIComponent(message)}</p>
    </div>
  )
}

export default async function RegisterPage({ searchParams }: { searchParams: { message: string | null } }) {
    const supabase = createClient()
    const { data: { session } } = await supabase.auth.getSession()

    if (session) {
        redirect('/')
    }

    return (
        <div className="min-h-screen bg-dark-bg flex flex-col items-center justify-center p-4 text-center">
            <div className="max-w-md w-full">
                <div className="mb-8">
                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Crea tu Cuenta</h1>
                  <p className="text-lg text-slate-300">Únete a Mente en Juego</p>
                </div>
                {searchParams.message && <Messages message={searchParams.message} />}
                <RegisterForm action={signup} />
                 <p className="mt-4">
                    ¿Ya tienes cuenta? <a href="/auth/login" className="text-brand-blue underline">Inicia Sesión</a>
                </p>
            </div>
        </div>
    )
}
