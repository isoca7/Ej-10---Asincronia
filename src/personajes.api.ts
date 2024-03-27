import axios from 'axios'
import { Personaje } from './personajes.model'

export const obtenerPersonajes = async (): Promise<Personaje[]> => {
  try {
    const { data } = await axios.get('http://localhost:3000/personajes')
    return data
    
  } catch (error) {
    throw new Error('Error al obtener los personajes')
  }
}

const obtenerIdPersonaje = async (input:string) : Promise<number> => {
  try {
    const { data } = await axios.get('http://localhost:3000/personajes')
    const id = data.findIndex((personaje : Personaje)=> personaje.nombre.toLowerCase().startsWith(input))+1
    return id
    
  } catch (error) {
    throw new Error('Error al obtener los personajes')
  }
}

export const obtenerPersonajesFiltrados = async (input: string): Promise<Personaje> => {
  const id = await obtenerIdPersonaje(input)
  try {
    const { data } = await axios.get(`http://localhost:3000/personajes/${id}`)
    console.log(`http://localhost:3000/personajes/${id}`)
    return data
  } catch (error) {
    throw new Error('Error al obtener los personajes')
  }
}
