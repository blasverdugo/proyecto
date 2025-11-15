// IMPORTS
import {
  obtenerArray,
  guardarArray,
  obtenerCodigo,
  obtenerSiguienteCodigo
} from "./bd.js"; 


const CLAVE_DESTINATARIOS = "destinatarios";


// DESTINATARIOS
export function obtenerDestinatarios() {
  let destinatarios = obtenerArray(CLAVE_DESTINATARIOS);
  if (destinatarios.length === 0) {
    destinatarios = [{ codigo: 1, nombreYApellido: "Sin asignar", cargo: "N/A" }]; // <-- Usa el código ALEATORIO
    guardarArray(destinatarios, CLAVE_DESTINATARIOS);
  }
  return destinatarios;
}

export function guardarDestinatario(destinatario) {
  const destinatarios = obtenerDestinatarios();
  destinatario.codigo = obtenerSiguienteCodigo(CLAVE_DESTINATARIOS); // <-- Usa el INCREMENTAL
  destinatarios.push(destinatario);
  guardarArray(destinatarios, CLAVE_DESTINATARIOS);
  return destinatario;
}



