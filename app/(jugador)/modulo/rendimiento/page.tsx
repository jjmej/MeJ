
import React from 'react';
import Link from 'next/link';
import { ArrowLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

const modules = [
  { title: 'Concentración', href: '/modulo/rendimiento/concentracion' },
  { title: 'Gestión de Nervios', href: '/modulo/rendimiento/gestion-nervios' },
  { title: 'Confianza', href: '/modulo/rendimiento/confianza' },
  { title: 'Motivación', href: '/modulo/rendimiento/motivacion' },
  { title: 'Preparación de Partidos', href: '/modulo/rendimiento/preparacion-partidos' },
];

export default function RendimientoMentalMenu() {
  return (
    <div className="space-y-6">
      <Link href="/dashboard" className="flex items-center gap-2 text-brand-blue font-semibold mb-4">
          <ArrowLeftIcon className="w-5 h-5" />
          Volver al Inicio
      </Link>
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white">Rendimiento Mental 🔵</h1>
        <p className="text-slate-300 mt-2">Herramientas para fortalecer tu mente en el campo.</p>
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
