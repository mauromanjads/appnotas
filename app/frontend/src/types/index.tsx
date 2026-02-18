export interface Marca {
  id: number;
  nombre: string;
}

export interface Nota {
  id: number;
  titulo: string;
  cuerpo: string;
  marca_id: number;
}
