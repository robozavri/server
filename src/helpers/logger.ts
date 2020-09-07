import * as path from 'path';
import * as winston from 'winston';
import 'winston-mongodb';
import config from '../config/environment';

const filename = path.join(config.paths.log, `${config.env}.log`);

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.splat(),
    winston.format.json()
  ),
});

if (config.env === 'production') {
  logger.add(new winston.transports.File({ filename }));
  // @ts-ignore
  logger.add(new winston.transports.MongoDB({
    level: 'info',
    db: config.mongo.uri,
    collection: 'applogs',
    metaKey: 'meta',
  }));
  if (config.winstonConsole) {
    logger.add(new winston.transports.Console());
  }
} else {
  logger.add(new winston.transports.Console());
  // @ts-ignore
  logger.add(new winston.transports.MongoDB({
    level: 'info',
    db: config.mongo.uri,
    collection: 'applogs',
    metaKey: 'meta',
  }));
}

export default logger;
