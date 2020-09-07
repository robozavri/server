import * as _ from 'lodash';
import { cloneStub } from '../helpers/stub-helpers';

const MetaStub = {
  home: getMetaObject(),
};

function getMetaObject(): any {
  return {
    title: { en: 'meta title en', ge: 'meta title ge', ru: 'meta title ru' },
    description: { en: 'meta description en', ge: 'meta description ge', ru: 'meta description ru' },
    keywords: ['keyword1', 'keyword2', 'keyword3'],
    image: { url: 'https://d3bv2hg4q0qyg2.cloudfront.net/2016/04/18/write.jpg' },
  };
}

export function getSingle(fields?: any): any {
  return {
    ...cloneStub(MetaStub),
    ...fields
  };
}