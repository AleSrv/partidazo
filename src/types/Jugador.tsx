export interface Jugador {
  id?: string;  //id opcional para evitar errores de undefined (primary key)
  nombre: string;
  puntaje: number;
  imagen: string;
  esPortero: boolean; 
}

export interface Convocado {
  id: string;
  id_jugador: string; // referencia al jugador original (foreign key)
  nombre: string;
  puntaje: number;
  imagen: string;
  esPortero: boolean;
}
