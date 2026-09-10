// =====================================================
// 1. PRODUCTOS
// =====================================================

const productos = [
  {
    id: 1,
    nombre: "Obesidad y síndrome metabólico",
    descripcion: "Planes personalizados para mejorar hábitos, controlar el peso y favorecer una mejor salud metabólica.",
    pagina: "obesidad-sindrome-metabolico",
    imagen: "https://www.goredforwomen.org/es/-/media/AHA/H4GM/Article-Images/Lose-Weight-and-Keep-It-Off.jpg?h=683&iar=0&mw=1910&w=1024&sc_lang=es"
  },
  {
    id: 2,
    nombre: "Nutrición deportiva y rendimiento",
    descripcion: "Alimentación enfocada en mejorar el rendimiento, la recuperación y la composición corporal.",
    pagina: "nutricion-deportiva",
    imagen: "https://online.unab.cl/blog/wp-content/uploads/2025/10/nutricion-deportiva.webp"
  },
  {
    id: 3,
    nombre: "Alimentación vegana, vegetariana y TCA",
    descripcion: "Orientación nutricional adaptada a distintos tipos de alimentación y necesidades relacionadas con la conducta alimentaria.",
    pagina: "alimentacion-vegana-tca",
    imagen: "https://www.mytherapyapp.com/media/pages/es/blog/dieta-vegana-reduce-colesterol/1ae35bd2a4-1733691189/colesterol-dieta-vegana-titulo-1200x675-crop-1-q65-optimized.jpg"
  },
    {
    id: 4,
    nombre: "Nutrición pediátrica y familiar",
    descripcion: "Orientación nutricional adaptada a distintos tipos de alimentación y necesidades relacionadas con la conducta alimentaria.",
    pagina: "nutricion-pediatrica-familiar",
    imagen: "https://salucity.com/img/especialidades/nutricion-infantil.webp"
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
        <p>${producto.descripcion}</p>
        <a href="${producto.pagina}.html" class="boton" data-id="${producto.id}">
         Ver más
        </a>
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
// 6. INICIALIZACIÓN
// =====================================================

mostrarProductos();
