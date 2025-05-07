import nodemailer from 'nodemailer';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();

// como sera enviado el correo
// email y contraseña de la cuenta de gmail en el .env
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_HOST,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendMail(destinatario, plantilla, datos ) {
  return new Promise((resolve, reject) => {

    let cuerpo = "";
    let asunto = "Asunto";
    let html = "";

    // asignar el cuerpo y asunto segun la plantilla escrita
    switch (plantilla) {
      case "asesoriaAsignadaAlumno":
        html = fs.readFileSync('./src/utils/mail/plantillas/asesoriaAsignadaAlumno.html', 'utf8');
        if (datos.nombre_asesoria) html = html.replace('{{nombre_asesoria}}', datos.nombre_asesoria);
        if (datos.nombre_asesor) html = html.replace('{{nombre_asesor}}', datos.nombre_asesor);
        if (datos.fecha) html = html.replace('{{fecha}}', datos.fecha);
        if (datos.hora) html = html.replace('{{hora}}', datos.hora);
    
        cuerpo = html;
        asunto = "Su asesoría ha sido asignada correctamente";
        break;
    
      case "asesoriaAsignadaAsesor":
        html = fs.readFileSync('./src/utils/mail/plantillas/asesoriaAsignadaAsesor.html', 'utf8');
    
        if (datos.nombre_asesoria) html = html.replace('{{nombre_asesoria}}', datos.nombre_asesoria);
        if (datos.nombre_asesor) html = html.replace('{{nombre_asesor}}', datos.nombre_asesor);
        if (datos.nombre_alumno) html = html.replace('{{nombre_alumno}}', datos.nombre_alumno);
        if (datos.fecha) html = html.replace('{{fecha}}', datos.fecha);
        if (datos.hora) html = html.replace('{{hora}}', datos.hora);
    
        cuerpo = html;
        asunto = "Se le ha asignado una asesoría";
        break;
      default:
        console.error(`No se ha encontrado la plantilla de correo ${plantilla}`);
        return;
    }
    

    let mail_configs = {
      from: process.env.EMAIL_USER,
      to: destinatario,
      subject: asunto,
      html: cuerpo,
    };

    transporter.sendMail(mail_configs, (error, info) => {
      if(error) {
        console.error('Error al enviar el correo:', error);
        return reject(error);
      } else {
        console.log('Correo enviado:', info.response);
        return resolve(info.response);
      }
    })
  })
}
