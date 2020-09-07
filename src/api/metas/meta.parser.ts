import * as _ from 'lodash';
import { Request, Response, NextFunction } from 'express';

// =============== POST ===============

export function parseUpdate(req: Request, res: Response, next: NextFunction) {
  req.body = parseMeta(req.body);
  next();
}

function parseMeta(body: any) {
  const parsedBody: any = {};

  if (body.home) parsedBody.home = body.home;

  return parsedBody;
}
