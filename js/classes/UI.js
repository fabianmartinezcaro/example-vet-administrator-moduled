import { eliminarCita, cargarEdicion } from "../funciones.js";
import { contenedorCitas } from "../selectores.js";

export default class UI{

    mostrarCitas({citas}){

        console.log(citas)

        this.limpiarHTML();

        citas.forEach(cita => {

            const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;

            // DIV información
            const divCita = document.createElement('DIV');
            divCita.classList.add('cita','p-3');
            divCita.dataset.id = id; 

            // Información de la cita
            const parrafoMascota = document.createElement('h2');
            parrafoMascota.classList.add('card-title', 'font-weight-bolder');
            parrafoMascota.textContent = mascota;

            const parrafoPropietario = document.createElement('p');
            parrafoPropietario.innerHTML = `
                <span class="font-weight-bolder">Propietario:</span> ${propietario}
            `;

            const parrafoTelefono = document.createElement('p');
            parrafoTelefono.innerHTML = `
                <span class="font-weight-bolder">Teléfono:</span> ${telefono}
            `;

            const parrafoFecha = document.createElement('p');
            parrafoFecha.innerHTML = `
                <span class="font-weight-bolder">Fecha:</span> ${fecha}
            `;

            const parrafoHora = document.createElement('p');
            parrafoHora.innerHTML = `
                <span class="font-weight-bolder">Hora:</span> ${hora}
            `;

            const parrafoSintomas = document.createElement('p');
            parrafoSintomas.innerHTML = `
                <span class="font-weight-bolder">Síntomas:</span> ${sintomas}
            `;


            // Boton editar
            const botonEditar = document.createElement('a');
            botonEditar.classList.add('btn', 'btn-secondary', 'm-2');
            botonEditar.textContent = 'Editar';
            divCita.appendChild(botonEditar);
            botonEditar.onclick = () => {
                cargarEdicion(cita); // EDITAR
            }

            // Boton eliminar
            const botonEliminar = document.createElement('a');
            botonEliminar.classList.add('btn', 'btn-danger', 'text-white', 'm-2');
            botonEliminar.textContent = 'Eliminar';
            botonEliminar.onclick =  () => {
                eliminarCita(id); // ELIMINAR
            }

            // Incluímos la información en el div de la cita
            divCita.appendChild(parrafoMascota);
            divCita.appendChild(parrafoPropietario);
            divCita.appendChild(parrafoTelefono);
            divCita.appendChild(parrafoFecha);
            divCita.appendChild(parrafoHora);
            divCita.appendChild(parrafoSintomas);

            // Botones
            divCita.appendChild(botonEliminar);
            divCita.appendChild(botonEditar);

            contenedorCitas.appendChild(divCita);
            
        });
        
    }

    mostrarAlerta(contenedor, mensaje, tipo){

        const divAlerta = document.createElement('DIV');
        divAlerta.textContent = mensaje;
        let condicionCumplida = false;

        if(tipo === 'error'){
            divAlerta.classList.add('alert', 'alert-danger');
            contenedor.appendChild(divAlerta);
            condicionCumplida = true;
        }else if(tipo === 'correcto'){
            divAlerta.classList.add('alert', 'alert-success');
            contenedor.appendChild(divAlerta);
            condicionCumplida = true;
        }

        if(condicionCumplida){
            setTimeout(() => {
                divAlerta.remove();
            }, 3000);
        }

    }

    limpiarHTML(){
        while(contenedorCitas.firstChild){
            contenedorCitas.removeChild(contenedorCitas.firstChild);
        }
    }

}