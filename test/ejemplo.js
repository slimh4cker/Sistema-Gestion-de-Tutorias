import { modelo_cuenta_estudiante, modelo_cuenta_administrador, modelo_cuenta_asesor } from "../src/models/AmazonRDS/Modelo_cuentas.js";


try {
    const nuevaCuentaAsesor = await modelo_cuenta_asesor.create({
        nombre: "Salvador Laguna",
        email: "al22760563@ite.edu.mx",
        password: "slimh4acker",
        area_especializacion: "Ciberseguridad",
        disponibilidad: "Disponible",
    });
    console.log("Cuenta creada: ", nuevaCuentaAsesor.toJSON());
 } catch (error) {
        console.error("Error al crear la cuenta: ", error);
    }