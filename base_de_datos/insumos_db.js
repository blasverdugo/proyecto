// IMPORTS
import {
  obtenerArray,
  guardarArray,
  obtenerSiguienteCodigo
} from "./bd.js"; 

// INSUMOS
export const CLAVE_INSUMOS = "insumos";

export function obtenerInsumos() {
  let insumos = obtenerArray(CLAVE_INSUMOS);
  if (insumos.length === 0) {
    insumos = [
      { codigo: 1, nombre: "Zapatilla", estado: "Disponible", observacion: "" },
      { codigo: 2, nombre: "Zapatilla", estado: "Disponible", observacion: "" },
      { codigo: 3, nombre: "Borrador", estado: "Fuera de Servicio", observacion: "Daño por calor" },
      { codigo: 4, nombre: "Casco", estado: "Disponible", observacion: "" },
    ];
    guardarArray(insumos, CLAVE_INSUMOS);
  }
  return insumos;
}

export function guardarInsumo(nuevoInsumo) {
  const insumos = obtenerInsumos();
  nuevoInsumo.codigo = obtenerSiguienteCodigo(CLAVE_INSUMOS); // <-- Usa el INCREMENTAL
  insumos.push(nuevoInsumo);
  guardarArray(insumos, CLAVE_INSUMOS);
  return nuevoInsumo;
}

export function actualizarInsumo(insumoActualizado) {
  let insumos = obtenerInsumos();
  let index = -1;
  let i = 0;
  // Buscar el índice del insumo por su código
  while (index === -1 && i < insumos.length) {
    if (insumos[i].codigo == insumoActualizado.codigo) {
      index = i;
    }
    i++;
  }

  // Si se encontró el insumo, actualizar sus datos
  if (index !== -1) {
    let insumo = insumos[index];

    // Actualizar campo por campo (sin for...in)
    if (insumoActualizado.nombre !== undefined) {
      insumo.nombre = insumoActualizado.nombre;
    }
    if (insumoActualizado.estado !== undefined) {
      insumo.estado = insumoActualizado.estado;
    }
    if (insumoActualizado.observacion !== undefined) {
      insumo.observacion = insumoActualizado.observacion;
    }

    insumos[index] = insumo;
    guardarArray(insumos, CLAVE_INSUMOS);
    return true;
  }
  return false;
}

export function eliminarInsumo(codigo) {
  let insumos = obtenerInsumos();
  const insumosFiltrados = insumos.filter(i => i.codigo != codigo);
  guardarArray(insumosFiltrados, CLAVE_INSUMOS);
  return insumosFiltrados.length !== insumos.length;
}

