import { Router, Request, Response, NextFunction } from 'express';
import * as articleDao from './article.dao';
import * as articleParser from './article.parser';
import * as auth from '../../auth';


const articleRouter = Router();

articleRouter.get('/', articleParser.parseGetByQuery, getByQuery);
articleRouter.post('/', auth.isAdmin, articleParser.parseCreate, create);
articleRouter.put('/:id', auth.isAdmin, articleParser.parseUpdate, update);
articleRouter.delete('/:id', auth.isAdmin, destroy);
articleRouter.patch('/positions', articleParser.parseUpdatePositions, updatePositions);

export default articleRouter;

// =============== GET ===============

async function getByQuery(req: Request, res: Response, next: NextFunction) {
  try {
    const query = req.query;
    const articlesData = await articleDao.getByQuery(query);
    res.json(articlesData);
  } catch (e) {
    next(e);
  }
}

// =============== POST ===============

async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = req.body;
    await articleDao.create(payload);
    res.sendStatus(201);
  } catch (e) {
    next(e);
  }
}

async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const payload = req.body;
    await articleDao.update(id, payload);
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}

async function updatePositions(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = req.body;
    await payload.items.map((item: any) => {
      articleDao.update(item._id, { position: item.position });
    });
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}

async function destroy(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    await articleDao.destroy(id);
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}