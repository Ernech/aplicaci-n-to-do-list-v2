const Tarea = require('./tarea');

class Tareas {

    _listado = {};

    get listadoArr() {
        const listadoTareas = [];
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listadoTareas.push(tarea);
        });
        return listadoTareas;
    }

    constructor() {
        this._listado = {};
    }


    crearTarea(desc = '') {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    cargarTareasFromArray(tareas = []) {
        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        });
    }

    listadoCompleto() {
        console.log('');
        this.listadoArr.forEach((tarea, index) => {
            const idx = `${index+1}.`.green;
            const { desc, completadoEn } = tarea;
            const estado = (completadoEn) ? 'Completado'.green : 'Pendiente'.red;
            console.log(idx + ' ' + desc + ' :: ' + estado);
        });

    }
    listarCompletadasOPendientes(completadas = true) {
        console.log('');
        let cont = 1;
        this.listadoArr.forEach(tarea => {

            const { desc, completadoEn } = tarea;

            if (completadas) {
                if (completadoEn) {
                    console.log(`${cont.toString()}.`.green + ' ' + desc + ' :: ' + completadoEn.green);
                    cont++;
                }

            } else {
                if (!completadoEn) {
                    console.log(`${cont.toString()}.`.green + ' ' + desc);
                    cont++;
                }
            }

        });
        console.log('');
    }

    borrarTarea(id = '') {
        if (this._listado[id]) {
            delete this._listado[id];
        }

    }
    toggleCompletadas(ids = []) {
        ids.forEach(id => {
            const tarea = this._listado[id];
            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString();
            }
        });

        this.listadoArr.forEach(tarea => {
            if (!ids.includes(tarea.id)) {
                this._listado[tarea.id].completadoEn = null;

            }
        });
    }

}

module.exports = Tareas;