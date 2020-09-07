import { Router, Request, Response, NextFunction } from 'express';
import * as eventDao from './event.dao';
import * as eventParser  from './event.parser';
import * as auth from '../../auth';


const eventRouter = Router();

eventRouter.get('/', eventParser.parseGetByQuery, getByQuery);
eventRouter.post('/', auth.isAdmin, eventParser.parseCreate, create);
eventRouter.put('/:id', auth.isAdmin, eventParser.parseUpdate, update);
eventRouter.delete('/:id', auth.isAdmin, destroy);

export default eventRouter;

// =============== GET ===============

async function getByQuery(req: Request, res: Response, next: NextFunction) {
  try {
    const query = req.query;
    const eventsData = await eventDao.getByQuery(query);
    res.json(eventsData);
  } catch (e) {
    next(e);
  }
}

// =============== POST ===============

async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = req.body;
    await eventDao.create(payload);
    res.sendStatus(201);
  } catch (e) {
    next(e);
  }
}

async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const payload = req.body;
    await eventDao.update(id, payload);
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}

async function destroy(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    await eventDao.destroy(id);
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}