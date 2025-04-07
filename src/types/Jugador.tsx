export interface Jugador {
  id?: string;
  nombre: string;
  puntaje: number;
  imagen: string;
  esPortero: boolean; 
}

export interface Convocado {
  id: string;
  nombre: string;
  puntaje: number;
  imagen: string;
  esPortero: boolean;
}