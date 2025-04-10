import { modelo_cuenta_administrador } from "./Modelo_cuentas.js";

// Clase del alumno encargada de interactuar con la base de datos

export class AdminModel{
    // Metodo para obtener un alumno por su correo
    /**
     * 
     * @param {String} correo 
     * @returns {JSON} Retorna un JSON con los datos del Administrador solo si Existe y si
     * se encuentra activo, de lo contrario retorna null.
     * @description Busca un administrador por su correo electronico
     * @example
     * AdminModel.getAdminByMail("email@example.com")
     */
    static async getAdminByMail(correo) {
        try {
            const correo_admin = await modelo_cuenta_administrador.findOne({
                where: {
                    email: correo, // unicamente se necesita buscar por correo
                    estado: 1
                },
            })
            if (!correo_admin) {
                return false // Si no se encuentra el correo, retorna null
            }
            return correo_admin.dataValues // Retorna un JSON con los datos del alumno

        }
        catch (error) {
            console.error("Error al buscar el administrador por correo:", error)
            throw error
        }
        
    }

    /**
     * 
     * @param {JSON} datosAdministrador
     * @returns {JSON}
     * @description Crea el registro de un administrador
     * @example
     * AdminModel.createAdmin({
     * nombre: "John Doe",
     * email: "email@example.com",
     * password: "contraseña1234",
     * })
     */
    static async createAdmin(datos) {
        try{
            const admin = await modelo_cuenta_administrador.findOne({
                where: {
                    email: datos.email
                }
            })
            console.log(admin)
            if(admin.length === 0){
                const agregar_alumno = await modelo_cuenta_administrador.create(datos)
                console.log("Admin agregado correctamente")
                return agregar_alumno.dataValues
            }
            else if(admin.dataValues.estado === "inactivo"){
                return this.reactivarAdmin(datos)
            }
            else if(admin.dataValues.estado === "activo"){
                console.log("Ya existe un Administrador registrado con ese correo electronico");
                return false
            }
        }
        catch(error){
        }
    }
    /**
     * 
     * @param {JSON} datos datos que desean ser modificados
     * @param {String} emailOriginal email de la cuanta a modificar
     * @returns {Array} cantidad de filas modificadas
     */
    static async updateAdmin(datos, emailOriginal) {
        try {
            const adminExistente = await modelo_cuenta_administrador.findOne({
                where: {
                    email: datos.email
                }
            });
    
            // Si el correo ya existe, pero es del mismo admin que se está editando, se permite
            if (adminExistente && adminExistente.email !== emailOriginal) {
                console.log("Ya existe un correo asociado a otro administrador");
                return false;
            }
    
            // Si no existe o es el mismo admin, actualizamos
            const admin_update = await modelo_cuenta_administrador.update(datos, {
                where: {
                    email: emailOriginal
                }
            });
            console.log(admin_update)
    
            return admin_update[0] > 0 ;
    
        } catch (error) {
            console.error("Error al actualizar administrador:", error);
            throw error;
        }
    }
    

    /**
     * 
     * @param {string } correo 
     * @returns {boolean} 
     * @example
     * AlumnoModel.deleteAdmin("email@example.com")
     */
    static async deleteAdmin(correo){
        const delete_admin = await modelo_cuenta_administrador.update({estado: 2},{
            where: {
                email: correo
            }
        })
        console.log(delete_admin)
        return delete_admin[0] > 0 // Si se elimina retorna true, si no retorna false
        
    }

    static async reactivarAdmin(datos) {
        console.log("Correo reactivado Correctamente")
        return await modelo_cuenta_administrador.update({
            nombre: datos.nombre,
            password: datos.password,
            estado: 1
        },
        {
            where: {
                email: datos.email
            }
        })
    }
}