import sgMail from '@sendgrid/mail';
import nodemailer from 'nodemailer';
import { SENDGRID_API_KEY, MAIL_USERNAME, MAIL_PASSWORD } from '../env';


const transporter = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: MAIL_USERNAME,
    pass: MAIL_PASSWORD,
  },
});

// using mailtrap for development

export const sendMailDev = async ({
  email, subject, html, text
}) => {
  let error = null;
  const data = {
    from: '"Music App" <support@nusicApp.com>',
    to: 'no-reply@musicApp.com',
    bcc: email,
    subject,
    html,
    text,
  };
  try {
    await transporter.sendMail(data);
  } catch (err) {
    error = err.message;
  }
  return { error };
};

// use sendgrid for production

export const sendMail = async ({
  email, text, html, subject
}) => {
  sgMail.setApiKey(SENDGRID_API_KEY);
  const msg = {
    to: email,
    from: '"Music App" <support@nusicApp.com>',
    subject,
    text,
    html,
  };
  sgMail.send(msg, (err) => {
    let error = null;
    if (err) {
      error = err.message;
    }
    return { error };
  });
};
