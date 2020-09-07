import mongoose from 'mongoose';
import config from './environment';
import logger from '../helpers/logger';
(<any>mongoose).Promise = Promise;

export async function connectDB() {
  await mongoose.connect(config.mongo.uri, config.mongo.options);
  logger.info(`MongoDB connected on ${config.mongo.uri}`);
}
