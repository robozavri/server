import { Router, Request, Response, NextFunction } from 'express';
import * as projectDao from './project.dao';
import * as projectParser  from './project.parser';
import * as auth from '../../auth';


const projectRouter = Router();

projectRouter.get('/', projectParser.parseGetByQuery, getByQuery);
projectRouter.post('/', auth.isAdmin, projectParser.parseCreate, create);
projectRouter.put('/:id', auth.isAdmin, projectParser.parseUpdate, update);
projectRouter.delete('/:id', auth.isAdmin, destroy);
projectRouter.patch('/positions', projectParser.parseUpdatePositions, updatePositions);

export default projectRouter;

// =============== GET ===============

async function getByQuery(req: Request, res: Response, next: NextFunction) {
  try {
    const query = req.query;
    const projectsData = await projectDao.getByQuery(query);
    res.json(projectsData);
  } catch (e) {
    next(e);
  }
}

// =============== POST ===============

async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = req.body;
    await projectDao.create(payload);
    res.sendStatus(201);
  } catch (e) {
    next(e);
  }
}

async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = req.body;
    await projectDao.update(payload._id, payload);
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}

async function updatePositions(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = req.body;
    await payload.items.map((item: any) => {
      projectDao.update(item._id, { position: item.position });
    });
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}

async function destroy(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    await projectDao.destroy(id);
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}