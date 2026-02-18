'use client'
import React from 'react';
// FIX: Add BarChart, Bar, Cell for EmotionChart component.
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';

interface Checkin {
    fecha: string;
    estado_emoji: number;
    nivel_estres: number;
    nivel_energia: number;
    ganas_entrenar: number;
}

interface EvolucionChartProps {
    checkins: Checkin[];
}

// FIX: Moved EmotionChart from dashboard page to this client component file to fix 'use client' directive issue.
const valueToColor: { [key: number]: string } = { 1: '#F97316', 2: '#EAB308', 3: '#22C55E', 4: '#3B82F6' };

export const EmotionChart = ({ data }: { data: any[] }) => {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
            <XAxis dataKey="day" stroke="#94A3B8" />
            <YAxis domain={[0, 4]} tick={false} axisLine={false} />
            <Tooltip contentStyle={{ backgroundColor: '#0F172A', border: '1px solid #334155' }} />
            <Bar dataKey="feelingValue">
                {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={valueToColor[entry.feelingValue as keyof typeof valueToColor]} />
                ))}
            </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
}

const EvolucionChart: React.FC<EvolucionChartProps> = ({ checkins }) => {
    const chartData = checkins.map(c => ({
        date: new Date(c.fecha).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' }),
        sentimiento: c.estado_emoji,
        estrés: c.nivel_estres,
        energía: c.nivel_energia,
        motivación: c.ganas_entrenar,
    }));

    if (checkins.length < 2) {
        return (
            <div className="flex items-center justify-center h-full text-slate-400">
                <p>Necesitas al menos dos check-ins para ver tu gráfica de evolución.</p>
            </div>
        );
    }

    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart
                data={chartData}
                margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" stroke="#334155"/>
                <XAxis dataKey="date" stroke="#94A3B8" />
                <YAxis stroke="#94A3B8" domain={[1, 5]} />
                <Tooltip contentStyle={{ backgroundColor: '#0F172A', border: '1px solid #334155' }}/>
                <Legend />
                <Line type="monotone" dataKey="sentimiento" stroke="#3B82F6" strokeWidth={2} />
                <Line type="monotone" dataKey="estrés" stroke="#F97316" strokeWidth={2} />
                <Line type="monotone" dataKey="energía" stroke="#EAB308" strokeWidth={2} />
                <Line type="monotone" dataKey="motivación" stroke="#22C55E" strokeWidth={2} />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default EvolucionChart;
