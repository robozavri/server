import { Request, Response, NextFunction } from 'express';
import { Router } from 'express';
import * as User from './user.dao';
import * as parser from './user.parser';
import * as validator from './user.validator';
import config from '../../config/environment';
import * as encryption from '../../helpers/encryption';
import { roles } from '../../constants/user';
import { emailActivateUser, emailRecoverPassword } from './user.messages';
import * as auth from '../../auth';
import randomString from 'random-string';
import moment from 'moment';
import { dot } from 'dot-object';
import * as _ from 'lodash';


const usersRouter = Router();

usersRouter.get('/me', getMe);

usersRouter.get('/email/:email/validate', validator.validateUniqueEmail, sendOk);
// #deprecated
usersRouter.get('/activate/:activationToken', verifyEmail);
// #deprecated
usersRouter.post('/resend/activation-token', auth.isSigned, resendActivationToken);

usersRouter.post('/sign-in', parser.parseSignIn, setSignedUser, validator.validateSignIn, signIn);
usersRouter.post('/sign-up', parser.parseSignUp, validator.validateSignUp, signUp);

usersRouter.put('/:id', auth.isAdmin, update);
usersRouter.patch('/password/reset/request', parser.parseForgotPassword, forgotPassword);
usersRouter.patch('/password/reset', parser.parseResetPassword, resetPassword);
usersRouter.patch('/password/update', auth.isSigned, parser.parseUpdatePassword, validator.validateUpdatePassword, updatePassword);

export default usersRouter;


// =============== GET ===============

function sendOk(req: Request, res: Response) {
  res.json({});
}

function getMe(req: Request, res: Response) {
  res.json(req.user);
}

// =============== POST ===============

async function setSignedUser(req: Request, res: Response, next: NextFunction) {
  try {
    if (req.body.email) {
      req.user = await User.getByEmail(req.body.email);
    }
    next();
  } catch (e) {
    next(e);
  }
}

function signIn(req: Request, res: Response, next: NextFunction) {
  const user = req.user;
  if (user.isDeactivated) {
    res.json({authError: 'UserDeactivated'});
  } else if (user.isBlocked) {
    res.json({authError: 'UserBlocked'});
  } else if (!user.isActivated) {
    res.json({authError: 'UserNotActivated'});
  } else {
    const token = auth.signToken(user);
    res.cookie('token', token, config.cookie);
    res.json({user, token});
  }
}

async function signUp(req: Request, res: Response, next: NextFunction) {
  try {
    const payload = req.body;
    const user = await User.create({
      ...payload,
      passwordHash: await encryption.generateHash(payload.password),
      isActivated: false,
      activationToken: randomString({ length: 7, numeric: true, letters: false }),
      role: roles.USER,
      joinedAt: Date.now(),
    });
    emailActivateUser(user);
    res.json({});
  } catch (e) {
    next(e);
  }
}

// #deprecated
async function verifyEmail(req: Request, res: Response, next: NextFunction) {
  try {
    const { activationToken } = req.params;
    const user: any = await User.getByActivationToken(activationToken);
    await User.update(user._id, { isActivated: true });
    req.user = await User.getById(user._id);
    const token = auth.signToken(user);
    res.cookie('token', token, config.cookie);
    res.redirect(config.google.auth[req.hostname].redirectUrl);
  } catch (e) {
    res.redirect(config.google.auth[req.hostname].redirectUrl);
  }
}

// #deprecated
async function resendActivationToken(req: Request, res: Response, next: NextFunction) {
  try {
    emailActivateUser(req.user);
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}

async function updatePassword(req: Request, res: Response, next: NextFunction) {
  try {
    const {_id} = req.user;
    const payload = req.body;
    if (payload.newPassword) {
      payload.passwordHash = await encryption.generateHash(payload.newPassword);
    }
    await User.update(_id, payload);
    const user = await User.getById(_id);
    res.json(user);
  } catch (e) {
    next(e);
  }
}

async function forgotPassword(req: Request, res: Response, next: NextFunction) {
  try {
    const { email } = req.body;
    const user: any = await User.getByEmail(email);
    const resetPassword = {
      token: randomString({ length: 7, numeric: true, letters: false }),
      expirationDate: moment().add(1, 'day').toDate(),
      isUsed: false,
    };
    await User.update(user._id, {resetPassword});
    emailRecoverPassword({...user, resetPassword});
    res.sendStatus(200);
  } catch (e) {
    next(e);
  }
}

async function resetPassword(req: Request, res: Response, next: NextFunction) {
  try {
    const {email, token, newPassword} = req.body;
    const user: any = await User.getByEmail(email);
    if (user.resetPassword.token === token && !user.resetPassword.isUsed && moment().diff(user.resetPassword.expirationDate) < 0) {
      const passwordHash = await encryption.generateHash(newPassword);
      user.resetPassword.isUsed = true;
      await User.update(user._id, { passwordHash, resetPassword: user.resetPassword});
      res.sendStatus(200);
    } else {
      res.sendStatus(400);
    }
  } catch (e) {
    next(e);
  }
}

async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const _id = req.params.id;
    const data = dot( req.body );
    await User.update(_id, data);
    const user = await User.getById(_id);
    res.json(user);
  } catch (e) {
    next(e);
  }
}
