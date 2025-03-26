import { modelo_cuenta_estudiante } from "../../models/AmazonRDS/Modelo_cuentas.js";
import { registrarUsuario, iniciarSesion } from "../../utils/authUtils.js";

export const registrarEstudiante = async (req, res) => {
  try {
    const { nombre, email, password, matricula } = req.body;
    
    const resultado = await registrarUsuario(
      modelo_cuenta_estudiante,
      { nombre, email, password, matricula },
      'estudiante'
    );

    res.status(201).json({
      success: true,
      token: resultado.token,
      estudiante: resultado.usuario
    });

  } catch (error) {
    res.status(error.code).json({
      error: error.message
    });
  }
};

export const loginEstudiante = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const resultado = await iniciarSesion(
      modelo_cuenta_estudiante,
      email,
      password,
      'estudiante'
    );

    res.json({
      success: true,
      token: resultado.token,
      estudiante: resultado.usuario
    });

  } catch (error) {
    res.status(error.code).json({
      error: error.message
    });
  }
};