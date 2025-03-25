import { modelo_cuenta_asesor } from "../src/models/AmazonRDS/Modelo_cuentas.js";
import { registrarUsuario, iniciarSesion } from "../src/utils/authUtils.js";

export const registrarAsesor = async (req, res) => {
  try {
    const { nombre, email, password, area_especializacion } = req.body;
    
    const resultado = await registrarUsuario(
      modelo_cuenta_asesor,
      { nombre, email, password, area_especializacion },
      'asesor'
    );

    res.status(201).json({
      success: true,
      token: resultado.token,
      asesor: resultado.usuario
    });

  } catch (error) {
    res.status(error.code).json({
      error: error.message
    });
  }
};

export const loginAsesor = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const resultado = await iniciarSesion(
      modelo_cuenta_asesor,
      email,
      password,
      'asesor'
    );

    res.json({
      success: true,
      token: resultado.token,
      asesor: resultado.usuario
    });

  } catch (error) {
    res.status(error.code).json({
      error: error.message
    });
  }
};