'use strict';

import * as mailer from '../../helpers/mailer';


export function sendClientMessage(adminEmail: any, payload: any) {
  const content = `
    <p> Name: ${payload.name} </p>
    <p>Email: ${payload.email}</p>
    <p>Message: ${payload.message}</p>
  `;

  // const subject = `New Message`;
  const subject = `Client Message: ${payload.subject}`;
  mailer.sendHtml({ email: adminEmail, subject, content });
}