import * as _ from 'lodash';
import { cloneStub } from '../helpers/stub-helpers';

const ArticleStub = {
  title: { en: 'title en', ge: 'title ge', ru: 'title ru' },
  description: { en: 'description en', ge: 'description ge', ru: 'description ru' },
  thumbnail: { url: 'https://d3bv2hg4q0qyg2.cloudfront.net/2016/04/18/write.jpg' },
  content: { en: 'content en', ge: 'content ge', ru: 'content ru' },
  isFeatured: true,
  meta: getMeta(),
};

function getMeta(): any {
  return {
    title: { en: 'meta title en', ge: 'meta title ge', ru: 'meta title ru' },
    description: { en: 'meta description en', ge: 'meta description ge', ru: 'meta description ru' },
    keywords: ['keyword1', 'keyword2', 'keyword3'],
    image: { url: 'https://d3bv2hg4q0qyg2.cloudfront.net/2016/04/18/write.jpg' },
  };
}

export function getSingle(fields?: any): any {
  return {
    ...cloneStub(ArticleStub),
    ...fields
  };
}

export function getMany(count: number, fields?: any) {
  return _.range(count).map((i: number) => ({
    ...getSingle(),
    ...fields,
    title: { en: `title en ${i}`, ge: `title ge ${i}`, ru: `title ru ${i}` },
    position: i,
  }));
}