import { sendHtml } from '../../helpers/mailer';
import config from '../../config/environment';

export function emailActivateUser(data: any) {
  return sendHtml({
    email: data.email,
    content: `
      <p>ელ. ფოსტის გასააქტიურებლად გადადით <a href="${config.url.scheme}://${config.url.api}/api/users/activate/${data.activationToken}">ლინკზე</a> </p>
      <p>თუ თქვენ არ გაგივლიათ რეგისტრაცია Core-ზე უგულებელყავით ეს შეტყობინება</p>
    `,
    subject: 'Core - activation',
  });
}

export function emailRecoverPassword(data: any) {
  return sendHtml({
    email: data.email,
    content: `
      <p>პაროლის განახლებისთვის გადადით შემდეგ ლინკზე: <a href="${config.url.scheme}://${config.url.host}/reset-password?email=${data.email}&token=${data.resetPassword.token}">reset password</a></p>
    `,
    subject: 'Core - Recover Passwrd',
  });
}
