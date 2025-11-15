// IMPORTS
import {
  obtenerArray,
  obtenerCodigo,
  guardarArray,
} from "./bd.js";

import  {obtenerInsumos,CLAVE_INSUMOS}  from "./insumos_db.js"


// PRÉSTAMOS
const CLAVE_PRESTAMOS = "prestamos";


export function obtenerPrestamos() {
  let prestamos = obtenerArray(CLAVE_PRESTAMOS);
  if (prestamos.length === 0) {
    guardarArray([], CLAVE_PRESTAMOS);
    prestamos = [];
  }
  return prestamos;
}

export function guardarPrestamo(prestamo) {
  const prestamos = obtenerPrestamos();
  
  // 1. Asigna el ID de la TRANSACCIÓN (el ID ÚNICO interno)
  prestamo.idTransaccion = obtenerCodigo(); // <-- Usa el código ALEATORIO para ID INTERNO
  
  // 2. El campo prestamo.codigoInsumo YA CONTIENE el código del insumo físico

  prestamo.estado = prestamo.estado || "activo";
  prestamos.push(prestamo);
  guardarArray(prestamos, CLAVE_PRESTAMOS);
  return prestamo;
}

/** Actualiza el estado de un préstamo (activo|moroso|devuelto) */
export function actualizarEstadoPrestamo(idTransaccion, nuevoEstado) {
  const prestamos = obtenerPrestamos();
  // Busca por el ID de la transacción
  const index = prestamos.findIndex(p => p.idTransaccion == idTransaccion); 
  if (index !== -1) {
    prestamos[index].estado = nuevoEstado;
    guardarArray(prestamos, CLAVE_PRESTAMOS);
    return true;
  }
  return false;
}

/** Marca como devuelto y libera el insumo correspondiente */
export function marcarComoDevuelto(idTransaccion) {
  const prestamos = obtenerPrestamos();
  const insumos = obtenerInsumos();
  // Busca por el ID de la transacción
  const prestamo = prestamos.find(p => p.idTransaccion == idTransaccion); 
  if (!prestamo) return false;
  
  prestamo.estado = "devuelto";
  
  // Usa el código del insumo guardado en el préstamo para liberarlo.
  const insumo = insumos.find(i => i.codigo == prestamo.codigoInsumo); 
  
  if (insumo) insumo.estado = "Disponible";
  guardarArray(prestamos, CLAVE_PRESTAMOS);
  guardarArray(insumos, CLAVE_INSUMOS);
  return true;
}

/** Devuelve objetos por estado */
export function obtenerPrestamosPorEstado() {
  const prestamos = obtenerPrestamos();
  return {
    activos: prestamos.filter(p => p.estado === "activo"),
    morosos: prestamos.filter(p => p.estado === "moroso"),
    devueltos: prestamos.filter(p => p.estado === "devuelto"),
  };
}

/*Marca insumos como Prestado  */
export function actualizarInsumosPrestados(insumosPrestados) {
  let insumos = obtenerInsumos();

  // Recorremos cada insumo prestado
  for (let i = 0; i < insumosPrestados.length; i++) {
    let codigoPrestado = insumosPrestados[i].codigo;

    // Buscamos el insumo con ese código
    for (let j = 0; j < insumos.length; j++) {
      if (insumos[j].codigo == codigoPrestado) {
        insumos[j].estado = "Prestado";
      }
    }
  }
  guardarArray(insumos, CLAVE_INSUMOS);
}
