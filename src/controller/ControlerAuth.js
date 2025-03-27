const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const { Alumno, Asesor, Administrador } = require('../models');

// Función genérica para registrar cualquier tipo de usuario
const registrarUsuario = async (req, res, Modelo, camposEspecificos) => {
  try {
    const { email, password } = req.body;
    
    // Verificar si el email ya existe
    const existeUsuario = await Modelo.findOne({ where: { email } });
    if (existeUsuario) {
      return res.status(400).json({ error: 'El correo ya está registrado' });
    }

    // Hash de contraseña
    const hash = await bcrypt.hash(password, 12);

    // Crear usuario
    const nuevoUsuario = await Modelo.create({
      email,
      password: hash,
      ...camposEspecificos
    });

    // Generar token
    const token = jwt.sign(
      { id: nuevoUsuario.id, role: Modelo.name.toLowerCase() },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Omitir contraseña en la respuesta
    const { password: _, ...usuarioSinPassword } = nuevoUsuario.get();

    res.status(201).json({
      success: true,
      token,
      usuario: usuarioSinPassword
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
};

// Métodos específicos para cada rol
const registroAlumno = async (req, res) => {
  const campos = {
    nombre: req.body.nombre,
    curso: req.body.curso,
    matricula: req.body.matricula
  };
  await registrarUsuario(req, res, Alumno, campos);
};

const registroAsesor = async (req, res) => {
  const campos = {
    nombre: req.body.nombre,
    especialidad: req.body.especialidad
  };
  await registrarUsuario(req, res, Asesor, campos);
};

const registroAdministrador = async (req, res) => {
  const campos = { nombre: req.body.nombre };
  await registrarUsuario(req, res, Administrador, campos);
};

// Login para todos los roles
const login = async (req, res) => {
  const { email, password, role } = req.body;
  
  try {
    // Seleccionar modelo según rol
    const modelos = {
      alumno: Alumno,
      asesor: Asesor,
      administrador: Administrador
    };

    if (!modelos[role]) {
      return res.status(400).json({ error: 'Rol no válido' });
    }

    // Buscar usuario
    const usuario = await modelos[role].findOne({ where: { email } });
    if (!usuario || !(await bcrypt.compare(password, usuario.password))) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Generar token
    const token = jwt.sign(
      { id: usuario.id, role, email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      success: true,
      token,
      role,
      nombre: usuario.nombre
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

module.exports = {
  registroAlumno,
  registroAsesor,
  registroAdministrador,
  login
};