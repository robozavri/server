import * as _ from 'lodash';
import { Request, Response, NextFunction } from 'express';

// =============== POST ===============

export function parseSendEmail(req: Request, res: Response, next: NextFunction) {
  req.body = _.pick(req.body, ['name', 'email', 'message']);
  next();
}

export function parseUpdate(req: Request, res: Response, next: NextFunction) {
  req.body = parseCommon(req.body);
  next();
}


function parseCommon(body: any) {
  const parsedBody: any = {};

  if (body.contact) parsedBody.contact = body.contact;
  if (body.articles) parsedBody.articles = body.articles;

  return parsedBody;
}