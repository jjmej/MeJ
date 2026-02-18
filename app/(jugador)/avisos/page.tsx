
import React from 'react';
import { BellIcon } from '@heroicons/react/24/solid';

export default function AvisosPage() {
    // Esta es una página estática de ejemplo.
    const avisos = [
        { id: 1, text: "Recuerda completar tu check-in de hoy.", date: "hace 2 horas" },
        { id: 2, text: "Nuevo audio disponible en la biblioteca: 'Visualización Post-Partido'.", date: "ayer" },
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-white">Avisos</h1>
            {avisos.length > 0 ? (
                <div className="space-y-4">
                    {avisos.map(aviso => (
                        <div key={aviso.id} className="bg-dark-card p-4 rounded-lg flex items-start gap-4">
                            <BellIcon className="w-6 h-6 text-brand-yellow mt-1 flex-shrink-0" />
                            <div>
                                <p className="text-white">{aviso.text}</p>
                                <p className="text-xs text-slate-400">{aviso.date}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center text-slate-400 py-10">
                    <p>No tienes avisos nuevos.</p>
                </div>
            )}
        </div>
    );
}
