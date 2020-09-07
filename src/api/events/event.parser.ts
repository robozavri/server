import * as _ from 'lodash';
import { Request, Response, NextFunction } from 'express';
import { parseOffsetAndLimit } from '../../helpers/parser-utils';

// =============== GET ===============

export function parseGetByQuery(req: Request, res: Response, next: NextFunction) {
  const { query } = req;
  req.query = {
    ...parseOffsetAndLimit(query),
    find: {
      ...parseId(query),
    },
    ...parseSearch(query),
  };
  next();
}

function parseId({ _id }: { _id?: any }) {
  return _id ? { _id } : {};
}

function parseSearch({ keyword }: { keyword?: string }) {
  return keyword ? {
    or: [
      { title: { $regex: keyword, $options: 'i' } },
    ],
  } : {};
}

// =============== POST ===============

export function parseCreate(req: Request, res: Response, next: NextFunction) {
  req.body = parseBaseProps(req.body);
    next();
}

export function parseUpdate(req: Request, res: Response, next: NextFunction) {
  req.body = parseBaseProps(req.body);
  next();
}

function parseBaseProps(body: any) {
  return _.pick(body, [
    'title',
    'start',
    'end',
    'color',
    'meta',
    'draggable',
    'startTime',
    'endTime',
  ]);
}