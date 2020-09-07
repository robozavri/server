import config from '../config/environment';
import { send } from '../helpers/mailer';
import logger from '../helpers/logger';

export function handleAppErrors() {
  process.on('uncaughtException', handleError);
  process.on('unhandledRejection', handleError);
}

function handleError(err: any) {
  const content = `Uncaught Error! - ${JSON.stringify(err.stack || err)}`;

  logger.error(content);

  if (config.env === 'production') {
    send({
      email: 'lucymailertest@gmail.com',
      content,
      subject: `${config.url.host} - Uncaught Exception`,
    });
  } else {
    process.exit(1);
  }
}
