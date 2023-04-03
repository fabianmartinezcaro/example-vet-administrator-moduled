import Citas from "./classes/Citas.js";
import UI from "./classes/UI.js"
import {mascotaInput, propietarioInput, telefonoInput, fechaInput, horaInput, sintomasInput, formulario} from "./selectores.js";
 
// INSTANCIAS
const ui = new UI()
const administrarCitas = new Citas();

let editando;

// Objeto cita
const objetoCita = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: '',
}

// FUNCIONES

// Leemos los datos del input
export function datosCita(evento){
    objetoCita[evento.target.name] = evento.target.value;
}

// Valida y agrega una nueva cita
export function agregarCita(evento){
    evento.preventDefault();
    // Extraemos los datos del objeto cita
    const {mascota, propietario, telefono, fecha, hora, sintomas} = objetoCita;

    if(mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === ''){
        ui.mostrarAlerta(formulario, 'Todos los campos son obligatorios', 'error');
        return;
    }

    if(editando){
        ui.mostrarAlerta(formulario, 'Editado correctamente', 'correcto')

        administrarCitas.editarCita({...objetoCita});

        // Regresa el texto del botón a su estado original
        formulario.querySelector('button[type="submit"]').textContent = 'Crear Cita';
        editando = false;
    }else{
        objetoCita.id = Date.now();

        // Agregamos una cita al objeto
        administrarCitas.nuevaCita({...objetoCita});
        ui.mostrarAlerta(formulario, 'Cita agregada correctamente', 'correcto')
    }

    ui.limpiarHTML();

    // Mostrar el html
    
    ui.mostrarCitas(administrarCitas);

    // Reiniciamos el objeto
    reiniciarObjeto();
    formulario.reset();

}


export function eliminarCita(id){

    ui.limpiarHTML();

    administrarCitas.borrarCita(id);

    ui.mostrarCitas(administrarCitas);

}


export function cargarEdicion(cita){
    console.log(cita)

    const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;

    // Colocamos los valores de la cita en los inputs
    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;

    // Llenamos el objeto global
    objetoCita.mascota = mascota;
    objetoCita.propietario = propietario;
    objetoCita.telefono = telefono;
    objetoCita.fecha = fecha;
    objetoCita.hora = hora;
    objetoCita.sintomas = sintomas;
    objetoCita.id = id;

    formulario.querySelector('button[type="submit"]').textContent = 'Guardar Cambios';

    editando = true;

}


export function reiniciarObjeto(){

    objetoCita.mascota = '';
    objetoCita.propietario = '';
    objetoCita.telefono = '';
    objetoCita.fecha = '';
    objetoCita.hora = '';
    objetoCita.sintomas = '';

}
