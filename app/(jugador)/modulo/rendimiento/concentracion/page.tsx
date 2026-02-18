
import React from 'react';
import ModulePageLayout from '@/components/common/ModulePageLayout';

export default function ConcentracionPage() {
  return (
    <ModulePageLayout
      backHref="/modulo/rendimiento"
      backLabel="Rendimiento"
      title="Concentración"
      emoji="🎯"
    >
      <p>
        La concentración es clave para cualquier deportista. Aquí aprenderás técnicas para mantener el foco durante los entrenamientos y las competiciones, ignorando las distracciones.
      </p>
      <button className="w-full bg-brand-blue hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg text-lg transition-colors">
        Iniciar Ejercicio de Foco
      </button>
    </ModulePageLayout>
  );
}
