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
        console.log("[DEBUG] Buscando alumno con email:", email); // 👁️ Verifica el email recibido
        const correo_alumno = await modelo_cuenta_estudiante.findOne({
            where: { email, estado: 'activo' }
        });
        
        if (!correo_alumno) {
            console.log("[DEBUG] No se encontró alumno activo con ese email");
            return null;
        }
        
        console.log("[DEBUG] Alumno encontrado:", correo_alumno.dataValues); // 👁️ Verifica los datos
        return correo_alumno.dataValues;
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
                console.log(hashedPassword)
                crear_alumno = await modelo_cuenta_estudiante.create({
                    ...datos,
                    password: hashedPassword,
                });
                console.log("Alumno creado correctamente")
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
    static async updateAlumno(datos, emailOriginal) {
        try {
            const alumno = await modelo_cuenta_estudiante.findOne({
                where: { email: emailOriginal }
            });
    
            if (!alumno) {
                return null;
            }
    
            await alumno.update(datos); 
            const { password, ...datosSeguros } = alumno.dataValues;
            return datosSeguros;
    
        } catch (error) {
            console.error("Error en updateAlumno:", error);
            return null;
        }
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
        console.log("Correo reactivado Correctamente")
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