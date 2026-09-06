
const productos = [
  {
    id: 1,
    nombre: "Teleconsulta nutricional",
    descripcion: "Consulta de seguimiento vía videollamada. Requiere contar con consulta presencial previa.",
    precio: 20000,
    imagen: "https://www.goredforwomen.org/es/-/media/AHA/H4GM/Article-Images/Lose-Weight-and-Keep-It-Off.jpg?h=683&iar=0&mw=1910&w=1024&sc_lang=es"
  },
  {
    id: 2,
    nombre: "Consulta de urgencia / reagendada",
    descripcion: "Para pacientes que requieren atención fuera de su control habitual.",
    precio: 28000,
    imagen: "https://www.goredforwomen.org/es/-/media/AHA/H4GM/Article-Images/Lose-Weight-and-Keep-It-Off.jpg?h=683&iar=0&mw=1910&w=1024&sc_lang=es"
  },
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

mostrarProductos();
actualizarCarrito();
