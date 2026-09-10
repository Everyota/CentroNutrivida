
const productos = [
  {
    id: 1,
    nombre: "Primera consulta nutricional",
    descripcion: "Evaluación inicial: anamnesis, antropometría completa y diseño del primer plan alimenticio [50 min].",
    precio: 35000,
    imagen: "assets/img/1.png"
  },
  {
     
    id: 2,
    nombre: "Control nutricional (seguimiento)",
    descripcion: "Seguimiento mensual: medición de indicadores y ajuste del plan vigente [30 min].",
    precio: 25000,
    imagen: "assets/img/2.png"
  },
  {
    id: 3,
    nombre: "Control nutricional quincenal",
    descripcion: "Para pacientes que requieren atención fuera de su control habitual [30 min].",
    precio: 22000,
    imagen: "assets/img/4.png"
  },
   {
    id: 4,
    nombre: "Teleconsulta nutricional",
    descripcion: "Consulta de seguimiento vía videollamada. Requiere contar con consulta presencial previa [30 min].",
    precio: 20000,
    imagen: "assets/img/6.png"
  },
    {
    id: 5,
    nombre: "Consulta de urgencia / reagendada",
    descripcion: "Para pacientes que requieren atención fuera de su control habitual [30 min].",
    precio: 28000,
    imagen: "assets/img/3.png"
  },
  {
    id: 6,
    nombre: "Plan pérdida de peso (1 mes)",
    descripcion: "Incluye primera consulta + 1 control quincenal + plan alimenticio personalizado + seguimiento por WhatsApp.",
    precio: 65000,
    imagen: "assets/img/100.png"
  },
   {
    id: 7,
    nombre: "Plan pérdida de peso (3 meses)",
    descripcion: "Incluye primera consulta + 5 controles + 3 planes mensuales + seguimiento continuo",
    precio: 170000,
    imagen: "assets/img/100.png"
  },
   {
    id: 8,
    nombre: "Plan control diabetes /hipertensión ",
    descripcion: "Plan adaptado para patologías metabólicas. Coordinación con médico tratante si aplica.",
    precio: 75000,
    imagen: "assets/img/7.png"
  },
     {
    id: 9,
    nombre: "Antropometría completa",
    descripcion: "Peso, talla, IMC, circunferencia de cintura, cadera, brazo y % de grasa corporal con bioimpedanciometría",
    precio: 18000,
    imagen: "assets/img/10.png"
  },
  {
    id: 10,
    nombre: "Biopedanciometría",
    descripcion: "Medición de composición corporal: masa grasa, masa muscular, agua corporal y edad metabólica",
    precio: 12000,
    imagen: "assets/img/11.png"
  },
   {
    id: 11,
    nombre: "Análisis de laboratorio",
    descripcion: "Interpretación de hemograma, perfil bioquímico y lipídico en contexto nutricional",
    precio: 15000,
    imagen: "assets/img/13.png"
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