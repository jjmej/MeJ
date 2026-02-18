
import React from 'react';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';

export default function FeedbackResumenPage() {
  return (
    <div className="space-y-6">
        <Link href="/admin/dashboard" className="flex items-center gap-2 text-brand-blue font-semibold">
            <ArrowLeftIcon className="w-5 h-5" />
            Volver al Panel
        </Link>
        <h1 className="text-3xl font-bold text-white">Resumen de Feedback</h1>
        <div className="bg-dark-card p-6 rounded-lg text-center text-slate-400">
            <p>
                Próximamente: Un lugar para que los jugadores dejen feedback anónimo y puedas mejorar como entrenador.
            </p>
        </div>
    </div>
  );
}
