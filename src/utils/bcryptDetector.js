async function detectarHash(cadena) {
  const patrones = {
    bcrypt: /^\$2[aby]\$\d{2}\$[./A-Za-z0-9]{53}$/,
    scrypt: /^\$s0\$[0-9]{1,2}\$[./A-Za-z0-9]{43}$/,
    argon2: /^\$argon2i\$v=19\$\d{1,2}\$[./A-Za-z0-9]{43}$/,
    argon2id: /^\$argon2id\$v=19\$\d{1,2}\$[./A-Za-z0-9]{43}$/,
    pbkdf2: /^\$pbkdf2-sha256\$[0-9]{1,2}\$[./A-Za-z0-9]{43}$/,
    sha256: /^[0-9a-f]{64}$/,
    sha512: /^[0-9a-f]{128}$/,
    md5: /^[0-9a-f]{32}$/,
    ripemd160: /^[0-9a-f]{40}$/,
    whirlpool: /^[0-9a-f]{128}$/,
    bcryptjs: /^\$2[aby]\$\d{2}\$[./A-Za-z0-9]{53}$/,
    argon2i: /^\$argon2i\$v=19\$\d{1,2}\$[./A-Za-z0-9]{43}$/,
  }
    for (const [nombre, patron] of Object.entries(patrones)) {
        if (patron.test(cadena)) {
        return nombre;
        }
    }
    return null //No se encontró un patrón coincide
}

export {detectarHash};
