import { Router, Request, Response, NextFunction } from 'express';
import * as blogCategoriesDao from './blogCategories.dao';
import * as blogCategoriesParser  from './blogCategories.parser';
import * as auth from '../../auth';


const blogCategoriesRouter = Router();

blogCategoriesRouter.get('/', blogCategoriesParser.parseGetByQuery, getByQuery);
blogCategoriesRouter.post('/', auth.isAdmin, blogCategoriesParser.parseCreate, create);
blogCategoriesRouter.put('/:id', auth.isAdmin, blogCategoriesParser.parseUpdate, update);
blogCategoriesRouter.delete('/:id', auth.isAdmin, destroy);
blogCategoriesRouter.patch('/positions', blogCategoriesParser.parseUpdatePositions, updatePositions);

export default blogCategoriesRouter;

// =============== GET ===============

async function getByQuery(req: Request, res: Response, next: NextFunction) {
  try {
    const query = req.query;
    const blogCategoriesData = await blogCategoriesDao.getByQuery(query);
    res.json(blogCategoriesData);
  } catch (e) {
    next(e);
  }
}

// =============== POST ===============

async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = req.body;
    await blogCategoriesDao.create(payload);
    res.sendStatus(201);
  } catch (e) {
    next(e);
  }
}

async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = req.body;
    await blogCategoriesDao.update(payload._id, payload);
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}

async function updatePositions(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = req.body;
    await payload.items.map((item: any) => {
      blogCategoriesDao.update(item._id, { position: item.position });
    });
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}

async function destroy(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    await blogCategoriesDao.destroy(id);
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}