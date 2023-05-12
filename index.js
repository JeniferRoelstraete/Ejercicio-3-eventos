const formulario = document.getElementById('formulario')
const inputTitulo = document.getElementById('titulo')
const textarea = document.getElementById('textousuario')
const botonBorrar = document.getElementById('borarrboton')
const containerNotas = document.getElementById('container-notas')

const notasCreadas = []

// Agregado de notas de prueba
/* const nota1 = {
    id: 1,
    titulo: 'Titulo',
    texto: 'Texto',
    realizada: true
}

const nota2 = {
    id: 2,
    titulo: 'Titulo2',
    texto: 'Texto2',
    realizada: true
}

notasCreadas.push(nota1, nota2) */

let idGlobal = 0

function agregarNotas(titulo, texto) {
    idGlobal += 1 
    const nota = {
        id:  idGlobal,
        titulo: titulo,
        texto: texto,
        realizada: false 
    }
    notasCreadas.push(nota)
}

function armarTarjeta(nota) {
    return `
    <div class="tarjeta d-flex flex-column justify-content-between">
        <div class="d-flex align-content-center titulo-tarjeta gap-2">
            <input type="checkbox" onClick="marcarRealizada(${nota.id})" ${nota.realizada ? "checked": ""}>
            <h3>${nota.titulo}</h3>
        </div>
        <p class="contenido-tarjeta">${nota.texto}</p>
        <div class="boton-tarjeta">
            <input onclick="borrarNota(${nota.id})" class="button" type="button" value="Borrar nota">
        </div>
    </div>`
}

function marcarRealizada(id) {
    const nota = notasCreadas.find(nota => nota.id === id)
    if (nota) {     // Evalua a Falsy en caso de que nota sea undefined (porque no se encontró por su id en el array)
        nota.realizada = !nota.realizada
    }
}

function borrarNota(id) {
    const indice = notasCreadas.findIndex(nota => nota.id === id)
    if (indice > -1) {
        notasCreadas.splice(indice, 1)
        pintarTarjetas(notasCreadas, containerNotas)
    }
}

function pintarTarjetas(listaNotas, containerNotas) {
    let tarjetas = ''
    listaNotas.forEach(nota => {
        tarjetas += armarTarjeta(nota)
    })
    containerNotas.innerHTML = tarjetas
}

function borrarInputs() {
    inputTitulo.value = ''
    textarea.value = ''
}

formulario.addEventListener('submit' , (e) =>  {
    e.preventDefault()
    const titulo = inputTitulo.value
    const texto = textarea.value
    if (titulo === '' || texto === '') {
        return
    }
    agregarNotas(titulo, texto)
    borrarInputs()
    pintarTarjetas(notasCreadas, containerNotas)
}) 