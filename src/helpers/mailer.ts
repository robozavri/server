import * as nodemailer from 'nodemailer';
import config from '../config/environment';
import logger from '../helpers/logger';

let transporter: any = undefined;

export async function initMailer() {
  transporter = nodemailer.createTransport({
    service: config.company.email.service,
    auth: {
      user: config.company.email.user,
      pass: config.company.email.password,
    },
  });

  try {
    await transporter.verify();
    logger.info(`Mailer ${config.company.email.user} verified`);
  } catch (error) {
    logger.error('Verify email error: ' + error);
  }
}

export function send(data: any) {
  return transporter.sendMail({
    from: config.company.email.user,
    to: data.email,
    text: data.content,
    subject: data.subject,
  }).catch(handleError);
}

export function sendHtml(data: any) {
  return transporter.sendMail({
    from: config.company.email.user,
    to: data.email,
    html: data.content,
    subject: data.subject,
    attachments: data.attachments,
  }).catch(handleError);
}

function handleError(error: any) {
  logger.error('Failed to send email', error);
}