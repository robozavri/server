import Model from './event.model';
import Promise from 'bluebird';
import { assertFound } from '../../helpers/db-result-handler';

// =============== Getters ===============

export function getByQuery({find = {}, or = [{}], sort = {_id: -1}, offset = 0, limit = 10}) {
  return Promise.all([
    Model.find(find).lean().or(or).sort(sort).skip(offset).limit(limit),
    Model.find(find).lean().or(or).countDocuments()
  ]).spread((items: any[], numTotal: number) => ({items, numTotal}));
}

export function getById(id: any): any {
  return Model.findOne({_id: id}).lean()
    .then(assertFound(`Event (id ${id}) was not found`));
}

// =============== Setters ===============

export function create(data: any) {
  return Model.create(data);
}

export function insertMany(data: any) {
  return Model.insertMany(data);
}

export function update(id: any, data: any) {
  return Model.findOneAndUpdate({_id: id}, {$set: data})
    .then(assertFound(`Could not update event (id ${id})`));
}

export function destroy(id: any) {
  return Model.findOneAndRemove({_id: id})
    .then(assertFound(`Could not destroy event (id ${id})`));
}

export function destroyAll() {
  return Model.deleteMany({});
}

