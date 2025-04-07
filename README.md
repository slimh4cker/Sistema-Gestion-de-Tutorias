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
- **Bootstrap**: Framework de CSS para desarrollar interfaces de usuario responsivas y modernas. Se instala ejecutando `npm install bootstrap`.

## testing
Para realizar pruebas en el servidor se pueden utilizar los scripts para pruebas como esta escrito en esa seccion de este documento.
Ademas de esto, para probar las APIs se puede utilizar los documentos con la extencion .http con la extension CLIENT REST de visual studio para probar las APIs qu provee el servidor.

## Scripts
# Iniciar el servidor
  npm run start
este inicia el servidor completamente

# Iniciar en modo desarollo
  npm run dev
Este inicia el servidor sin embargo utiliza nodemon para actualizar el servidor cada vez que se actualiza algun archivo

# realizar pruebas
 npm run test
Este realiza todas las pruebas almacenadas bajo la carpeta test que terminen con.test.js

Ademas de este comando se puede probar estas partes de forma independiente con los siguientes comandos que especifican la parte especifica que probaran:
  npm run test:controlers
  npm run test:modelos
  npm run test:schemas

Cabe notar que para controlers y modelos se ha de iniciar primero el servidor sql para poder realizar las pruebas.
