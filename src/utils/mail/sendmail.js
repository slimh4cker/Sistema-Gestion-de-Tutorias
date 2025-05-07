import nodemailer from 'nodemailer';

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

export async function sendMail(mailOptions) {
  return new Promise((resolve, reject) => {
    const mail_configs = {
      from: process.env.EMAIL_USER,
      to: 'al22760549@ite.edu.mx',
      subject: 'Asunto del correo',
      text: "prueba lol",
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

console.log("FUNCION DE CORREO NO IMPLEMENTADA")
await sendMail("mailOptions")