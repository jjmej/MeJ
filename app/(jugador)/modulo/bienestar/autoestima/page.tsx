
import React from 'react';
import ModulePageLayout from '@/components/common/ModulePageLayout';

export default function AutoestimaPage() {
  return (
    <ModulePageLayout
      backHref="/modulo/bienestar"
      backLabel="Bienestar"
      title="Autoestima"
      emoji="❤️"
    >
      <p>
        Tu valor como persona no depende de tus resultados deportivos. Aquí trabajaremos en reconocer tus cualidades y fortalezas más allá del deporte, construyendo una autoestima sólida.
      </p>
    </ModulePageLayout>
  );
}
