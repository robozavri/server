import * as _ from 'lodash';
import { cloneStub, generateImage, generateSocials }  from '../helpers/stub-helpers';



function getNameObject(i: number = 0): any {
    return 'name';
}

function getMetaObject(i: number = 0): any {
    return {
      title : {
         
        en: `meta en ${i}`,
        ge: `meta ge ${i}`,
      },
      description : {
         
        en: `meta en ${i}`,
        ge: `meta ge ${i}`,
      },
      keywords: ['meta meta keyword1', 'meta meta keyword2', 'meta meta keyword3'],
      image: { url: generateImage() },
  };
}
function getAboutObject(i: number = 0): any {
    return { contact: { category: null, street: { title: 'title', blogType: 'classic', peoples: { human: { age: {
        
        en: `age en ${i}`,
        ge: `age ge ${i}`,
    }, age4: 'age4',}, isFeatured: false,}, desc: 'desc',}, image: { url: generateImage()},}, dimmuborgir: { ambum: 'ambum', songs: { oneSong: {
        
        en: `oneSong en ${i}`,
        ge: `oneSong ge ${i}`,
    }, oneSong2: {
        
        en: `oneSong2 en ${i}`,
        ge: `oneSong2 ge ${i}`,
    },}, metal: { images: [
        { url:  generateImage()},
        { url:  generateImage()},
        { url:  generateImage()}
    ],},}, socialAccounts: [
          { account: generateSocials(), link: `https://www.${generateSocials()}.com/` },
          { account: generateSocials(), link: `https://www.${generateSocials()}.com/` },
          { account: generateSocials(), link: `https://www.${generateSocials()}.com/` }
    ],};
}

const BlogStub = {
    name: getNameObject(),
    meta: getMetaObject(),
    about: getAboutObject(),
};

export function getSingle(fields?: any): any {
  return {
    ...cloneStub(BlogStub),
    ...fields
  };
}

export function getMany(count: number, fields?: any) {
  return _.range(count).map((i: number) => ({
    ...getSingle(),
    ...fields,
    name: getNameObject(i),
    meta: getMetaObject(i),
    about: getAboutObject(i),
  }));
}
