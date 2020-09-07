import Express from 'express';
import logger from './helpers/logger';
import config from './config/environment';
import { connectDB } from './config/mongoose';
import { seedDB } from './config/seed';
import { initDirectories } from './config/fs-storage';
import { handleAppErrors } from './config/uncaught-error-handler';
import { initExpress } from './config/express';
import { initRoutes } from './routes';
import { initMailer } from './helpers/mailer';

export async function initServer() {
  initDirectories();
  handleAppErrors();
  await connectDB();
  await seedDB();
  const app = Express();
  const server = app.listen(config.port);
  initExpress(app);
  initRoutes(app);
  initMailer();
  logger.info(`Express server listening on ${config.port}, in ${config.env} mode`);
}

initServer();