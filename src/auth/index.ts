
import { Request, Response, NextFunction } from 'express';
import { verify, sign }  from 'jsonwebtoken';
import * as User from '../api/users/user.dao';
import config from '../config/environment';
import { roles } from '../constants/user';
import { UnauthorizedError, ResourceNotFoundError, ValidationError } from '../errors';
import * as cookie from 'cookie';

export async function setUser(req: Request, res: Response, next: NextFunction) {
  try {
    const { token }: any = req.headers;
    if (!token) {
      req.user = { role: roles.GUEST };
      return next();
    }
    const { _id }: any = verify(token, config.jwt.secret);
    req.user = await User.getById(_id);
    next();
  } catch (e) {
    if (e.name === 'TokenExpiredError' || e.name === 'JsonWebTokenError' || e instanceof ResourceNotFoundError) {
      req.user = { role: roles.GUEST };
      next();
    } else {
      next(e);
    }
  }
}

export function isSigned(req: Request, res: Response, next: NextFunction) {
  const {_id, role} = req.user;
  if (role !== roles.GUEST) {
    next();
  } else {
    next(new UnauthorizedError(`User (id ${_id}) is not signed in`));
  }
}

export function isAdmin(req: Request, res: Response, next: NextFunction) {
  const {_id, role} = req.user;
  if (role === roles.ADMIN) {
    next();
  } else {
    next(new UnauthorizedError(`User (id ${_id}) is not admin`));
  }
}

export function signToken(data: any) {
  return sign({_id: data._id}, config.jwt.secret, {expiresIn: config.jwt.expiresIn});
}


export function socketCookieParser(socket: any, next: NextFunction) {
  if (socket.request.headers.cookie && typeof socket.request.headers.cookie === 'string') {
    socket.cookie = cookie.parse(socket.request.headers.cookie);
  } else {
    socket.cookie = socket.request.headers.cookie;
  }
  next();
}

export async function socketSetUser(socket: any, next: NextFunction) {
  try {
    const { token }: any = socket.handshake.query;
    if (token) {
      const { _id }: any = verify(token, config.jwt.secret);
      socket.user = await User.getById(_id);
      next();
    } else {
      throw new ValidationError('Unauthorized User');
    }
  } catch (e) {
    next(e);
  }
}