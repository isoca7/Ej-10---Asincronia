export interface Personaje{
    id: number,
    nombre: string,
    apodo: string,
    especialidad: string,
    habilidades: string [],
    amigo: string,
    imagen: string
  }

export const input  = document.getElementById("input")