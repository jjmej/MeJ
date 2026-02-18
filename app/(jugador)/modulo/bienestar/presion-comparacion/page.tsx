
import React from 'react';
import ModulePageLayout from '@/components/common/ModulePageLayout';

export default function PresionComparacionPage() {
  return (
    <ModulePageLayout
      backHref="/modulo/bienestar"
      backLabel="Bienestar"
      title="Presión y Comparación"
      emoji="🤔"
    >
      <p>
        La presión de los demás y la tendencia a compararnos es algo común. Aprende a manejar las expectativas externas y a centrarte en tu propio camino y progreso.
      </p>
    </ModulePageLayout>
  );
}
