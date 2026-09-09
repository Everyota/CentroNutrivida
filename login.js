// =====================================================
// 4. VALIDACIÓN DEL LOGIN
// =====================================================

const formLogin = document.getElementById("form-login");
const correoLogin = document.getElementById("correo-login");
const passwordLogin = document.getElementById("password-login");

const errorCorreoLogin = document.getElementById("error-correo-login");
const errorPasswordLogin = document.getElementById("error-password-login");
const mensajeLogin = document.getElementById("mensaje-login");

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

function validarCorreoLogin() {
  const error = validarCorreo(correoLogin.value);
  errorCorreoLogin.textContent = error;
  return error === "";
}

function validarPasswordLogin() {
  const password = passwordLogin.value;

  if (password === "") {
    errorPasswordLogin.textContent = "La contraseña es obligatoria.";
    return false;
  }

  if (password.length < 4 || password.length > 10) {
    errorPasswordLogin.textContent =
      "La contraseña debe tener entre 4 y 10 caracteres.";
    return false;
  }

  errorPasswordLogin.textContent = "";
  return true;
}

correoLogin.addEventListener("input", validarCorreoLogin);
passwordLogin.addEventListener("input", validarPasswordLogin);

formLogin.addEventListener("submit", (event) => {
  event.preventDefault();

  const correoValido = validarCorreoLogin();
  const passwordValido = validarPasswordLogin();

  if (correoValido && passwordValido) {

    // Agregamos el usuario al localStorage
    localStorage.setItem("usuario", correoLogin.value)
    window.location.href = "index.html";


  } else {
    mensajeLogin.textContent =
      "Revise los campos marcados antes de continuar.";
  }
});