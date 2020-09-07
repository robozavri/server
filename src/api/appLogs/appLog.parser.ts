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
      ...parseLevel(query),
      ...parseModule(query),
      ...parseErrorName(query),
      ...parseTimestampRange(query),
    },
    ...parseSearch(query),
  };
  next();
}

function parseId({ _id }: { _id?: any }) {
  return _id ? { _id } : {};
}

function parseLevel({ level }: { level?: string }) {
  return level ? { level: { $regex: level, $options: 'i' } } : {};
}

function parseModule({ module }: { module?: string }) {
  return module ? { 'meta.module': { $regex: module, $options: 'i' } } : {};
}

function parseErrorName({ errorName }: { errorName?: string }) {
  return errorName ? { 'meta.error.name': { $regex: errorName, $options: 'i' } } : {};
}

function parseTimestampRange({ timestampFrom, timestampTo }: { timestampFrom?: any, timestampTo?: any }) {
  if (!timestampFrom && !timestampTo) return {};

  const q: any = { timestamp: {} };

  timestampFrom && (q.timestamp.$gte = new Date(timestampFrom));
  timestampTo && (q.timestamp.$lte = new Date(timestampTo));

  return q;
}

function parseSearch({ keyword }: { keyword?: string }) {
  return keyword ? {
    or: [
      { message: { $regex: keyword, $options: 'i' } },
    ],
  } : {};
}