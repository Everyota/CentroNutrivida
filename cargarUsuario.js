
// Obtenemos el usuario del localStorage
const usuario = localStorage.getItem("usuario");

if (usuario) {
    // Si hay usuario, lo colocamos en el elemento con id "usuario-actual"
    document.getElementById("usuario-actual").textContent = `¡Bienvenido/a ${usuario}!`;
}