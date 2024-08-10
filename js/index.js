const fecha = document.getElementById('fecha');
const lista = document.getElementById('lista');
const input = document.querySelector('#input'); // Corregido de inpunt a input
const botonEnter = document.querySelector('#boton-enter');
const check = 'fa-check-circle';
const uncheck = 'fa-circle';
const lineThrough = 'line-through';
let listaTareas = [];
let id = 0; // Inicializado para evitar errores

const fechaActual = new Date();
fecha.innerHTML = fechaActual.toLocaleDateString('es-MX', {
    weekday: 'long',
    month: 'short', // Corregido 'short'
    day: 'numeric'
});

const agregarTarea = (tarea, id, realizado, eliminado) => {
    if (eliminado) {
        return;
    }

    const done = realizado ? check : uncheck;
    const line = realizado ? lineThrough : '';

    const task = `
        <li id="elemento">
            <i class="far ${done}" data-action="realizado" id="${id}"></i>
            <p class="text ${line}">
                ${tarea}
            </p>
            <i class="fas fa-trash" data-action="eliminado" id="${id}"></i>
        </li>
    `;

    lista.insertAdjacentHTML("beforeend", task);
};

const tareaRealizada = (element) => {
    element.classList.toggle(check);
    element.classList.toggle(uncheck);
    element.parentNode.querySelector('.text').classList.toggle(lineThrough);
    listaTareas[element.id].realizado = !listaTareas[element.id].realizado;
};

const tareaEliminada = (element) => {
    element.parentNode.remove(); // Simplificado
    listaTareas[element.id].eliminado = true;
};

botonEnter.addEventListener('click', () => {
    const tarea = input.value; // Corregido de inpunt a input
    if (tarea) {
        agregarTarea(tarea, id, false, false);
        listaTareas.push({
            nombre: tarea,
            id: id,
            realizado: false,
            eliminado: false
        });
        localStorage.setItem('TODO', JSON.stringify(listaTareas));
        id++;
        input.value = ''; // Corregido de inpunt a input
    }
});

document.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        const tarea = input.value; // Corregido de inpunt a input
        if (tarea) {
            agregarTarea(tarea, id, false, false);
            listaTareas.push({
                nombre: tarea,
                id: id,
                realizado: false,
                eliminado: false
            });
            localStorage.setItem('TODO', JSON.stringify(listaTareas));
            id++;
            input.value = ''; // Corregido de inpunt a input
        }
    }
});

const cargarLista = (tareas) => {
    tareas.forEach((tarea) => {
        agregarTarea(tarea.nombre, tarea.id, tarea.realizado, tarea.eliminado);
    });
};

lista.addEventListener('click', (event) => {
    const element = event.target;
    const elementData = element.dataset.action; // Uso correcto del atributo data
    if (elementData === 'realizado') {
        tareaRealizada(element);
    } else if (elementData === 'eliminado') {
        tareaEliminada(element);
    }
    localStorage.setItem('TODO', JSON.stringify(listaTareas));
});

const data = localStorage.getItem('TODO');
if (data) {
    listaTareas = JSON.parse(data);
    id = listaTareas.length;
    cargarLista(listaTareas);
} else {
    listaTareas = [];
    id = 0;
}