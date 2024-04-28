// class Medalla{
//     constructor(modeloM, colorM, precioM, idM){
//        this.modelo = modeloM,
//        this.color = colorM,
//        this.precio = precioM, 
//        this.id = idM
//     }

//     mostrarInfoMedalla(){
//         console.log(`La medalla ingresada tiene el modelo ${this.modelo} de color ${this.color} Su precio es de ${this.precio} y su ID ${this.idM}`)
//      }
// }

// const medalla1 = new Medalla("Hueso grande", "Naranja", 400, 1)
// const medalla2 = new Medalla("Pez", "verde", 300, 2)
// const medalla3 = new Medalla("Circulo", "azul", 300, 3) 


// const catalogoMedallas = []
// catalogoMedallas.push(medalla1, medalla2, medalla3) 

//Ver Catálogo
function verCatalogoConsola(array){
    console.log(`Nuestro catalogo disponible es el siguiente: `)
    for(let medalla of array){
       console.log(`Modelo: ${medalla.modelo} - Color: ${medalla.color} - Precio: ${medalla.precio} - ID: ${medalla.id}`)
    }
}

function mostrarCatalogo(array) {
    verCatalogoConsola(array)

    catalogoDiv.innerHTML = ``
    for(let medalla of array) {
        let nuevaMedalla = document.createElement("div")
        nuevaMedalla.className = "col-12 my-2 bg-white align-items-center "
        nuevaMedalla.innerHTML = `<p>Modelo: ${medalla.modelo} - Color: ${medalla.color} - Precio: ${medalla.precio} - ID: ${medalla.id}</p>`
        catalogoDiv.appendChild(nuevaMedalla)
    }
}

//No funciona agregar al carrito - Revisar //
function agregarAlCarrito(array){
    let precioFinal = cantidadIngresado.value * 300
    const nuevoProducto = new Medalla(modeloIngresado.value, colorIngresado.value, precioFinal, catalogoMedallas.length+1) 
    array.push(nuevoProducto)
    localStorage.setItem("carrito", JSON.stringify(array))
    console.log(`Se agregaron ${cantidadIngresado.value} medallas del modelo ${modeloIngresado.value} y de color ${colorIngresado.value}`)
}


//Eventos//
verCatalogo.addEventListener("click", ()=>{
   mostrarCatalogo(catalogoMedallas)
})

ocultarCatalogo.onclick = () => {
    catalogoDiv.innerHTML = ``
 }


// A futuro voy a intentar agregar también la opción de otros elementos // 
comprarBandana.addEventListener("click", ()=>{
    console.log("Botón de Comprar Bandana funciona")
})

comprarCollar.addEventListener("click", ()=>{
    console.log("Botón de Comprar Collar funciona")
})

modeloIngresado.addEventListener("change", ()=> {
    let valorModeloIngresado = modeloIngresado.value
    console.log(`El modelo ingresado es ${valorModeloIngresado}`)
})

botonFinalizar.addEventListener("click", ()=> {
    agregarAlCarrito(carrito) })


    //No funciona agregar al carrito - Revisar //

// function agregarAlCarrito(array){
//     let precioFinal = cantidadIngresado.value * 300
//     const nuevoProducto = new Medalla(modeloIngresado.value, colorIngresado.value, precioFinal, catalogoMedallas.length+1) 
//     array.push(nuevoProducto)
//     localStorage.setItem("carrito", JSON.stringify(array))
//     console.log(`Se agregaron ${cantidadIngresado.value} medallas del modelo ${modeloIngresado.value} y de color ${colorIngresado.value}`)
// }