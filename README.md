# Sistema-Gestion-de-Tutorias
Desarrollar un sistema de software que facilite la gestión y el seguimiento de las solicitudes de asesoría académica, optimizando la asignación de maestros asesores y mejorando la comunicación entre estudiantes, asesores y la administración.

## Estructura del proyecto

- Sistema-Gestion-de-Tutorias/
  - src/
    - controllers/
      - auth/
    - middlewares/
    - models/
      - AmazonRDS/
    - routers/
      - auth/
    - schemas/
      - users/
    - utils/
    - view/
      - frontend/
        - assets/
        - js/
        - styles/
  - test/
  - .gitignore
  - asesorias.sql
  - index.js
  - LICENSE
  - package-lock.json
  - package.json
  - README.md

## Requisitos

Para ejecutar el sistema, necesitas tener instalado lo siguiente:

- **Node.js**: Es necesario para ejecutar el servidor y las dependencias del proyecto. Puedes descargarlo desde [aquí](https://nodejs.org/).
- **Bcrypt**: Utilizado para la encriptación de contraseñas de los usuarios. Se instala ejecutando `npm install bcrypt`.
- **Express**: Framework web para construir el servidor de la aplicación. Se instala ejecutando `npm install express`.
- **Sequelize**: ORM para manejar las interacciones con la base de datos de manera sencilla. Se instala ejecutando `npm install sequelize`.
- **Sequelize CLI**: Herramienta de línea de comandos para interactuar con Sequelize, como migraciones, modelos y más. Se instala ejecutando `npm install sequelize-cli`.
- **MySQL2**: Driver para conectarse a bases de datos MySQL desde Node.js. Se instala ejecutando `npm install mysql2`.

