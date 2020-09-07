import { Express } from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from '../config/cors';
import ejs from 'ejs';
import passport from 'passport';

export function initExpress(app: Express) {
  app.disable('x-powered-by');
  app.set('view engine', 'ejs');
  app.engine('.html', ejs.renderFile);
  app.use(compression());

  app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({limit: '5gb', extended: true}));

  // app.use(bodyParser.urlencoded({ extended: false }));
  // app.use(bodyParser.json());

  app.use(cookieParser());
  app.use(cors);
  app.use(passport.initialize());
}