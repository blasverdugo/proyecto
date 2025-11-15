// IMPORTS
import {
  obtenerArray,
  obtenerCodigo,
  guardarArray,
  obtenerSiguienteCodigo
} from "./bd.js"; 


// USUARIOS
export const CLAVE_USUARIOS = "usuarios";

export function obtenerUsuarios() {
  let usuarios = obtenerArray(CLAVE_USUARIOS);
  if (usuarios.length === 0) {
    usuarios = [{
      codigo: 1,
      dni: "0000",
      nombreYApellido: "Administrador General",
      email: "admin@isft12.edu.ar",
      cargo: "Admin",
      passwordSystem: "admin",
      active: true,
    }];
    guardarArray(usuarios, CLAVE_USUARIOS);
  }
  return usuarios;
}

export function guardarUsuario(usuario) {
  const usuarios = obtenerUsuarios();
  usuario.codigo = obtenerSiguienteCodigo(CLAVE_USUARIOS); // <-- Usa el INCREMENTAL
  usuarios.push(usuario);
  guardarArray(usuarios, CLAVE_USUARIOS);
  return usuario;
}

export function actualizarUsuario(usuarioActualizado) {
  let usuarios = obtenerUsuarios();
  let index = -1;
  let i = 0;

  // Buscar el índice del usuario por su código
  while (index === -1 && i < usuarios.length) {
    if (usuarios[i].codigo == usuarioActualizado.codigo) {
      index = i;
    }
    i++;
  }
  // Si se encontró el usuario, actualizarlo
  if (index !== -1) {
    let usuario = usuarios[index];

    // Actualiza cada campo 
    if (usuarioActualizado.nombreYApellido !== undefined) {
      usuario.nombreYApellido = usuarioActualizado.nombreYApellido;
    }
    if (usuarioActualizado.email !== undefined) {
      usuario.email = usuarioActualizado.email;
    }
    if (usuarioActualizado.cargo !== undefined) {
      usuario.cargo = usuarioActualizado.cargo;
    }
    if (usuarioActualizado.passwordSystem !== undefined) {
      usuario.passwordSystem = usuarioActualizado.passwordSystem;
    }

    usuarios[index] = usuario;
    guardarArray(usuarios, CLAVE_USUARIOS);
    return true;
  }
  return false;
}

export function eliminarUsuario(codigo) {
  let usuarios = obtenerUsuarios();
  const usuariosFiltrados = usuarios.filter(u => u.codigo != codigo);
  guardarArray(usuariosFiltrados, CLAVE_USUARIOS);
  return usuariosFiltrados.length !== usuarios.length;
}