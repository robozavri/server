import * as _ from 'lodash';
import { cloneStub } from '../helpers/stub-helpers';

const CommonStub = {
  contact: getContactObject(),
  articles: getArticlesObject(),
};

function getContactObject(): any {
  return {
    phone: '995 555 123456',
    email: 'hello@gmail.com',
    address: { en: 'address en', ge: 'address ge', ru: 'address ru' },
    adminEmail: '12giorgi@gmail.com',
  };
}

function getArticlesObject(): any {
  return {
    title: { en: 'article title en', ge: 'article title ge', ru: 'article title ru' },
    subtitle: { en: 'article subtitle en', ge: 'article subtitle ge', ru: 'article subtitle ru' },
  };
}

export function getSingle(fields?: any): any {
  return {
    ...cloneStub(CommonStub),
    ...fields
  };
}