
import React from 'react';
import ModulePageLayout from '@/components/common/ModulePageLayout';

export default function LesionesPage() {
  return (
    <ModulePageLayout
      backHref="/modulo/bienestar"
      backLabel="Bienestar"
      title="Manejo de Lesiones"
      emoji="🤕"
    >
      <p>
        Una lesión es un desafío físico y mental. Aprende a gestionar la frustración, el miedo y la impaciencia durante la recuperación, y a mantener una mentalidad positiva para volver más fuerte.
      </p>
    </ModulePageLayout>
  );
}
