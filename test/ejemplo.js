import {modelo_cuenta_asesor} from "../src/models/AmazonRDS/Modelo_cuentas.js"
import { modelo_contenido_apoyo } from "../src/models/AmazonRDS/Modelo_datos.js";

const select_asesor = await modelo_cuenta_asesor.findAll({
    where:{
        nombre: 'Carlos López'
    }},);
select_asesor.every(select_asesor => select_asesor instanceof modelo_cuenta_asesor)
console.log('Todos los asesores: ', JSON.stringify(select_asesor, null, 2));