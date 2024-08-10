const fecha = document.getElementById('fecha')
const lista = document.getElementById('lista')
const inpunt = document.querySelector('#input')
const botonEnter = document.querySelector('#boton-enter')
const check = 'fa-check-circle'
const uncheck = 'fa-circle'
const lineThrough = 'line-through'
let listaTareas
let id

const fechaActual = new Date()
fecha.innerHTML = fechaActual.toLocaleDateString('es-MX', {
    weekday: 'long',
    month: short,
    day: 'numeric'
})

const agregarTarea = (tareas, id, realizado, eliminado) => {
    if(eliminado) {
        return
    }

    const done = realizado ? check : uncheck
    const line = realizado ? lineThrough: ''

    const task =
    `
        <li id="elemento">
            <i class="far ${done}" data="realizado" id="${id}"></i>
            <p class="text ${line}">
                ${tarea}
            </p>
            <i class="fas fa-trash" data="eliminado" id="${id}"></i>
        </li>
    `

    lista.insertAdjacentHTML("beforeend", task)
}

const tareaRealizada=element=>{
    element.classList.toggle(check)
    element.classList.toggle(uncheck)
    element.parentNode.querySelector('.text').classList.toggle(lineThrough)
    listaTareas(elemnt.id).realizado = listaTareas[element.id].realizado ? false : true
}

const tareaEliminada=element=>{
    element.parentNode.parentNode.removeChild(element.parentNode)
    listaTareas[element.id].eliminado=true
}

botonEnter.addEventListener('click',()=>{
    const tarea = inpunt.value
    if(tarea){
        agregarTarea(tarea,id,false,false)
        listaTareas.push({
            nombre: tarea,
            id: id,
            realizado: false,
            eliminado: false
        })
        localStorage.setItem('TODO',JSON.stringify(listaTareas))
        id++
        inpunt.value=''
    }
})

document.addEventListener('keyup',(event)=>{
    if (event.key==='Enter'){
        const tarea = inpunt.value
        if(tarea){
            agregarTarea(tarea,id,false,false)
            listaTareas.push({
                nombre: tarea,
                id: id,
                realizado: false,
                eliminado: false
            })
            localStorage.setItem('TODO',JSON.stringify(listaTareas))
            id++
            inpunt.value=''
        }
    }

})

const cargarLista=tareas =>{
    tareas.forEach((tareas)=>{
        agregarTarea(tarea.nombre,tarea.id,tarea.realizado,tarea.eliminado)
    })
}

lista.addEventListener('click',(event)=>{
    const element = event.target
    const elementData = element.attributes.data.value
    if(elementData==='realizado'){
        tareaRealizada(element)
    } else if (elementData === 'eliminado'){
        tareaEliminada(element)
    }
    localStorage.setItem('TODO', JSON.stringify(listaTareas))
})

let data=localStorage.getItem('TODO')
if (data){
    listaTareas=JSON.parse(data)
    id=listaTareas.length
    cargarLista(listaTareas)
} else {
    listaTareas=[]
    id = 0
}