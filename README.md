# Sistema-Gestion-de-Tutorias
Este proyecto tiene el fin de facilitar la asignacion de tutorias dentro del instituto tecnologico de ensenada, con este se pretende facilitar, digitalizar y automatizar este proceso.
En nuestro proecto se tienen 3 roles, los alumnos los cuales realizan peticiones de asesorias, los asesores los cuales imparten las asesorias, y los administradoers que asignan peticiones a asesores. Estos procesos se realizan en una paguina web y cuando se asignan asesorias se envia una notificacion mediante email a el alumno y asesor relacionados a esa peticion.

Para el funcionamiento de este se tiene el servidor y se tiene la parte de la paguina web, la paguina pide datos del servidor mediante multiples APIs y se mantiene la seguridad de este mediante JSON Web Tokens 

## Estructura del proyecto
### Archivos
La estructura de los archivos es la siguiente:
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

### Arquitectura
Se siguio una arquitectura MVC, donde las APIs funcionan como la vista. Ademas de esto en las rutas pertintentes se tienen de middlewares verificadores de web tokens y multples routers para simplificar el proyecto. 
Al seguir la arquitectura MVC el proyecto es muy modular y se pueden alterar los componentes o el comportamiento de estos sin requerir un cambio a la estructura gneral, por ejemplos epuede remplazar un modelo por otro si se quiere migrar la base de datos de ser local a ser en la nube.

### Despliegue
Este proyecto esta pensado para ser desplegado dentro de un servidor. No se opto por utilizar docker pues se facilita de esta forma manejar el servidor localmente por algun administrador o encargado, ademas la mayor ventaja de docker es la facil escalabilidad pero para el caso de uso del proyecto no se considera que crecera mucho pues estara limitado de alcanze a el instituto mismo.

Para la planeacion de este proyecto se considera que en la misma maquina se distribuya la API y la paguina web, sin embargo estos pueden ser manejados separadamente ajustando la direccion de las APIs.

Se cuenta con el servidor, la paguina web, los controladores y la base de datos, los 3 incluidos en el mismo sistema. La parte del backend no se conecta directamente con la paguina web, sino que el cliente recibe la paguina web y de esto realiza peticiones al servidor.
![Esquema de diagrama de arquitectura](https://github.com/user-attachments/assets/f0b3ba07-4f6c-418b-a41e-f67ffb7b592f)
Figura 2. Diagrama de despliegue del sistema

## Requisitos

Para ejecutar el sistema, necesitas tener instalado lo siguiente:

- **Node.js**: Es necesario para ejecutar el servidor y las dependencias del proyecto. Puedes descargarlo desde [aquí](https://nodejs.org/).
- **Bcryptjs**: Utilizado para la encriptación de contraseñas de los usuarios. Se instala ejecutando `npm install bcryptjs`.
- **Express**: Framework web para construir el servidor de la aplicación. Se instala ejecutando `npm install express`.
- **Sequelize**: ORM para manejar las interacciones con la base de datos de manera sencilla. Se instala ejecutando `npm install sequelize`.
- **Sequelize CLI**: Herramienta de línea de comandos para interactuar con Sequelize, como migraciones, modelos y más. Se instala ejecutando `npm install sequelize-cli`.
- **MySQL2**: Driver para conectarse a bases de datos MySQL desde Node.js. Se instala ejecutando `npm install mysql2`.
- **Bootstrap**: Framework de CSS para desarrollar interfaces de usuario responsivas y modernas. Se instala ejecutando `npm install bootstrap`.
- **CORS**: Middleware que permite habilitar solicitudes desde otros dominios. Se instala ejecutando `npm install cors`.
- **ZOD**: Librería para la validación de datos a través de esquemas. Se instala ejecutando `npm install zod`.
-  **dotenv**: Librería para cargar variables de entorno desde un archivo .env al process.env. Se instala ejecutando `npm install dotenv`.

## Testing
Para realizar pruebas en el servidor se pueden utilizar los scripts para pruebas como esta escrito en esa seccion de este documento.
Ademas de esto, para probar las APIs se puede utilizar los documentos con la extencion .http con la extension CLIENT REST de visual studio para probar las APIs qu provee el servidor.

## Instalacion
Esta seccion se centrara en la instalacion de los componenetes requeridos para poder correr el servidor de forma local. Para la publicacion de la paguina y el hosting de el servidor y la paguina
es preferible utilizar otras guias externas. Este proyecto utiliza npm y WAMP para su funcionamiento y se han de instalar, ademas se ha de configurar un archivo .env para la configuracion de puertos y de la base de
datos. La parte del proyecto para el cliente esta en la carpeta src/view/ .

### 1. Instalacion de proyecto
El proyecto esta publicado en https://github.com/slimh4cker/Sistema-Gestion-de-Tutorias.git , para clonarlo utilize git. Para instalar git vaya a https://git-scm.com/downloads e instale la version correspondiente
a su sistema operativo, en el instalador siga las instrucciones correspondientes para instalarlo, en caso de ser en windows agrege la variable de ambiente "git" correspondiente a donede este el ejecutable.

Para corroborar que se instalo correctamente ejecute el comando git -v donde se mostrara la version de git instalada.

Una vez instalado vaya a la carpeta donde desee instalar el proyecto y ejecute el siguiente comando:
  gh repo clone slimh4cker/Sistema-Gestion-de-Tutorias
Si le pide una cuenta de github acceda con esta, asegurese de que esta cuenta tenga acceso al repositorio teniendo permiso del propietario de este.

### 2. Instalacion de node y npm
Este proyecto utiliza Node y npm para las dependencias, para descargarlo dirigase a https://nodejs.org/ y descarge la version LTS. Una vez instalado ejecute el instalador y siga las instrucciones en pantalla, 
asegurese de agregar Node.js al PATH del sistema. Para verificar la instalacion ejecute los siguientes comandos, los cuales indican la version del programa.
  node -v

  npm -v

finalmente ejecute el comando   npm install   para instalar todas las dependencias del proyecto.

### 3. Instalacion de MySQL.
Para la realizacion de este proyecto se utilizo MySQL de WAMP, sin embargo solo con mysql funciona para los propositos de este programa.
Instale MySQL de https://dev.mysql.com/downloads/installer/ y ejecute el instalador, preste atencion a el puerto, el nombre del usuario raiz y la contrasenia de este.

Dentro de este cree la base de datos "asesorias" y de la forma que prefiera importe la base de datos desde el archivo asesorias.sql . Cabe notar que se puede cambiar el nombre de la base de datos si se altera de la forma apropiada el archivo .env

### 4. Configuracion de correo
Este proyecto utiliza gmail para enviar coreos para enviar notificaciones.
Para que esta parte del proyecto funcione se ha de tener una cuenta de gmail, dentro de esta cuenta se ha de generar una contraseña de aplicacion como es indicado en esta paguina: https://support.google.com/mail/answer/185833?hl=es-419
Esta clave se ha de configurar en el .env como se describe despues en este README, asegurese de que su correo pueda generar contraseñas de aplicacion.

### 5. Configurar archivo .env
El programa por default cuenta con varios parametros establecidos por default en caso de no tener un archivo .env  sin embargo se tienen varias variables para poder ser configuradas personalmente:

DB_NAME=      #nombre de la base de datos
DB_USER=      #nombre del usuario raiz
DB_PASS=      #contrasena del, usuario raiz
DB_HOST=      #host de la base ded atos
DB_PORT=      #puerto de la base de datos
DB_DIALECT=   #si utiliza mysql u otra base ded atos
DB_TIMEZONE=  #zona horaria

#para correo
EMAIL_HOST=  # correo desde el cual se notificara
EMAIL_PASS=  # contraseña del correo, si se utiliza google se ocupa utilizar una contraseña de aplicacion

#para tokens
JWT_SECRET= #clave con la que generar tokens

### 6. Creacion de Administradores
El proyecto cuenta con un administrador por defecto, sus credenciales son: {corre: juan@admin.com password: admin123}.
Ingrese a la paguina para hacer login, despues presione el boton que dice "Administradores" e ingrese las credenciales.
Una vez adentro de esto se ha de dirigir a la ventana "Agregar Admin" y entonces se agregan los usuarios que se requieran para manejar el sistema.

## Scripts
### Iniciar el servidor
  npm run start
Este inicia el servidor completamente

### Iniciar en modo desarollo
  npm run dev
Este inicia el servidor sin embargo utiliza nodemon para actualizar el servidor cada vez que se actualiza algun archivo

### Realizar pruebas
 npm run test
Este realiza todas las pruebas almacenadas bajo la carpeta test que terminen con.test.js

Ademas de este comando se puede probar estas partes de forma independiente con los siguientes comandos que especifican la parte especifica que probaran:
  npm run test:controlers
  npm run test:modelos
  npm run test:schemas

Cabe notar que para controlers y modelos se ha de iniciar primero el servidor sql para poder realizar las pruebas.

## Manuales

- Manual de Usuario: https://docs.google.com/document/d/1v5N1bBVqzyfu71PtVIzkythhiYPpSTTuCkDBqb6bX5A/edit?usp=drive_link
- Manual Tecnico: https://docs.google.com/document/d/1Un6ONxT1LbLohSMlB8PGMq2-evtZOCSjo4u6yS-ZurU/edit?usp=drive_link

## Integrantes del equipo

A continuación se listan los integrantes del equipo de desarrollo del proyecto **Sistema de Gestión de Tutorías**:

- **Barragan Muñoz Andres Salvador**
- **Bermejo Venegas Brandon Vincenzo**
- **Laguna Bernal Salvador**
- **Montelongo Ramirez Alexia Ismeray**
- **Soto Flores Diego Francisco**
