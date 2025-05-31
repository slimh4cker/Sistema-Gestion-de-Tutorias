import { modelo_cuenta_estudiante } from "./Modelo_cuentas.js";
import { hashPassword } from '../../utils/security.js';

// Clase del alumno encargada de interactuar con la base de datos

export class AlumnoModel{
    // Metodo para obtener un alumno por su correo
    /**
     * 
     * @param {String} email 
     * @returns {JSON}
     * @example
     * AlumnoModel.getAlumnoByMail("email@example.com")
     */
    static async getAlumnoByMail(email) {

        const correo_alumno = await modelo_cuenta_estudiante.findOne({
            where: { email, estado: 'activo' }
        });
        
        if (!correo_alumno) {
            return null;
        }
        
        return correo_alumno.dataValues;
    }

    static async getAlumnoById(id) {
        const alumno = await modelo_cuenta_estudiante.findOne({
            where: { id, estado: 'activo' }
        });
        
        if (!alumno) {
            return null;
        }
        return alumno.dataValues
    }
    /**
     * 
     * @param {JSON} datosALumno 
     * @returns {JSON}
     * @description Crea el registro de un alumno
     * @example
     * AlumnoModel.createAlumno({
     * nombre: "John Doe",
     * email: "email@example.com",
     * password: "contraseña1234",
     * })
     */
    static async createAlumno(datos) {
        let crear_alumno
        try {
            const alumno = await modelo_cuenta_estudiante.findOne({
                where: {
                    email: datos.email
                }
            })
            if(alumno === null){
                const hashedPassword = await hashPassword(datos.password, 10);
                crear_alumno = await modelo_cuenta_estudiante.create({
                    ...datos,
                    password: hashedPassword,
                });
                return crear_alumno
            }
            else if (alumno.dataValues.estado === 'inactivo'){
                return this.reactivarAlumno(datos)
            }
            else if(alumno.dataValues.estado === 'activo'){
                return null
            }
        }
        catch(error){

        }
        return crear_alumno.dataValues
    }
    /**
     * 
     * @param {*} datos datos que desean ser modificados
     * @param {*} emailOriginal email de la cuanta a modificar
     * @returns {Array} cantidad de filas modificadas
     */
    static async updateAlumno(emailOriginal, datos) {
  try {
    // Buscar alumno por email
    const alumno = await modelo_cuenta_estudiante.findOne({
      where: { email: emailOriginal }
    });


    if (!alumno) {
      return null;
    }

    // Extraer password y el resto de datos
    const { password, ...otrosDatos } = datos;

    // Si se envió un nuevo password, se hashea
    if (password) {
      otrosDatos.password = await hashPassword(password, 10);
    }

    // Actualizar asesor con los datos restantes (incluyendo password si se actualizó)
    await alumno.update(otrosDatos);

    // Eliminar password antes de retornar los datos actualizados
    const { password: _, ...datosSeguros } = alumno.dataValues;

    return datosSeguros;
  } catch (error) {
    console.error("Error en updateAlumno:", error);
    return null;
  }
}

    /**
     * Desactiva la cuenta del asesor
     * @param {String} email 
     * @returns {boolean}
     */
    static async deleteAsesor(email){
        const deleteAsesor = await modelo_cuenta_asesor.update({estado: 2},{
            where: {
                email: email
            }
        });
        return deleteAsesor.length > 0; // Si se elimino retorna true, si no retorna false
    }
    /**
     * 
     * @param {string } correo 
     * @returns {Array} cantidad de filas modificadas
     * @example
     * AlumnoModel.deleteAlumno("email@example.com")
     */
    static async deleteAlumno(correo) {
        const deleteAlumno = await modelo_cuenta_estudiante.update({estado: 'inactivo'},{
            where: {
                email: correo
            }
        })
        
        return deleteAlumno[0] > 0
    }
    static async reactivarAlumno (datos) {
        return await modelo_cuenta_estudiante.update({
            nombre: datos.nombre,
            password: datos.password,
            estado: 'activo'

        },
        {
            where: {
                email: datos.email

            }
        })
    }
}
