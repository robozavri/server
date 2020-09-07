import Model from './common.model';
import { assertFound } from '../../helpers/db-result-handler';

export function getOne() {
  return Model.findOne({}).lean()
    .then(assertFound(`Common was not found`));
}

export function create(data: any) {
  return Model.create(data);
}

export function update(data: any) {
  return Model.updateMany({}, { $set: data });
}

export function destroyAll() {
  return Model.deleteMany({});
}