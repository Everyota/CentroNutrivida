// =====================================================
// 4. VALIDACIÓN DEL LOGIN
// =====================================================

const formLogin = document.getElementById("form-login");
const correoLogin = document.getElementById("correo-login");
const passwordLogin = document.getElementById("password-login");

const errorCorreoLogin = document.getElementById("error-correo-login");
const errorPasswordLogin = document.getElementById("error-password-login");
const mensajeLogin = document.getElementById("mensaje-login");

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
    mensajeLogin.textContent = "Inicio de sesión validado correctamente.";
    formLogin.reset();
    errorCorreoLogin.textContent = "";
    errorPasswordLogin.textContent = "";
  } else {
    mensajeLogin.textContent =
      "Revise los campos marcados antes de continuar.";
  }
});