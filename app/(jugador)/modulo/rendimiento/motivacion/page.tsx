
import React from 'react';
import ModulePageLayout from '@/components/common/ModulePageLayout';

export default function MotivacionPage() {
  return (
    <ModulePageLayout
      backHref="/modulo/rendimiento"
      backLabel="Rendimiento"
      title="Motivación"
      emoji="🔥"
    >
      <p>
        Habrá días en que la motivación flaquee. Es importante entender qué te impulsa y tener claras tus metas. Aquí encontrarás estrategias para mantener la llama encendida, incluso en los momentos difíciles.
      </p>
       <button className="w-full bg-brand-blue hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg text-lg transition-colors">
        Definir Mis Metas
      </button>
    </ModulePageLayout>
  );
}
