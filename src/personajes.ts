import { Personaje, input } from './personajes.model'
import { obtenerPersonajes } from './personajes.api'

const crearElementoImagen = (portada: string): HTMLImageElement => {
  const imagen = document.createElement('img')
  imagen.src = `http://localhost:3000/${portada}`
  return imagen
}

const crearElementoParrafo = (
  etiqueta: string,
  texto: string
): HTMLParagraphElement => {
  const parrafo = document.createElement('p')

  parrafo.textContent = `${etiqueta}: ${texto}`
  return parrafo
}

const crearContenedorPersonaje = (personaje: Personaje): HTMLDivElement => {
  const elementoPersonaje = document.createElement('div')
  elementoPersonaje.classList.add('personaje-contenedor')
  const imagen = crearElementoImagen(personaje.imagen)
  elementoPersonaje.appendChild(imagen)
  const nombre = crearElementoParrafo('Nombre', personaje.nombre)
  elementoPersonaje.appendChild(nombre)
  const apodo = crearElementoParrafo('Apodo', personaje.apodo)
  elementoPersonaje.appendChild(apodo)
  const especialidad = crearElementoParrafo(
    'Especialidad',
    personaje.especialidad
  )
  elementoPersonaje.appendChild(especialidad)
  const habilidades = crearElementoParrafo(
    'Habilidades',
    personaje.habilidades.join(', ')
  )
  elementoPersonaje.appendChild(habilidades)
  const amigo = crearElementoParrafo('Amigo', personaje.amigo)
  elementoPersonaje.appendChild(amigo)

  return elementoPersonaje
}

const pintarPersonajes = async (): Promise<void> => {
  const personajes = await obtenerPersonajes()
  const listado = document.querySelector('#listado-personajes')
  if (listado && listado instanceof HTMLDivElement) {
    personajes.forEach((personaje) => {
      const contenedorPersonaje = crearContenedorPersonaje(personaje)
      listado.appendChild(contenedorPersonaje)
    })
  } else {
    throw new Error('No se ha encontrado el contenedor del listado')
  }
}
const handleBusqueda = async () => {
  if (input && input instanceof HTMLInputElement) {
    const inputValue = input.value.toLowerCase()
    const personajes = await obtenerPersonajes()
    const listado = document.querySelector('#listado-personajes')
    const personajesFiltrados = personajes.filter((personaje) =>
      personaje.nombre.toLowerCase().startsWith(inputValue)
    )
    if (listado && listado instanceof HTMLDivElement) {
      listado.innerHTML = ''
      personajesFiltrados.forEach((personaje) => {
        const contenedorPersonaje = crearContenedorPersonaje(personaje)
        listado.appendChild(contenedorPersonaje)
      })
    }
  }
}

document.addEventListener('DOMContentLoaded', pintarPersonajes)
if(input && input instanceof HTMLInputElement){
  input.addEventListener('input', handleBusqueda)
}

