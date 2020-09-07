'use strict';

import * as Meta from '../api/metas/meta.dao';
import config from '../config/environment';
import { defaults, OG_FB_ID } from '../constants/metaTags';

const pathModels: { [key: string]: string } = {
  '/home': 'home',
};

const BASE_URL = `${config.url.scheme}://${config.url.host}/`;

export function getMetaTags(url: string) {
  const model: string = pathModels[url];
  return Meta.getOne()
    .then((data: {[key: string]: any}) => getPageMetaTagsObject(url, data[model]))
    .catch(() => getDefaultMetaTagsObject(url));
}

function getPageMetaTagsObject(url: string, model: any) {
  return model ? {
    title: (model.title && (model.title.ge || model.title.en)) || defaults.TITLE,
    description: (model.description && (model.description.ge || model.description.en)) || defaults.DESCRIPTION,
    keywords: (model.keywords && model.keywords.length) ? model.keywords.join(', ') : defaults.KEYWORDS,
    ogFbId: OG_FB_ID,
    ogImage: `${BASE_URL}${(model.image && model.image.url) || defaults.IMAGE}`,
    ogUrl: `${config.url.host}${url}`,
    ogType: (url.length < 2) ? 'website' : 'question',
  } : getDefaultMetaTagsObject(url);
}

function getDefaultMetaTagsObject(url: string) {
  return {
    title: defaults.TITLE,
    description: defaults.DESCRIPTION,
    keywords: defaults.KEYWORDS,
    ogFbId: OG_FB_ID,
    ogImage: `${BASE_URL}${defaults.IMAGE}`,
    ogUrl: `${config.url.host}${url}`,
    ogType: (url.length < 2) ? 'website' : 'question',
  };
}
