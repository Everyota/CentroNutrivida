
// =====================================================
// 5. VALIDACIÓN DEL FORMULARIO DE CONTACTO
// =====================================================

const formContacto = document.getElementById("form-contacto");

const nombreContacto = document.getElementById("nombre-contacto");
const correoContacto = document.getElementById("correo-contacto");
const comentarioContacto = document.getElementById("comentario-contacto");
const patronCorreo =
  /^[^\s@]+@(outlook\.com|gmail\.com)$/i;

function validarCorreo(correo) {
  if (correo.trim() === "") {
    return "El correo es obligatorio.";
  }

  if (correo.length > 100) {
    return "El correo no puede superar los 100 caracteres.";
  }

  if (!patronCorreo.test(correo)) {
    return "Use un correo @outlook.com o @gmail.com.";
  }

  return "";
}

const errorNombreContacto =
  document.getElementById("error-nombre-contacto");

const errorCorreoContacto =
  document.getElementById("error-correo-contacto");

const errorComentarioContacto =
  document.getElementById("error-comentario-contacto");

const mensajeContacto =
  document.getElementById("mensaje-contacto");

function validarNombreContacto() {
  const nombre = nombreContacto.value.trim();

  if (nombre === "") {
    errorNombreContacto.textContent = "El nombre es obligatorio.";
    return false;
  }

  if (nombre.length > 100) {
    errorNombreContacto.textContent =
      "El nombre no puede superar los 100 caracteres.";
    return false;
  }

  errorNombreContacto.textContent = "";
  return true;
}

function validarCorreoContacto() {
  const error = validarCorreo(correoContacto.value);
  errorCorreoContacto.textContent = error;
  return error === "";
}

function validarComentarioContacto() {
  const comentario = comentarioContacto.value.trim();

  if (comentario === "") {
    errorComentarioContacto.textContent =
      "El comentario es obligatorio.";
    return false;
  }

  if (comentario.length > 500) {
    errorComentarioContacto.textContent =
      "El comentario no puede superar los 500 caracteres.";
    return false;
  }

  errorComentarioContacto.textContent = "";
  return true;
}

nombreContacto.addEventListener("input", validarNombreContacto);
correoContacto.addEventListener("input", validarCorreoContacto);
comentarioContacto.addEventListener("input", validarComentarioContacto);

formContacto.addEventListener("submit", (event) => {
  event.preventDefault();

  const nombreValido = validarNombreContacto();
  const correoValido = validarCorreoContacto();
  const comentarioValido = validarComentarioContacto();

  if (nombreValido && correoValido && comentarioValido) {
    mensajeContacto.textContent =
      "Mensaje enviado correctamente. Gracias por contactarnos.";

    formContacto.reset();

    errorNombreContacto.textContent = "";
    errorCorreoContacto.textContent = "";
    errorComentarioContacto.textContent = "";
  } else {
    mensajeContacto.textContent =
      "Revise los campos marcados antes de enviar.";
  }
});
