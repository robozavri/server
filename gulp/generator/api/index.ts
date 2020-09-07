import { Router, Request, Response, NextFunction } from 'express';
import * as <%=nameLC%>Dao from './<%=nameLC%>.dao';
import * as <%=nameLC%>Parser  from './<%=nameLC%>.parser';
import * as auth from '../../auth';


const <%=nameLC%>Router = Router();

<%=nameLC%>Router.get('/', <%=nameLC%>Parser.parseGetByQuery, getByQuery);
<%=nameLC%>Router.post('/', auth.isAdmin, <%=nameLC%>Parser.parseCreate, create);
<%=nameLC%>Router.put('/:id', auth.isAdmin, <%=nameLC%>Parser.parseUpdate, update);
<%=nameLC%>Router.delete('/:id', auth.isAdmin, destroy);
<%=nameLC%>Router.patch('/positions', <%=nameLC%>Parser.parseUpdatePositions, updatePositions);

export default <%=nameLC%>Router;

// =============== GET ===============

async function getByQuery(req: Request, res: Response, next: NextFunction) {
  try {
    const query = req.query;
    const <%=namePlural%>Data = await <%=nameLC%>Dao.getByQuery(query);
    res.json(<%=namePlural%>Data);
  } catch (e) {
    next(e);
  }
}

// =============== POST ===============

async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = req.body;
    await <%=nameLC%>Dao.create(payload);
    res.sendStatus(201);
  } catch (e) {
    next(e);
  }
}

async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = req.body;
    await <%=nameLC%>Dao.update(payload._id, payload);
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}

async function updatePositions(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = req.body;
    await payload.items.map((item: any) => {
      <%=nameLC%>Dao.update(item._id, { position: item.position });
    });
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}

async function destroy(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    await <%=nameLC%>Dao.destroy(id);
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}