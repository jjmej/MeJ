
import React from 'react';
import ModulePageLayout from '@/components/common/ModulePageLayout';

export default function CitasMedicasPage() {
  return (
    <ModulePageLayout
      backHref="/modulo/bienestar"
      backLabel="Bienestar"
      title="Afrontar Citas Médicas"
      emoji="🩺"
    >
      <p>
        Ir al médico o al fisio puede generar ansiedad. Aquí te damos herramientas para prepararte para tus citas, hacer las preguntas correctas y sentirte más en control de tu salud.
      </p>
    </ModulePageLayout>
  );
}
