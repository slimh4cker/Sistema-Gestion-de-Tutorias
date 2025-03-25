import { modelo_cuenta_estudiante } from "../src/models/AmazonRDS/Modelo_cuentas.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const registrarEstudiante = async (req, res) => {
    try {
      const { nombre, email, password } = req.body;
      const existe = await modelo_cuenta_estudiante.findOne({ where: { email } });
      if (existe) return res.status(400).json({ error: 'Email ya registrado' });
  
      const estudiante = await modelo_cuenta_estudiante.create({ nombre, email, password });
      const token = jwt.sign(
        { id: estudiante.id, role: 'estudiante' },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
  
      const { password: _, ...usuarioSeguro } = estudiante.get();
      res.status(201).json({ token, usuario: usuarioSeguro });
    } catch (error) {
      res.status(500).json({ error: 'Error al registrar estudiante' });
    }
  };
  
  export const loginEstudiante = async (req, res) => {
    try {
      const { email, password } = req.body;
      const estudiante = await modelo_cuenta_estudiante.findOne({ where: { email } });
  
      if (!estudiante || !(await bcrypt.compare(password, estudiante.password))) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }
  
      const token = jwt.sign(
        { id: estudiante.id, role: 'estudiante' },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
  
      const { password: _, ...usuarioSeguro } = estudiante.get();
      res.json({ token, usuario: usuarioSeguro });
    } catch (error) {
      res.status(500).json({ error: 'Error en el login' });
    }
  };
  