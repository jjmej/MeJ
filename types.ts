
export interface Checkin {
  id: string;
  fecha: string; // YYYY-MM-DD
  estado_emoji: 1 | 2 | 3 | 4;
  nivel_estres: number; // 1-5
  nivel_energia: number; // 1-5
  ganas_entrenar: number; // 1-5
  nota_libre?: string;
  user_id: string;
}

export interface Profile {
  id: string;
  email: string;
  nombre: string;
  rol: 'jugador' | 'entrenador';
  deporte: string;
  club: string;
  edad?: number;
  age_range?: '8-11' | '12-14' | '15-18';
  entrenador_id?: string;
  codigo_entrenador?: string;
  acepta_notas_visibles: boolean;
}
