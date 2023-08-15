/* class Libro {
    constructor(id, autor,titulo,precio,imagen) {
        this.id = id,
        this.autor = autor,
        this.titulo = titulo,
        this.precio = precio,
        this.imagen = imagen
    }
    mostarData() {
        console.log(`El titulos es ${this.titulo}, el autor es ${this.autor} y su precio es ${this.precio}`)
    }
}

const libro1 = new Libro (1, "Jorge Luis Borges", "Aleph", 900, "AlephBorges.jpg")
const libro2 = new Libro (2, "Gabriel Garcia Marquez", "Cien años de soledad", 4500, "CienSoledadMarquez.jpg")
const libro3 = new Libro (3, "Isabel Allende", "Paula", 2800, "PaulaAllende.jpg")
const libro4 = new Libro (4, "Jorge Luis Borges", "Ficciones", 1400, "FiccionesBorges.jpg")
const libro5 = new Libro (5, "Mario Benedetti", "Andamios", 2200, "AndamiosBenedetti.jpg")
const libro6 = new Libro (6, "Mario Vargas Llosa", "La ciudad y los perros", 2000, "CiudadPerrosVargasLlosa.jpg" )

let estanteria = []

if(localStorage.getItem("Estanteria")){
    estanteria = JSON.parse(localStorage.getItem("estanteria"))

}else{
    estanteria.push(libro1, libro2, libro3, libro4, libro5, libro6)
    localStorage.setItem("estanteria", JSON.stringify(estanteria))
} */