
import React from 'react';
import { createClient } from "@/lib/supabase/server";
import { Cog6ToothIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

export default async function EntrenadorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  let coachName = 'Entrenador';
  if (user) {
      const { data: profile } = await supabase.from('profiles').select('club').single();
      if (profile?.club) coachName = profile.club;
  }

  return (
    <div className="min-h-screen bg-dark-bg text-dark-text">
        <header className="bg-dark-card p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-xl font-bold text-white">{coachName}</h1>
                <Link href="/configuracion" className="text-slate-300 hover:text-white">
                    <Cog6ToothIcon className="w-6 h-6" />
                </Link>
            </div>
        </header>
        <main className="container mx-auto p-4">
            {children}
        </main>
    </div>
  );
}