export function generateInterface(fields = false) {
    let formTemplate = '';
    if(!fields) {
        return emptyObj;
    }

    Object.keys(fields).map((key, index) => {
        formTemplate += addField(key);
    });
    return formTemplate;
  }

 function addField(key){
    return `
    ${key}?: any;`;
 }
