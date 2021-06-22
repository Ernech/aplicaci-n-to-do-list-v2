const inquier = require('inquirer');
require('colors');

const preguntas = [

    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer?',
        choices: [{
                value: '1',
                name: `${'1.'.green} Crear Tarea`
            },
            {
                value: '2',
                name: `${'2.'.green} Listar Tareas`
            },
            {
                value: '3',
                name: `${'3.'.green} Listar Tareas Completadas`
            },
            {
                value: '4',
                name: `${'4.'.green} Listar Tareas Pendientes`
            },
            {
                value: '5',
                name: `${'5.'.green} Completar Tarea(s)`
            },
            {
                value: '6',
                name: `${'6.'.green} Borrar Tareas`
            },
            {
                value: '0',
                name: `${'0.'.green} Salir`
            }
        ]
    }
];


const inquireMenu = async() => {
    console.clear();
    console.log("========================".green);
    console.log(" Seleccione una opción ".green);
    console.log("========================\n".green);

    const { opcion } = await inquier.prompt(preguntas);
    return opcion;
}
const pausa = async() => {
    const pausaAction = [{
        type: 'input',
        name: 'pause',
        message: `\nPresione ${'ENTER'.green} para continuar\n`,
    }]

    await inquier.prompt(pausaAction);
}

const leerInput = async(message) => {
    const question = [{
        type: 'inpiut',
        name: 'desc',
        message,
        validate(value) {
            if (value.length === 0) {
                return 'Por Favor ingrese un valor';
            }
            return true;

        }
    }]
    const { desc } = await inquier.prompt(question);
    return desc;
}
const listadoTareasBorrar = async(tareas = []) => {
    const choices = tareas.map((tarea, idx) => {
        const index = `${idx+1}.`.green;

        return {
            value: tarea.id,
            name: `${index} ${tarea.desc}`
        }

    });

    choices.unshift({
        value: '0',
        name: `${'0.'.green} Cancelar`
    });
    const preguntasBorrar = [{
        type: 'list',
        name: 'id',
        message: 'Borrar',
        choices
    }];
    const { id } = await inquier.prompt(preguntasBorrar);
    return id;
};

const confirmarBorrado = async msg => {
    const question = [{
        type: 'confirm',
        name: 'ok',
        message: msg
    }];
    const { ok } = await inquier.prompt(question);
    return ok;
}

const mostrarListadoChecklist = async(tareas = []) => {
    const choices = tareas.map((tarea, idx) => {
        const index = `${idx+1}.`.green;

        return {
            value: tarea.id,
            name: `${index} ${tarea.desc}`,
            checked: (tarea.completadoEn) ? true : false
        }

    });


    const pregunta = [{
        type: 'checkbox',
        name: 'ids',
        message: 'Seleccione',
        choices
    }];
    const { ids } = await inquier.prompt(pregunta);
    return ids;
};
module.exports = {
    inquireMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmarBorrado,
    mostrarListadoChecklist
}