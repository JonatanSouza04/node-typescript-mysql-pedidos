import ISendEmailRepository from '../repositories/ISendEmailRepository';
import nodemailer from 'nodemailer';

export default async function sendEmail(send: ISendEmailRepository){

    return await new Promise( async (resolve, _) => {

       try{  

         const config: any = {
                host: process.env.MAILTRAP_HOST,
                port: process.env.MAILTRAP_PORT,
                auth: {
                  user: process.env.MAILTRAP_USER,
                  pass: process.env.MAILTRAP_PASSWORD
                }
         }

          const transport = nodemailer.createTransport(config);

          transport.sendMail({
            from: 'Jonatan Souza <jonatan.souza04@gmail.com>',
            to: send.para,
            subject: send.assunto,
            html: send.mensagem,
            attachments: send.anexos
          });

          resolve(true);
        }catch(err){
            console.error(err);
            resolve(false);
        }
    });
}