
const productos = [
   {
    id: 1,
    nombre: "Plan alimentación infantil (2-12 años)",
    descripcion: "Evaluación nutricional pediátrica y diseño de plan adaptado a la etapa de desarrollo del niño.",
    precio: 65000,
    imagen: "assets/img/1.png"
  },
  {
     
    id: 2,
    nombre: "Bioimpedanciometría",
    descripcion: "Medición de composición corporal: masa grasa, masa muscular, agua corporal y edad metabólica.",
    precio: 12000,
    imagen: "assets/img/2.png"
  },
  {
    id: 3,
    nombre: "Encuesta de hábitos alimentarios",
    descripcion: "Análisis del patrón alimentario actual. Identificación de déficit y excesos nutricionales.",
    precio: 10000,
    imagen: "assets/img/3.png"
  },
   {
    id: 4,
    nombre: "Análisis de exámenes de laboratorio",
    descripcion: "Interpretación de hemograma, perfil bioquímico y lipídico en contexto nutricional.",
    precio: 15000,
    imagen: "assets/img/4.png"
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
        <p class="precio">$${producto.precio.toLocaleString("es-CL")}</p>
        <p>${producto.descripcion}</p>
        <button class="boton" data-id="${producto.id}">
          Agendar
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

let servicioAgendamiento = JSON.parse(localStorage.getItem("servicioAgendamiento")) || null;

const panelCarrito = document.getElementById("panel-carrito");
const btnCarrito = document.getElementById("btn-carrito");
const cerrarCarrito = document.getElementById("cerrar-carrito");
const listaCarrito = document.getElementById("lista-carrito");
const contadorCarrito = document.getElementById("contador-carrito");
const vaciarCarrito = document.getElementById("vaciar-carrito");
const confirmarAgendamiento = document.getElementById("confirmar-agendamiento");
// Elementos del formulario
const nombresPaciente = document.getElementById("nombres-paciente");
const errorNombresPaciente = document.getElementById("error-nombres-paciente");
const apellidosPaciente = document.getElementById("apellidos-paciente");
const errorApellidosPaciente = document.getElementById("error-apellidos-paciente");
const correo = document.getElementById("email-paciente");
const errorCorreoLogin = document.getElementById("error-email-paciente");

function guardarCarrito() {
  if (servicioAgendamiento) {
    localStorage.setItem("servicioAgendamiento", JSON.stringify(servicioAgendamiento));
  }
  else {
    localStorage.removeItem("servicioAgendamiento");
  }
}

function agregarAlCarrito(idProducto) {
  const producto = productos.find((p) => p.id === idProducto);

  if (producto.id !== servicioAgendamiento?.id) {
    servicioAgendamiento = producto;
  }

  guardarCarrito();
  actualizarCarrito();
  panelCarrito.classList.remove("oculto");
}

function eliminarDelCarrito(idProducto) {
  servicioAgendamiento = null;

  guardarCarrito();
  actualizarCarrito();
}

function actualizarCarrito() {
  listaCarrito.innerHTML = "";

  if (servicioAgendamiento) {
    btnCarrito.disabled = false;
    const item = document.createElement("div");
    item.classList.add("item-carrito");

    item.innerHTML = `
      <div>
        <strong>${servicioAgendamiento.nombre}</strong>
        <p>
          Valor:
          $${(servicioAgendamiento.precio).toLocaleString("es-CL")}
        </p>
      </div>
    `;

    listaCarrito.appendChild(item);
    contadorCarrito.textContent = 1;
  }
  else {
    btnCarrito.disabled = true;
  }
}

const manejarVaciarCarrito = () => {
  servicioAgendamiento = null;
  guardarCarrito();
  actualizarCarrito();
  panelCarrito.classList.add("oculto");
  contadorCarrito.textContent = 0;
}

// Validaciones

const validarNoEstaVacio = (texto, mensajeError) => {
  if (texto.trim() === "") {
    return mensajeError;
  }
  return "";
}

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

function validarNombres() {
  const error = validarNoEstaVacio(nombresPaciente.value, "Los nombres son obligatorios.");
  errorNombresPaciente.textContent = error;
  return error === "";
}

function validarApellidos() {
  const error = validarNoEstaVacio(apellidosPaciente.value, "Los apellidos son obligatorios.");
  errorApellidosPaciente.textContent = error;
  return error === "";
}

function validarCorreoFormulario() {
  const error = validarCorreo(correo.value);
  errorCorreoLogin.textContent = error;
  return error === "";
}

btnCarrito.addEventListener("click", () => {
  panelCarrito.classList.remove("oculto");
});

cerrarCarrito.addEventListener("click", () => {
  panelCarrito.classList.add("oculto");
});

vaciarCarrito.addEventListener("click", () => {
  manejarVaciarCarrito();
});
// Obtenemos el usuario del localStorage
const usuarioLog = localStorage.getItem("usuario");

nombresPaciente.addEventListener("input", validarNombres);
apellidosPaciente.addEventListener("input", validarApellidos);
correo.addEventListener("input", validarCorreoFormulario);

confirmarAgendamiento.addEventListener("click", () => {
  //Validaciones de los campos del formulario
  let formularioValido = true;
  debugger;
  if(usuarioLog === null){
    if (validarNombres() === false) {
    formularioValido = false;
  }
  if (!validarApellidos()) {
    formularioValido = false;
  }
  if (validarCorreoFormulario() === false) {
    formularioValido = false;
  } 
}
  if (formularioValido) {
    // Si todo es válido, se puede proceder a confirmar el agendamiento
    alert("Cita agendada con éxito para el servicio: " + servicioAgendamiento.nombre);
    manejarVaciarCarrito();
  }

})


if (usuarioLog) {
    // Si hay usuario, ocultamos el formulario de datos de paciente
    document.getElementById("datos-paciente").innerHTML = `<p>Hora agendada para ${usuarioLog}</p>`;
}

mostrarProductos();
actualizarCarrito();