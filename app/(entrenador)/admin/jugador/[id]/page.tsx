
import { createClient } from '@/lib/supabase/server';
import EvolucionChart from '@/components/jugador/EvolucionChart';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

export default async function PlayerDetailPage({ params }: { params: { id: string } }) {
    const supabase = createClient();

    // 1. Verificar que quien consulta es un entrenador
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return <div>No autorizado</div>;
    const { data: coachProfile } = await supabase.from('profiles').select('rol').single();
    if (coachProfile?.rol !== 'entrenador') return <div>Acceso denegado.</div>;
    
    // 2. Obtener datos del jugador
    const { data: player } = await supabase
        .from('profiles')
        .select('id, nombre, acepta_notas_visibles')
        .eq('id', params.id)
        .eq('entrenador_id', user.id) // Asegurarse que el jugador pertenece a este entrenador
        .single();

    if (!player) return <div>Jugador no encontrado o no pertenece a tu equipo.</div>;

    // 3. Obtener checkins del jugador
    const { data: checkins } = await supabase
        .from('checkins')
        .select('*')
        .eq('user_id', player.id)
        .order('fecha', { ascending: true });
    
    const lastCheckin = checkins && checkins.length > 0 ? checkins[checkins.length - 1] : null;

    return (
        <div className="space-y-6">
            <Link href="/admin/dashboard" className="flex items-center gap-2 text-brand-blue font-semibold mb-4">
                <ArrowLeftIcon className="w-5 h-5" />
                Volver al Panel
            </Link>
            <h1 className="text-3xl font-bold text-white">Detalles de: {player.nombre}</h1>
            
            <div className="bg-dark-card p-4 rounded-lg">
                <h2 className="text-xl font-bold text-white mb-2">Última Nota</h2>
                <p className="italic text-slate-300 bg-slate-800 p-3 rounded text-sm">
                    {player.acepta_notas_visibles 
                        ? (lastCheckin?.nota_libre || 'El jugador no dejó ninguna nota.') 
                        : '🔒 Las notas de este jugador son privadas.'
                    }
                </p>
            </div>

            <div className="bg-dark-card p-4 rounded-xl h-96">
                <h2 className="text-xl font-bold text-white mb-4">Evolución de Bienestar</h2>
                <EvolucionChart checkins={checkins || []} />
            </div>
        </div>
    );
}
