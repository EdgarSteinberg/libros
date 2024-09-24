let productosEnCarrito = [];

if (localStorage.getItem("carrito")) {
    productosEnCarrito = JSON.parse(localStorage.getItem("carrito"));

} else {
    localStorage.setItem("carrito", JSON.stringify(productosEnCarrito));
}

let divProductos = document.getElementById("productos")
let btnGuardarLibro = document.getElementById("guardarLibroBtn")
let buscador = document.getElementById("buscador")
let btnVerCatalogo = document.getElementById("verCatalogo")
let btnOcultarCatalogo = document.getElementById("ocultarCatalogo")
let modalBody = document.getElementById("modal-body")
let botonCarrito = document.getElementById("botonCarrito")
let coincidencia = document.getElementById("coincidencia")
let selectOrden = document.getElementById("selectOrden")


async function getBooks() {
    try {
        const response = await fetch('../data.json');
        const json = await response.json();
        mostrarCatalogo(json);
        estanteria = json; // Guardamos los libros en la estantería
    } catch (error) {
        console.error(error);
    }
}

function buscarInfo(buscado, array) {
    let busqueda = array.filter(
        (libro) => libro.autor.toLowerCase().includes(buscado.toLowerCase()) || libro.titulo.toLowerCase().includes(buscado.toLowerCase())
    )

    if (busqueda.length == 0) {
        coincidencia.innerHTML = ""
        let nuevoDiv = document.createElement("div")
        nuevoDiv.innerHTML = `<p> No hay coincidencias</p>`
        coincidencia.appendChild(nuevoDiv)
        mostrarCatalogo(array)
    } else {
        coincidencia.innerHTML = ""
        mostrarCatalogo(busqueda)
    }
}

function ordenarMayorMenor(array) {
    let mayorMenor = [].concat(array)
    mayorMenor.sort((a, b) => (b.precio - a.precio))
    mostrarCatalogo(mayorMenor)
}

function ordenarMenorMayor(array) {
    let menorMayor = [].concat(array)
    menorMayor.sort((a, b) => (a.precio - b.precio))
    mostrarCatalogo(menorMayor)
}

function ordernarAlfabeticamente(array) {
    let alfabeticamente = [].concat(array)
    alfabeticamente.sort((a, b) => {
        if (a.titulo < b.titulo) return -1
        if (a.titulo > b.titulo) return 1
        return 0;
    })
    mostrarCatalogo(alfabeticamente)
}


function mostrarCatalogo(array) {
    divProductos.innerHTML = ""
    estanteria = array
    for (const libro of array) {
        let nuevoLibro = document.createElement("div")
        nuevoLibro.classList.add("col-12", "col-md-6", "col-lg-4", "my-4")
        nuevoLibro.innerHTML = `<div id="${libro.id}" class="card style="width:18rem;">
        <img class="card-img-top img-fluid" style="width: 100%; height: 200px; object-fit: corver;"src="assets/${libro.imagen}" alt="${libro.titulo} de ${libro.autor}">
        <div class="card-body">
             <h4 class="card-title">${libro.titulo}</h4>
             <p class="card-p">Autor: ${libro.autor}</p>
             <p class="card-p">Precio: $${libro.precio}</p>
        <button id="agregarBtn${libro.id}" class="btn btn-success" style="width:100%">Agregar al carrito</button>
        </div>     
        </div>`
        divProductos.appendChild(nuevoLibro)
        let btnAgregar = document.getElementById(`agregarBtn${libro.id}`)

        btnAgregar.addEventListener("click", () => {
            agregarAlCarrito(libro)
            Swal.fire("Has agregado este producto al carrito!");
        })
    }
}

function agregarAlCarrito(libro) {
    productosEnCarrito.push(libro)
    localStorage.setItem("carrito", JSON.stringify(productosEnCarrito))
}

function cargarProductosCarrito(array) {
    modalBody.innerHTML = ""

    array.forEach(productoCarrito => {
        modalBody.innerHTML += `
        <div class="card border-primary mb-3" id="productoCarrito${productoCarrito.id}" style="max-width: 300px;">
            <img class="card-img-top" style="min-width:290px ;max-height: 250px; " src="assets/${productoCarrito.imagen}" alt="${productoCarrito.titulo}">
                <div class="card-body" > 
                <h4 class="card-title">${productoCarrito.titulo}</h4>
                <p class="card-text" style="text-align: center" ;> $${productoCarrito.precio}</p>
                <button class="btn btn-danger" style="text-align: center; width: 100%" id="botonEliminar${productoCarrito.id}">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        </div>
        `;
    });


    array.forEach((productoCarrito, indice) => {
        document.getElementById(`botonEliminar${productoCarrito.id}`).addEventListener("click", () => {
            let cardProducto = document.getElementById(`productoCarrito${productoCarrito.id}`)
            cardProducto.remove()
            productosEnCarrito.splice(indice, 1)
            localStorage.setItem("carrito", JSON.stringify(productosEnCarrito))

        })
    });
}


function cargarLibro(array) {
    let inputAutor = document.getElementById("autorInput")
    let inputTitulo = document.getElementById("tituloInput")
    let inputPrecio = document.getElementById("precioInput")

    let libroCreado = new Libro(array.length + 1, inputAutor.value, inputTitulo.value, parseInt(inputPrecio.value), "libroNuevo.jpg")
    libroCreado.mostrarData()
    array.push(libroCreado)
    localStorage.setItem("estanteria", JSON.stringify(array))
    mostrarCatalogo(array)
    inputAutor.value = ""
    inputTitulo.value = ""
    inputPrecio.value = ""

}

btnGuardarLibro.addEventListener("click", () => {
    cargarLibro(estanteria)
})

buscador.addEventListener("input", () => {
    buscarInfo(buscador.value, estanteria)
})

botonCarrito.addEventListener("click", () => {
    cargarProductosCarrito(productosEnCarrito)
})

selectOrden.addEventListener("change", () => {
    if (selectOrden.value == 1) {
        ordenarMayorMenor(estanteria)
    }
    else if (selectOrden.value == 2) {
        ordenarMenorMayor(estanteria)
    }
    else if (selectOrden.value == 3) {
        ordernarAlfabeticamente(estanteria)
    }
    else {
        mostrarCatalogo(estanteria)
    }

})

//  getBooks().then(books => {
//     mostrarCatalogo(books)
//  })

getBooks();