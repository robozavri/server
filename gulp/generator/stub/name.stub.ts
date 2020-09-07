import * as _ from 'lodash';
import { cloneStub, generateImage, generateSocials }  from '../helpers/stub-helpers';

<%=stubObjectMethods%>

const <%=nameUC%>Stub = {
  <%=objectNames%>
};

export function getSingle(fields?: any): any {
  return {
    ...cloneStub(<%=nameUC%>Stub),
    ...fields
  };
}

export function getMany(count: number, fields?: any) {
  return _.range(count).map((i: number) => ({
    ...getSingle(),
    ...fields,
    <%=objectNamesWithI%>
  }));
}
