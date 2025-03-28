import { AsesorModel } from "../src/models/AmazonRDS/AsesorModel.js";
import { AlumnoModel } from "../src/models/AmazonRDS/AlumnoModel.js";
import { ContenidoModel } from "../src/models/AmazonRDS/ContenidoModel.js";
import { ReportesModel } from "../src/models/AmazonRDS/ReportesModel.js";
import { SolicitudModel } from "../src/models/AmazonRDS/SolicitudModel.js";
import { AsesoriaModel } from "../src/models/AmazonRDS/AsesoriaModel.js";

class PruebasAlumnos{
    // Obtiene un alumno por su correo
    static async obtener_alumno(datos){
        const alumno = await AlumnoModel.getAlumnoByMail(datos.email)
        console.log(alumno)
    }

    // Agrega un alumno a la base de datos
    static async agregar_alumno(datos){
        const alumno = await AlumnoModel.createAlumno(datos)
        console.log(alumno)
    }

    // Actualiza un alumno en la base de datos
    static async actualizar_alumno(datos){
        const alumno = await AlumnoModel.updateAlumno(datos)
        console.log(alumno)
        console.log("Cuenta actualizada correctamente")
    }
    // Dar de baja a un alumno
    static async borrar_alumno(datos){
        const alumno = await AlumnoModel.deleteAlumno(datos)
        console.log(alumno)
        console.log("Cuenta dada de baja correctamente")
    }
}

class PruebasAsesores{
    static async obtener_asesor(datos){
        const asesor = await AsesorModel.getAsesorByMail(datos)
        console.log(asesor)
    }
    static async agregar_asesor(datos){
        const asesor = await AsesorModel.createAsesor(datos)
        console.log(asesor)
    }
    static async actualizar_asesor(datos){
        const asesor = await AsesorModel.updateAsesor(datos)
        console.log(asesor)
        console.log("Cuenta actualizada correctamente")
    }
    static async borrar_asesor(datos){      
        const asesor = await AsesorModel.deleteAsesor(datos)
        console.log(asesor)
        console.log("Cuenta dada de baja correctamente")
    }   
}

class PruebasContenidos {
    static async obtener_contenido(datos){
        const contenido = await ContenidoModel.getContenidoById(datos)
        console.log(contenido)
    }
    static async crear_contenido(datos){
        const contenido = await ContenidoModel.createContenido(datos)
        console.log(contenido)
    }
    static async actualiza_contenido(datos){
        const contenido = await ContenidoModel.updateContenido(datos)
        console.log(contenido)
    }
}

class PruebasReportes {
    static async buscar_reporte(datos){
        const reporte = await ReportesModel.getReporteById(datos)
        console.log(reporte)
    }

    static async crear_reporte(datos){
        const reporte = await ReportesModel.createReporte(datos)
        console.log(reporte)
    }
}

class PruebasSolicitudes {
    static async obtener_solicitud(datos){
        const solicitud = SolicitudModel.buscarSolicitudByID(datos.estudiante_id)
        console.log(solicitud)
    }

    static async crear_solicitud(datos){
        const solicitud = await SolicitudModel.agregarSolicitud(datos)
        console.log(solicitud)
    }
}

class PruebasAsesorias {
    static async crear_asesoria(datos){
        const asesoria = await AsesoriaModel.crearAsesoria(datos)
        console.log(asesoria)
    }
    static async obtener_asesoria(email){
        const asesoria = await AsesoriaModel.getAseoriaByAlumnoEmail(email)
        console.log(asesoria)
    }
}

/* PruebasAlumnos.obtener_alumno({"nombre": "Juan Perez",
    "email": "jorge.sanchez@example.com",
    "telefono": "1234567890",
    "matricula": "01234567",
    "password": "miPassword33",
    'estado': 'activo'}); */

/* PruebasAlumnos.agregar_alumno({
    "nombre": "Brandon Vincenso",
    "email": "al22760575@marialuisa.com",
    "password": "brandon12345"}) */

/*     PruebasAlumnos.actualizar_alumno({
    "email": "al22760575@marialuisa.com",
    "password": "0987654321"
    }) */

/* PruebasAlumnos.borrar_alumno({
    "nombre": "Luis Rámirez",
    "email": "jorge.sanchez@example.com",
}) */

/* PruebasAsesores.obtener_asesor({
  "email": "carlos.ramirez@example.com",
}) */

 /*  PruebasAsesores.agregar_asesor({
    "id": 5,
  "nombre": "Carlos Ramírez",
  "email": "carlos.ramirez@example.com",
  "password": "$2b$10$EjemploDeHashContraseñaEncriptada",
  "area_especializacion": "Matemáticas Avanzadas",
  "disponibilidad": "Lunes a Viernes de 9:00 AM a 5:00 PM",
  "estado": "activo"
  }) */

/* PruebasContenidos.obtener_contenido(1) */

/* PruebasContenidos.crear_contenido({
    asesor_id: "2",
    titulo: "biologia marina",
    descripcion: "Como se relacionan los seres acuaticos",
    url_video: "https://www.youtube.com/watch?v=IUyozpuSUIk",
    fecha_subida: "2025-03-25 14:12:12",
}) */

/* PruebasContenidos.actualiza_contenido({
    id: 2, 
    asesor_id: "2",
    titulo: "No es más que basura marina",
    descripcion: "Como se relacionan los seres acuaticos",
    url_video: "https://www.youtube.com/watch?v=IUyozpuSUIk",
    fecha_subida: "2025-03-25 14:12:12",
}) */


/* PruebasReportes.crear_reporte({
    "titulo": "Reporte de Eficiencia de Asesorías",
    "descripcion": "Evaluación del tiempo de respuesta y resolución de asesorías.",
    "fecha_generacion": "2025-04-05T12:30:00",
    "total_asesorias": 200,
    "total_atendidas": 180,
    "total_pendientes": 20,
    "promedio_tiempo_respuesta": 2.2,
    "promedio_tiempo_resolucion": 5.0,
    "promedio_cumplimiento": 90.5,
    "total_horas_asesoria": 540.2,
    "filtro_fecha_inicio": "2025-02-01T00:00:00",
    "filtro_fecha_fin": "2025-04-01T23:59:59",
    "filtro_area_especializacion": "Biología",
    "filtro_asesor_id": 8,
    "estado": "activo"
}) */


/* PruebasReportes.buscar_reporte(3) */

/* PruebasSolicitudes.crear_solicitud({
"estudiante_id": '2',
    "asesor_id": '2',
    "tema": "Cálculo Multivariable",
    "observaciones": null,
    "fecha_limite": "2025-10-18",
    "modalidad": "presencial",
    "nivel_urgencia": "baja"
}) */

/* PruebasSolicitudes.obtener_solicitud({
    "estudiante_id": 1,
    "asesor_id": 2,
    "tema": "Ecuaciones Diferenciales",
    "observaciones": "ninguna",
    'fecha_limite': "2025-8-13",
    "modalidad": "presencial",
    "nivel_urgencia": "baja",
    "estado": "activo"
}) */

/*     PruebasAsesorias.crear_asesoria({
        solicitud_id: 1,
        estado: "asignada",
        fecha_creacion: "2025-05-24",
        fecha_atencion: "2025-06-01",
        hora_inicial: '12:00:00',
        hora_final: '13:07:01',
        horas_total: 2.3,
        porcentaje_cumplimiento: 78.00,
        require_sesiones: 1
    }) */

    PruebasAsesorias.obtener_asesoria({
        email: 'luis@estudiante.com'
    })