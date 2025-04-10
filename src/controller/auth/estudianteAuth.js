<<<<<<< HEAD
import { AlumnoModel } from "../../models/AmazonRDS/AdminModel.js";
import { registrarUsuario, iniciarSesion } from "../../utils/authUtils.js";
=======
import { AlumnoModel } from "../../models/AmazonRDS/AlumnoModel.js";
>>>>>>> 196d0a7e21340e0724814577b98f75680c7f77e6

export const registrarEstudiante = async (req, res) => {
  try {
    const { nombre, email, password, matricula } = req.body;
    
<<<<<<< HEAD
    const resultado = await registrarUsuario(
      AlumnoModel,
      { nombre, email, password, matricula },
      'estudiante'
    );
=======
    // Usamos el método del modelo
    const nuevoAlumno = await AlumnoModel.createAlumno({
      nombre,
      email,
      password,  // Asegúrate de que aquí ya venga hasheada
      matricula
    });

    if (!nuevoAlumno) {
      return res.status(400).json({
        error: "El correo ya está registrado"
      });
    }

    // Generar token (aquí deberías incluir tu lógica de token)
    const token = generarToken(nuevoAlumno); 
>>>>>>> 196d0a7e21340e0724814577b98f75680c7f77e6

    res.status(201).json({
      success: true,
      token: token,
      estudiante: nuevoAlumno
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

export const loginEstudiante = async (req, res) => {
  try {
    const { email, password } = req.body;
    
<<<<<<< HEAD
    const resultado = await iniciarSesion(
      AlumnoModel,
      email,
      password,
      'estudiante'
    );
=======
    // Buscamos al alumno usando el modelo
    const alumno = await AlumnoModel.getAlumnoByMail(email);
    
    if (!alumno) {
      return res.status(404).json({
        error: "Usuario no encontrado"
      });
    }

    // Verificar contraseña (debes comparar el hash)
    const passwordValida = await compararPassword(password, alumno.password);
    
    if (!passwordValida) {
      return res.status(401).json({
        error: "Contraseña incorrecta"
      });
    }

    // Generar token
    const token = generarToken(alumno);
>>>>>>> 196d0a7e21340e0724814577b98f75680c7f77e6

    res.json({
      success: true,
      token: token,
      estudiante: alumno
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};