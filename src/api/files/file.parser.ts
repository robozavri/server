import { Request, Response, NextFunction } from 'express';
import { parseArray } from '../../helpers/parser-utils';

export function parseCreateAndDestroy(req: Request, res: Response, next: NextFunction) {
  req.body = {
    fileNamesToDestroy: parseArray(req.body.fileNamesToDestroy)
  };
  next();
}
