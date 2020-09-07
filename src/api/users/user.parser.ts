import * as _ from 'lodash';
import { Request, Response, NextFunction } from 'express';


export function parseSignIn(req: Request, res: Response, next: NextFunction) {
  req.body = _.pick(req.body, ['email', 'password']);
  next();
}

export function parseSignUp(req: Request, res: Response, next: NextFunction) {
  req.body = {
    ...parseBaseProps(req.body),
    password: req.body.password
  };
  next();
}

export function parseForgotPassword(req: Request, res: Response, next: NextFunction) {
  req.body = _.pick(req.body, ['email']);
  next();
}

export function parseResetPassword(req: Request, res: Response, next: NextFunction) {
  req.body = _.pick(req.body, ['newPassword', 'confirmPassword', 'email', 'token']);
  next();
}

export function parseUpdate(req: Request, res: Response, next: NextFunction) {
  req.body = parseBaseProps(req.body);
  next();
}

export function parseUpdatePassword(req: Request, res: Response, next: NextFunction) {
  req.body = _.pick(req.body, ['currentPassword', 'newPassword']);
  next();
}

function parseBaseProps(body: any) {
  return _.pick(body, ['email', 'name']);
}
