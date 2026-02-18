
import React from 'react';
import Link from 'next/link';
import { ArrowLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

const modules = [
  { title: 'Presión y Comparación', href: '/modulo/bienestar/presion-comparacion' },
  { title: 'Autoestima', href: '/modulo/bienestar/autoestima' },
  { title: 'Manejo de Lesiones', href: '/modulo/bienestar/lesiones' },
  { title: 'Control del Dolor', href: '/modulo/bienestar/control-dolor' },
  { title: 'Afrontar Citas Médicas', href: '/modulo/bienestar/citas-medicas' },
];

export default function SaludBienestarMenu() {
  return (
    <div className="space-y-6">
      <Link href="/dashboard" className="flex items-center gap-2 text-brand-blue font-semibold mb-4">
          <ArrowLeftIcon className="w-5 h-5" />
          Volver al Inicio
      </Link>
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white">Salud y Bienestar 🟢</h1>
        <p className="text-slate-300 mt-2">Cuidarte como persona es fundamental para rendir como deportista.</p>
      </div>
      <div className="space-y-3">
        {modules.map(module => (
          <Link key={module.href} href={module.href} className="bg-dark-card p-4 rounded-lg flex justify-between items-center hover:bg-slate-700 transition-colors">
            <span className="font-semibold text-white">{module.title}</span>
            <ChevronRightIcon className="w-5 h-5 text-slate-400" />
          </Link>
        ))}
      </div>
    </div>
  );
}
