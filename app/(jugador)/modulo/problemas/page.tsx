
import React from 'react';
import Link from 'next/link';
import { ArrowLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

const problemas = [
  { title: 'Problemas con el entrenador', href: '/modulo/problemas/problema-detail' },
  { title: 'Conflictos con compañeros', href: '/modulo/problemas/problema-detail' },
  { title: 'Dificultades en los estudios', href: '/modulo/problemas/problema-detail' },
  { title: 'Presión familiar', href: '/modulo/problemas/problema-detail' },
];

export default function GestionProblemasMenu() {
  return (
    <div className="space-y-6">
      <Link href="/dashboard" className="flex items-center gap-2 text-brand-blue font-semibold mb-4">
          <ArrowLeftIcon className="w-5 h-5" />
          Volver al Inicio
      </Link>
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white">Gestión de Problemas 🟠</h1>
        <p className="text-slate-300 mt-2">A veces surgen dificultades. Aquí tienes recursos para afrontarlas.</p>
      </div>
      <div className="space-y-3">
        {problemas.map(item => (
          // NOTA: Todos los enlaces llevan a la misma página de detalle genérica por ahora.
          <Link key={item.href} href={item.href} className="bg-dark-card p-4 rounded-lg flex justify-between items-center hover:bg-slate-700 transition-colors">
            <span className="font-semibold text-white">{item.title}</span>
            <ChevronRightIcon className="w-5 h-5 text-slate-400" />
          </Link>
        ))}
      </div>
    </div>
  );
}
