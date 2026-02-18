
import React from 'react';
import ModulePageLayout from '@/components/common/ModulePageLayout';

export default function ProblemaDetailPage() {
  return (
    <ModulePageLayout
      backHref="/modulo/problemas"
      backLabel="Problemas"
      title="Detalle del Problema"
      emoji="🛠️"
    >
      <p>
        Este es un espacio para explorar en profundidad un problema específico. Aquí encontrarás información, consejos y ejercicios prácticos para ayudarte a manejar la situación.
      </p>
      <p className='italic text-slate-400'>
        (Este es un contenido de ejemplo. En la versión final, cada problema tendría su propio texto y herramientas).
      </p>
    </ModulePageLayout>
  );
}
