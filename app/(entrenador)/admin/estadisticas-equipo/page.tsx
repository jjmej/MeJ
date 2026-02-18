
import React from 'react';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';

export default function EstadisticasEquipoPage() {
  return (
    <div className="space-y-6">
        <Link href="/admin/dashboard" className="flex items-center gap-2 text-brand-blue font-semibold">
            <ArrowLeftIcon className="w-5 h-5" />
            Volver al Panel
        </Link>
        <h1 className="text-3xl font-bold text-white">Estadísticas del Equipo</h1>
        <div className="bg-dark-card p-6 rounded-lg text-center text-slate-400">
            <p>
                Próximamente: Gráficos con la evolución del bienestar general del equipo, niveles de estrés promedio y otros indicadores clave (siempre de forma anónima y agregada).
            </p>
        </div>
    </div>
  );
}
