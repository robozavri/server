import { Router, Request, Response, NextFunction } from 'express';
import * as blogDao from './blog.dao';
import * as blogParser  from './blog.parser';
import * as auth from '../../auth';


const blogRouter = Router();

blogRouter.get('/', blogParser.parseGetByQuery, getByQuery);
blogRouter.post('/', auth.isAdmin, blogParser.parseCreate, create);
blogRouter.put('/:id', auth.isAdmin, blogParser.parseUpdate, update);
blogRouter.delete('/:id', auth.isAdmin, destroy);
blogRouter.patch('/positions', blogParser.parseUpdatePositions, updatePositions);

export default blogRouter;

// =============== GET ===============

async function getByQuery(req: Request, res: Response, next: NextFunction) {
  try {
    const query = req.query;
    const blogsData = await blogDao.getByQuery(query);
    res.json(blogsData);
  } catch (e) {
    next(e);
  }
}

// =============== POST ===============

async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = req.body;
    await blogDao.create(payload);
    res.sendStatus(201);
  } catch (e) {
    next(e);
  }
}

async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = req.body;
    await blogDao.update(payload._id, payload);
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}

async function updatePositions(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = req.body;
    await payload.items.map((item: any) => {
      blogDao.update(item._id, { position: item.position });
    });
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}

async function destroy(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    await blogDao.destroy(id);
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}