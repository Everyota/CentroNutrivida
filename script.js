// =====================================================
// 1. PRODUCTOS
// =====================================================

const productos = [
  {
    id: 1,
    nombre: "Café Orgánico",
    precio: 6990,
    imagen: "https://picsum.photos/seed/cafe/600/400"
  },
  {
    id: 2,
    nombre: "Té Verde",
    precio: 4990,
    imagen: "https://picsum.photos/seed/te/600/400"
  },
  {
    id: 3,
    nombre: "Granola Natural",
    precio: 5990,
    imagen: "https://picsum.photos/seed/granola/600/400"
  }
];

const grillaProductos = document.getElementById("grilla-productos");

function mostrarProductos() {
  grillaProductos.innerHTML = "";

  productos.forEach((producto) => {
    const tarjeta = document.createElement("article");
    tarjeta.classList.add("producto");

    tarjeta.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <div class="producto-contenido">
        <h3>${producto.nombre}</h3>
        <p>Producto seleccionado para demostrar una tienda online dinámica.</p>
        <p class="precio">$${producto.precio.toLocaleString("es-CL")}</p>
        <button class="boton" data-id="${producto.id}">
          Añadir al carrito
        </button>
      </div>
    `;

    grillaProductos.appendChild(tarjeta);
  });

  document.querySelectorAll(".producto button").forEach((boton) => {
    boton.addEventListener("click", () => {
      agregarAlCarrito(Number(boton.dataset.id));
    });
  });
}


// =====================================================
// 2. CARRITO CON LOCALSTORAGE
// =====================================================

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const panelCarrito = document.getElementById("panel-carrito");
const btnCarrito = document.getElementById("btn-carrito");
const cerrarCarrito = document.getElementById("cerrar-carrito");
const listaCarrito = document.getElementById("lista-carrito");
const contadorCarrito = document.getElementById("contador-carrito");
const totalCarrito = document.getElementById("total-carrito");
const vaciarCarrito = document.getElementById("vaciar-carrito");

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function agregarAlCarrito(idProducto) {
  const producto = productos.find((p) => p.id === idProducto);

  const productoExistente = carrito.find((p) => p.id === idProducto);

  if (productoExistente) {
    productoExistente.cantidad++;
  } else {
    carrito.push({
      ...producto,
      cantidad: 1
    });
  }

  guardarCarrito();
  actualizarCarrito();
  panelCarrito.classList.remove("oculto");
}

function eliminarDelCarrito(idProducto) {
  carrito = carrito.filter((p) => p.id !== idProducto);

  guardarCarrito();
  actualizarCarrito();
}

function actualizarCarrito() {
  listaCarrito.innerHTML = "";

  if (carrito.length === 0) {
    listaCarrito.innerHTML = "<p>El carrito está vacío.</p>";
  }

  carrito.forEach((producto) => {
    const item = document.createElement("div");
    item.classList.add("item-carrito");

    item.innerHTML = `
      <div>
        <strong>${producto.nombre}</strong>
        <p>Cantidad: ${producto.cantidad}</p>
        <p>
          Subtotal:
          $${(producto.precio * producto.cantidad).toLocaleString("es-CL")}
        </p>
      </div>

      <button data-id="${producto.id}">
        Eliminar
      </button>
    `;

    listaCarrito.appendChild(item);
  });

  document.querySelectorAll(".item-carrito button").forEach((boton) => {
    boton.addEventListener("click", () => {
      eliminarDelCarrito(Number(boton.dataset.id));
    });
  });

  const cantidadTotal = carrito.reduce(
    (acumulador, producto) => acumulador + producto.cantidad,
    0
  );

  const montoTotal = carrito.reduce(
    (acumulador, producto) =>
      acumulador + producto.precio * producto.cantidad,
    0
  );

  contadorCarrito.textContent = cantidadTotal;
  totalCarrito.textContent = montoTotal.toLocaleString("es-CL");
}

btnCarrito.addEventListener("click", () => {
  panelCarrito.classList.remove("oculto");
});

cerrarCarrito.addEventListener("click", () => {
  panelCarrito.classList.add("oculto");
});

vaciarCarrito.addEventListener("click", () => {
  carrito = [];
  guardarCarrito();
  actualizarCarrito();
});


// =====================================================
// 3. VALIDACIONES GENERALES
// =====================================================

const patronCorreo =
  /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;

function validarCorreo(correo) {
  if (correo.trim() === "") {
    return "El correo es obligatorio.";
  }

  if (correo.length > 100) {
    return "El correo no puede superar los 100 caracteres.";
  }

  if (!patronCorreo.test(correo)) {
    return "Use un correo @duoc.cl, @profesor.duoc.cl o @gmail.com.";
  }

  return "";
}


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


// =====================================================
// 5. VALIDACIÓN DEL FORMULARIO DE CONTACTO
// =====================================================

const formContacto = document.getElementById("form-contacto");

const nombreContacto = document.getElementById("nombre-contacto");
const correoContacto = document.getElementById("correo-contacto");
const comentarioContacto = document.getElementById("comentario-contacto");

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


// =====================================================
// 6. INICIALIZACIÓN
// =====================================================

mostrarProductos();
actualizarCarrito();
