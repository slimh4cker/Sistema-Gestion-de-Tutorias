import { modelo_cuenta_administrador } from "./Modelo_cuentas.js";
import { hashPassword } from '../../utils/security.js';

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
        try {
            const admin = await modelo_cuenta_administrador.findOne({
                where: { email: datos.email }
            });
    
            if (!admin) {
                const hashedPassword = await hashPassword(datos.password, 10);
                const crear_admin = await modelo_cuenta_administrador.create({
                    ...datos,
                    password: hashedPassword,
                });
                console.log("Admin agregado correctamente");
                return crear_admin.dataValues;
            }
    
            if (admin.dataValues.estado === "inactivo") {
                await modelo_cuenta_administrador.update({
                    nombre: datos.nombre,
                    password: hashPassword(datos.password, 10),
                    estado: "activo"
                }, {
                    where: { email: datos.email }
                });
    
                const actualizado = await modelo_cuenta_administrador.findOne({ where: { email: datos.email } });
                return actualizado.dataValues;
            }
    
            if (admin.dataValues.estado === "activo") {
                console.log("Ya existe un Administrador registrado con ese correo electrónico");
                return null;
            }
    
        } catch (error) {
            console.error("Error al crear admin:", error);
            throw error;
        }
    }
    
    
    static async updateAdmin(datos, emailOriginal) {
  try {
    // Buscar admin por email
    const admin = await modelo_cuenta_administrador.findOne({
      where: { email: emailOriginal }
    });

    if (!admin) {
      return null;
    }

    // Extraer password y el resto de datos
    const { password, ...otrosDatos } = datos;

    // Si se envió un nuevo password, se hashea
    if (password) {
      otrosDatos.password = await hashPassword(password, 10);
    }

    // Actualizar admin con los datos restantes (incluyendo password si se actualizó)
    await admin.update(otrosDatos);

    // Eliminar password antes de retornar los datos actualizados
    const { password: _, ...datosSeguros } = admin.dataValues;

    return datosSeguros;
  } catch (error) {
    console.error("Error en updateAdmin:", error);
    return null;
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
/* AdminModel.updateAdmin({password:"brandon123"}, "maria@admin.com") */