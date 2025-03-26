import { AsesorModel } from "../src/models/AmazonRDS/AsesorModel.js";

const obtener_asesor = AsesorModel.deleteAsesor({email: "carlos@example.com"}).then((asesores) => {
    console.log(asesores);
})

