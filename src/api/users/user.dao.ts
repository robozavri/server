import Model from './user.model';
import Promise from 'bluebird';
import { assertFound } from '../../helpers/db-result-handler';
import { ResourceNotFoundError } from '../../errors';

const PRIVATE_FIELDS = '-passwordHash -activationToken -mobile.otpCode';

export function getById(_id: any): any {
  return Model.findOne({_id}, PRIVATE_FIELDS).lean().populate('paymentCards')
    .then(assertFound(`User (id ${_id}) was not found`));
}

export function getByEmail(email: any) {
  return Model.findOne({email}, PRIVATE_FIELDS).lean()
    .then(assertFound(`User (email ${email}) was not found`));
}

export function getByActivationToken(activationToken: any) {
  return Model.findOne({activationToken}, PRIVATE_FIELDS).lean()
    .then(assertFound(`User (activationToken ${activationToken}) was not found`));
}

export function getPasswordHashByEmail(email: any) {
  return Model.findOne({email}, 'passwordHash').lean()
    .then((res: any) => {
      if (res === null) {
        throw new ResourceNotFoundError(`User (email ${email}) was not found`);
      } else if (!res.passwordHash) {
        throw new ResourceNotFoundError(`User (email ${email}) does not have a passwordHash`);
      } else {
        return res.passwordHash;
      }
    });
}

export function getByQuery({find = {}, or = [{}], sort = {_id: -1}, offset = 0, limit = 10}): any {
  return Promise.all([
    Model.find(find).lean().or(or).sort(sort).skip(offset).limit(limit),
    Model.find(find).lean().or(or).countDocuments()
  ]).spread((items: any[], numTotal: number) => ({items, numTotal}));
}

export function create(data: any) {
  return Model.create(data);
}

export function insertMany(data: any): any {
  return Model.insertMany(data);
}

export function update(id: any, data: any) {
  return Model.findOneAndUpdate({_id: id}, {$set: data})
    .then(assertFound(`Could not update user (id ${id})`));
}

export function destroy(id: any) {
  return Model.findOneAndRemove({_id: id})
    .then(assertFound(`Could not destroy banType (id ${id})`));
}

export function destroyAll() {
  return Model.deleteMany({});
}