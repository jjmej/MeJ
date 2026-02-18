
'use client';
import React from 'react';

interface SafetyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SafetyModal: React.FC<SafetyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-dark-card rounded-lg p-6 max-w-sm w-full text-center border-2 border-red-500">
        <h2 className="text-2xl font-bold text-white mb-4">Hablar Ayuda</h2>
        <p className="text-slate-300 mb-6">
          Si estás pasando por un momento difícil, no estás solo/a. Hablar con alguien de confianza es el primer paso.
        </p>
        <div className="space-y-4">
            <p className="font-bold text-lg text-brand-yellow">Línea de ayuda (Ejemplo): 123-456-789</p>
            <p className="text-sm text-slate-400">Considera hablar con tus padres, tu entrenador/a, o un profesional de la salud mental.</p>
        </div>
        <button
          onClick={onClose}
          className="mt-6 w-full bg-slate-600 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-lg"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default SafetyModal;
