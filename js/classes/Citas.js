export default class Citas{
    constructor(){
        this.citas = [];
    }

    nuevaCita(cita){
        this.citas = [...this.citas, cita];
    }

    borrarCita(id){
        this.citas = this.citas.filter(cita => cita.id !== id);
    }

    editarCita(citaActualizada){
        this.citas = this.citas.map(cita => cita.id === citaActualizada.id ? citaActualizada : cita);
    }

}
