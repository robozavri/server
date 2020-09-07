'use strict';

import * as _ from 'lodash';
import { Request, Response, NextFunction } from 'express';
import * as User from './user.dao';
import * as encryption from '../../helpers/encryption';
import { ResourceNotFoundError, ValidationError } from '../../errors';


export async function validateUniqueEmail(req: Request, res: Response, next: NextFunction) {
  try {
    const {email} = req.params;
    await checkUniqueEmail(email);
    next();
  } catch (e) {
    next(e);
  }
}

export async function validateSignIn(req: Request, res: Response, next: NextFunction) {
  try {
    const {email, password} = req.body;
    await checkPassword(email, password);
    next();
  } catch (e) {
    next(e);
  }
}

export async function validateSignUp(req: Request, res: Response, next: NextFunction) {
  try {
    const {email} = req.body;
    await checkUniqueEmail(email);
    next();
  } catch (e) {
    next(e);
  }
}

export async function validateUpdate(req: Request, res: Response, next: NextFunction) {
  try {
    const {_id} = req.user;
    const {email} = req.body;
    const {email: curEmail} = await User.getById(_id);
    if (email !== curEmail) {
      await checkUniqueEmail(email);
    }
    next();
  } catch (e) {
    next(e);
  }
}

export async function validateUpdatePassword(req: Request, res: Response, next: NextFunction) {
  try {
    const {email} = req.user;
    const {currentPassword} = req.body;
    await checkPassword(email, currentPassword);
    next();
  } catch (e) {
    next(e);
  }
}

// =============== Helpers ===============

async function checkUniqueEmail(email: any) {
  try {
    await User.getByEmail(email);
    throw new ValidationError(`Email (${email}) is not unique`);
  } catch (e) {
    if (!(e instanceof ResourceNotFoundError)) {
      throw e;
    }
  }
}

async function checkPassword(email: any, password: any) {
  const passwordHash = await User.getPasswordHashByEmail(email);
  const isValidPassword = await encryption.compareHash(password, passwordHash);
  if (!isValidPassword) {
    throw new ValidationError(`Password of user (email ${email}) is invalid`);
  }
}