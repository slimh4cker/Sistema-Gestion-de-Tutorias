import { AsesorModel } from "../src/models/AmazonRDS/AsesorModel.js";
import { AlumnoModel } from "../src/models/AmazonRDS/AlumnoModel.js";

class Pruebas{
    static async obtener_alumno(datos){
        const alumno = await AlumnoModel.getAlumnoByMail(datos.email)
        console.log(alumno)
    }

    static async agregar_alumno(datos){
        const alumno = await AlumnoModel.createAlumno(datos)
        console.log(alumno)
    }

    static async actualizar_alumno(datos){
        const alumno = await AlumnoModel.updateAlumno(datos)
        console.log(alumno)
        console.log("Cuenta actualizada correctamente")
    }
}

/* Pruebas.obtener_alumno({"nombre": "Juan Perez",
    "email": "jorge.sanchez@example.com",
    "telefono": "1234567890",
    "matricula": "01234567",
    "password": "miPassword33"}); */

/* Pruebas.agregar_alumno({
    "nombre": "Brandon Vincenso",
    "email": "al22760575@marialuisa.com",
    "password": "brandon12345"}) */

    Pruebas.actualizar_alumno({
    "email": "al22760575@marialuisa.com",
    "password": "0987654321"
    })