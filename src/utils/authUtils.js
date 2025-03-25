import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const registrarUsuario = async (modelo, datosUsuario, rol) => {
  try {
    const usuarioExistente = await modelo.findOne({ 
      where: { email: datosUsuario.email } 
    });
    
    if (usuarioExistente) {
      throw { code: 400, message: 'El correo ya está registrado' };
    }

    // Hashear contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(datosUsuario.password, salt);
    
    const nuevoUsuario = await modelo.create({
      ...datosUsuario,
      password: hashedPassword
    });

    const token = generarToken(nuevoUsuario.id, rol);

    // Excluir campos sensibles
    const usuarioSafe = excluirCampos(nuevoUsuario.get(), ['password']);

    return { usuario: usuarioSafe, token };
    
  } catch (error) {
    throw { 
      code: error.code || 500, 
      message: error.message || 'Error al registrar usuario' 
    };
  }
};


export const iniciarSesion = async (modelo, email, password, rol) => {
  try {
    // Buscar usuario
    const usuario = await modelo.findOne({ where: { email } });
    if (!usuario) {
      throw { code: 401, message: 'Credenciales inválidas' };
    }

    // Validar contraseña
    const passwordValida = await bcrypt.compare(password, usuario.password);
    if (!passwordValida) {
      throw { code: 401, message: 'Credenciales inválidas' };
    }

    // Generar token
    const token = generarToken(usuario.id, rol);

    // Excluir campos sensibles
    const usuarioSafe = excluirCampos(usuario.get(), ['password']);

    return { usuario: usuarioSafe, token };

  } catch (error) {
    throw { 
      code: error.code || 500, 
      message: error.message || 'Error en el login' 
    };
  }
};

// Función para generar tokens JWT
const generarToken = (userId, role) => {
  return jwt.sign(
    { id: userId, role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};

// Función para excluir campos de un objeto
const excluirCampos = (objeto, campos) => {
  return Object.fromEntries(
    Object.entries(objeto).filter(([key]) => !campos.includes(key))
  );
};