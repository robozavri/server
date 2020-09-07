import { Router, Request, Response, NextFunction } from 'express';
import * as appLogDao from './appLog.dao';
import * as appLogParser  from './appLog.parser';
import * as auth from '../../auth';


const appLogRouter = Router();

appLogRouter.get('/', auth.isAdmin, appLogParser.parseGetByQuery, getByQuery);

export default appLogRouter;

// =============== GET ===============

async function getByQuery(req: Request, res: Response, next: NextFunction) {
  try {
    const query = req.query;
    const appLogsData = await appLogDao.getByQuery(query);
    res.json(appLogsData);
  } catch (e) {
    next(e);
  }
}