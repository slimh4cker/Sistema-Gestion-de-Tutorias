import { modelo_cuenta_administrador } from "../models/Modelo_cuentas.js";
import { registrarUsuario, iniciarSesion } from "../src/utils/authUtils.js";

export const registrarAdministrador = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;
    
    const resultado = await registrarUsuario(
      modelo_cuenta_administrador,
      { nombre, email, password },
      'administrador'
    );

    res.status(201).json({
      success: true,
      token: resultado.token,
      administrador: resultado.usuario
    });

  } catch (error) {
    res.status(error.code).json({ error: error.message });
  }
};

export const loginAdministrador = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const resultado = await iniciarSesion(
      modelo_cuenta_administrador,
      email,
      password,
      'administrador'
    );

    res.json({
      success: true,
      token: resultado.token,
      administrador: resultado.usuario
    });

  } catch (error) {
    res.status(error.code).json({ error: error.message });
  }
};