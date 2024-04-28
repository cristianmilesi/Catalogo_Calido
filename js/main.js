//Captura de DOM//
let catalogoDiv = document.getElementById("catalogoDiv");
let verCatalogo = document.getElementById("verCatalogo");
let ocultarCatalogo = document.getElementById("ocultarCatalogo");
let agregarProductoBtn = document.getElementById("agregarProductoBtn");
let tipoProductoIngresado = document.getElementById("tipoProductoInput");
let modeloProductoIngresado = document.getElementById("modeloProductoInput");
let colorProductoIngresado = document.getElementById("colorProductoInput");
let botonAgregarAlCatálogo = document.getElementById("botonAgregarAlCatálogo");
let modalCarritoDiv = document.getElementById("modal-bodyCarrito");
let abrirCarrito = document.getElementById("botonCarrito");
let precioTotal = document.getElementById("precioTotal");
let btnFinalizarCompra = document.getElementById("botonFinalizarCarrito");

let tipoProductoCreado = document.getElementById("tipoProductoCreado");
let modeloProductoCreado = document.getElementById("modeloProductoCreado");
let colorProductoCreado = document.getElementById("colorProductoCreado");
let botonCarritoCrear = document.getElementById("botonCarritoCrear");

let cantidadIngresado = document.getElementById("cantidadInput");
let botonFinalizar = document.getElementById("botonFinalizarCompra");

//Class//

class Producto {
  constructor(tipoP, modeloP, colorP, precioP, idP, imagenP) {
    this.tipo = tipoP;
    (this.modelo = modeloP),
      (this.color = colorP),
      (this.precio = precioP),
      (this.id = idP),
      (this.imagen = imagenP);
  }

  mostrarInfoProducto() {
    console.log(
      `El producto ingresado es un/a ${this.tipo} del modelo ${this.modelo} de color ${this.color} Su precio es de ${this.precio} y su ID ${this.id} Imagen ${this.imagen}`
    );
  }
}

// Creo algunos productos para ingresar al catálogo desde JSON//

const cargarCatalogo = async () => {
  const res = await fetch("productos.json");
  const data = await res.json();

  for (let producto of data) {
    let productoData = new Producto(
      producto.tipo,
      producto.modelo,
      producto.color,
      producto.precio,
      producto.id,
      producto.imagen
    );
    catalogoProductos.push(productoData);
  }
  console.log(catalogoProductos);
  localStorage.setItem("catalogo", JSON.stringify(catalogoProductos));
};

//Creación de Catálogo

let catalogoProductos = [];

if (localStorage.getItem("catalogo")) {
  catalogoProductos = JSON.parse(localStorage.getItem("catalogo"));
} else {
  cargarCatalogo();
}

//Creación de Carrito
let productosCarrito = [];

if (localStorage.getItem("carrito")) {
  productosCarrito = JSON.parse(localStorage.getItem("carrito"));
} else {
  productosCarrito = [];
  localStorage.setItem("carrito", productosCarrito);
}

//Funciones//

//Ver Catálogo
function verCatalogoConsola(array) {
  console.log(`Nuestro catalogo disponible es el siguiente: `);
  for (let producto of array) {
    console.log(
      `Tipo: ${producto.tipo} Modelo: ${producto.modelo} - Color: ${producto.color} - Precio: ${producto.precio} - ID: ${producto.id} - imagen: ${producto.imagen}`
    );
  }
}

//mostrarCatálogo//
function mostrarCatalogo(array) {
  verCatalogoConsola(array);

  catalogoDiv.innerHTML = ``;
  for (let producto of array) {
    let otroProducto = document.createElement("div");
    otroProducto.className = "col-md-3 col-sm-12 my-2 align-items-center ";
    otroProducto.innerHTML = `<div id="${producto.id}" class="card cardCatalogo style="width: 15rem;">
        <img class="card-img-top fill " style="height: 200px;"src="assets/img/Productos/${producto.imagen}" alt="${producto.tipo} de ${producto.modelo}">
        <div class="card-body cardCatalogo">
           <h4 class="card-title">${producto.tipo}</h4>
           <p>Modelo: ${producto.modelo}
           <p>Color: ${producto.color}</p>
           <p>Precio: $${producto.precio}</p>
        <button id="agregarBtn${producto.id}" class="btn botonCatalogo">Agregar al carrito</button>
        </div>
     </div>`;

    catalogoDiv.appendChild(otroProducto);

    let agregarBtn = document.getElementById(`agregarBtn${producto.id}`);

    agregarBtn.addEventListener("click", () => {
      agregarAlCarrito(producto);
    });
  }
}

//Agregar al carrito

function agregarAlCarrito(producto) {
  productosCarrito.push(producto);
  localStorage.setItem("carrito", JSON.stringify(productosCarrito));
  console.log(productosCarrito);
  console.log(
    `Se agrego el producto ${producto.tipo} ${producto.modelo} al CARRITO`
  );

  Toastify({
    text: `Se agregó un producto al CARRITO`,
    duration: 3000,
    gravity: "top",
    position: "center",
    style: {
      background: "#0082A3",
    },
  }).showToast();
}

function cargarProductosCarrito(array) {
  modalCarritoDiv.innerHTML = ``;
  array.forEach((productoCarrito) => {
    modalCarritoDiv.innerHTML += `
      <div id="productoCarrito${productoCarrito.id}" class="card cardCarrito col-9 my-2 align-items-center">
            <img class="card-img-top img-fluid" src="assets/img/Productos/${productoCarrito.imagen}" alt="${productoCarrito.tipo} de ${productoCarrito.modelo}">
            <div class="card-body  ">
               <h4 class="card-title">${productoCarrito.tipo}</h4>
               <p>Modelo: ${productoCarrito.modelo}"
               <p>Color: ${productoCarrito.color}</p>
               <p>Precio: $${productoCarrito.precio}</p>
               <button class= "btn btn-danger" id="botonEliminar${productoCarrito.id}"><i class="fas fa-trash-alt"></i></button>
            </div>
         </div>
      `;
  });

  array.forEach((productoCarrito) => {
    document
      .getElementById(`botonEliminar${productoCarrito.id}`)
      .addEventListener("click", () => {
        console.log(`Eliminar producto`);
        //borrar del DOM
        let cardProducto = document.getElementById(
          `productoCarrito${productoCarrito.id}`
        );
        cardProducto.remove();
        //borrar del array
        //encontramos objeto a eliminar
        let productoEliminar = array.find(
          (producto) => producto.id == productoCarrito.id
        );
        console.log(productoEliminar);
        //buscar indice
        let posicion = array.indexOf(productoEliminar);
        console.log(posicion);
        array.splice(posicion, 1);
        console.log(array);
        localStorage.setItem("carrito", JSON.stringify(array));

        precioFinal(array);
      });
  });

  precioFinal(array);
}

function precioFinal(array) {
  let total = array.reduce(
    (acumulador, producto) => acumulador + producto.precio,
    0
  );

  precioTotal.innerHTML = `PRECIO TOTAL: $${total}`;
  return total;
}

function finalizarCompra(array) {
  let totalFinal = precioFinal(array);
  Swal.fire({
    title: `¿Desea realizar esta compra?`,
    icon: `question`,
    text: `Precio Final: $${totalFinal}`,
    showCancelButton: true,
    confirmButtonText: `¡Si, claro!`,
    cancelButtonText: `No, gracias`,
    confirmButtonColor: `#f15942a2`,
    cancelButtonColor: `gray`,
  }).then((result) => {
    if (result.isConfirmed) {
      //Finalizar compra
      Swal.fire({
        title: `¡Compra exitosa!`,
        icon: `success`,
        text: `¡Muchas gracias por su compra! El precio Final de su compra es $${totalFinal}`,
        confirmButtonColor: `#0082A3`,
      });
      productosCarrito = [];
      localStorage.removeItem("carrito");
    } else {
      Swal.fire({
        title: `La compra no fue realizada`,
        icon: `info`,
        text: `No se ha realizado la compra. Atención: Los productos siguen en el carrito`,
        confirmButtonColor: `#f15942a2`,
        timer: 3000,
      });
    }
  });
}

function calcularPrecioProducto(modeloIngresado) {
  let precioProducto = 0;
  switch (modeloIngresado) {
    case "Hueso grande":
      precioProducto = 300;
      break;
    case "Hueso pequeño":
      precioProducto = 250;
      break;
    case "Circulo":
      precioProducto = 200;
      break;
    case "Pez":
      precioProducto = 200;
      break;
    case "Collar grande":
      precioProducto = 500;
      break;
    case "Collar pequeño":
      precioProducto = 400;
      break;
    case "Bandana grande":
      precioProducto = 400;
      break;
    case "Bandana pequeña":
      precioProducto = 300;
      break;
    default:
      mostrarCatalogo(catalogoProductos);
      break;
  }
  return precioProducto;
}

//Agregar Producto a Catálogo//
function agregarProducto(array) {
  let tipoIngresado = tipoProductoIngresado.value;
  let modeloIngresado = modeloProductoIngresado.value;
  let colorIngresado = colorProductoIngresado.value;
  let precioProducto = calcularPrecioProducto(modeloIngresado);
  let imagenProducto = `${tipoIngresado}Imagen.jpg`;

  const productoNuevo = new Producto(
    tipoIngresado,
    modeloIngresado,
    colorIngresado,
    precioProducto,
    array.length + 1,
    imagenProducto
  );

  array.push(productoNuevo);
  localStorage.setItem("catalogo", JSON.stringify(array));
  mostrarCatalogo(array);

  console.log(
    `Se agregó al catálogo el siguiente producto: ${tipoIngresado} - ${modeloIngresado} - ${colorIngresado} - precio: ${precioProducto} - ID: ${
      array.length + 1
    } - Imagen: ${imagenProducto}`
  );
}

//Agregar Nuevo Producto creado a Carrito//

function crearProducto(array) {
  let tipoCreado = tipoProductoCreado.value;
  let modeloCreado = modeloProductoCreado.value;
  let colorCreado = colorProductoCreado.value;
  let precioProducto = calcularPrecioProducto(modeloCreado);
  let imagenProducto = `${tipoCreado}Imagen.jpg`;

  const productoCreado = new Producto(
    tipoCreado,
    modeloCreado,
    colorCreado,
    precioProducto,
    array.length + 1,
    imagenProducto
  );

  array.push(productoCreado);
  localStorage.setItem("carrito", JSON.stringify(array));
  console.log(`Se agregó un producto nuevo al carrito`);

  Toastify({
    text: `Se agregó un producto al CARRITO`,
    duration: 3000,
    gravity: "top",
    position: "center",
    style: {
      background: "#0082A3",
    },
  }).showToast();
}

//Eventos//
verCatalogo.addEventListener("click", () => {
  mostrarCatalogo(catalogoProductos);
});

ocultarCatalogo.onclick = () => {
  catalogoDiv.innerHTML = ``;
};

botonAgregarAlCatálogo.addEventListener("click", () => {
  agregarProducto(catalogoProductos);
});

abrirCarrito.addEventListener("click", () => {
  cargarProductosCarrito(productosCarrito);
  console.log("botón presionado Carrito");
});

botonCarritoCrear.addEventListener("click", () => {
  crearProducto(productosCarrito);
});

btnFinalizarCompra.addEventListener("click", () => {
  finalizarCompra(productosCarrito);
});
