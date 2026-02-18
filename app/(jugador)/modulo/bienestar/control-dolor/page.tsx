
import React from 'react';
import ModulePageLayout from '@/components/common/ModulePageLayout';

export default function ControlDolorPage() {
  return (
    <ModulePageLayout
      backHref="/modulo/bienestar"
      backLabel="Bienestar"
      title="Control del Dolor"
      emoji="🧘‍♀️"
    >
      <p>
        El dolor forma parte del deporte, pero aprender a manejarlo es una habilidad. Descubre técnicas de mindfulness y visualización para cambiar tu relación con el dolor y mejorar tu recuperación.
      </p>
    </ModulePageLayout>
  );
}
