import * as _ from 'lodash';
import * as uuid from 'uuid';

const categories = [
  'abstract', 'animals', 'business', 'cats', 'city', 'food', 'nightlife', 'fashion', 'people', 'nature', 'sports', 'technics', 'transport'
];

const IconCategories = [
  'poly', 'grad', 'rect', 'ngon', 'pxls'
];

const socials = ['instagram', 'facebook', 'twitter', 'linkedin'];

export function cloneStub(stub?: any, uniqueFields?: any) {
  uniqueFields = uniqueFields || [];
  stub = _.cloneDeep(stub);

  for (const field of uniqueFields) {
    const dot = field.indexOf('.');

    if (dot !== -1) {
      const field1 = field.substring(0, dot);
      const field2 = field.substring(dot + 1);
      stub[field1][field2] = `test-${uuid.v4()}`;
    } else {
      stub[field] = `test-${uuid.v4()}`;
    }
  }
  return stub;
}

export function generateImage(heigth?: any, width?: any) {
    heigth = heigth || 800;
    width = width || 500;
    return `http://lorempixel.com/${categories[Math.floor(Math.random() * categories.length)]}/${heigth}/${width}/`;
}

export function generateIcon(heigth?: any, width?: any, type?: any) {
    heigth = heigth || 42;
    width = width || 32;
    type = Math.floor(Math.random() * IconCategories.length) || type;
    return `https://loremicon.com/${IconCategories[type]}/${heigth}/${width}/${ Math.floor(Math.random() * 7000) }/png`;
}

export function generateSocials() {
   return socials[Math.floor(Math.random() * socials.length)];
}