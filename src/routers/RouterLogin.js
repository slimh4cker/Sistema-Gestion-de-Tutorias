router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      
      // Lógica para validar credenciales en DB (ejemplo)
      const usuario = await modelo_cuenta_estudiante.findOne({ 
        where: { email },
        attributes: ['id', 'password'] 
      });
  
      if (!usuario || !compararPassword(password, usuario.password)) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }
  
      const token = generarToken(usuario);
      
      res.json({ 
        token,
        user: { id: usuario.id}
      });
  
    } catch (error) {
      res.status(500).json({ error: 'Error en el login' });
    }
  });