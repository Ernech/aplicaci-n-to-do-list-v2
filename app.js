const { guardarDB, leerDb } = require('./helpers/guardarArchivo');
const { inquireMenu, pausa, leerInput, listadoTareasBorrar, confirmarBorrado, mostrarListadoChecklist } = require('./helpers/inquire');
const Tareas = require('./models/tareas');

require('colors');



const main = async() => {
    console.log('Hola Mundo');
    let opt = '';

    const tareas = new Tareas();
    const tareasDB = leerDb();
    if (tareasDB) {
        tareas.cargarTareasFromArray(tareasDB);
    }
    do {
        opt = await inquireMenu();
        switch (opt) {
            case '1':
                const desc = await leerInput('Descripción de la tarea:');
                tareas.crearTarea(desc);
                break;
            case '2':
                tareas.listadoCompleto();
                break;
            case '3':
                tareas.listarCompletadasOPendientes(true);
                break;
            case '4':
                tareas.listarCompletadasOPendientes(false);
                break;
            case '5':
                const ids = await mostrarListadoChecklist(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
                break;
            case '6':
                const id = await listadoTareasBorrar(tareas.listadoArr);
                if (id !== '0') {
                    const ok = await confirmarBorrado('¿Está seguro?');
                    if (ok) {
                        tareas.borrarTarea(id);
                        console.log('Tarea Borrada'.yellow);
                    }
                }

                break;
        }
        guardarDB(tareas.listadoArr);
        await pausa();
    } while (opt !== '0');

}

main();