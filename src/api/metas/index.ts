import { Router, Request, Response, NextFunction } from 'express';
import * as MetaDao from './meta.dao';
import * as metaParser  from './meta.parser';
import * as auth from '../../auth';


const metaRouter = Router();

metaRouter.get('/one', getOne);
metaRouter.put('/one', auth.isAdmin, metaParser.parseUpdate, update);

export default metaRouter;

// =============== GET ===============

async function getOne(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await MetaDao.getOne();
    res.json(data);
  } catch (e) {
    next(e);
  }
}

async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = req.body;
    await MetaDao.update(payload);
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}