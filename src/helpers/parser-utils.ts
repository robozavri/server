import * as _ from 'lodash';

const MAX_LIMIT = 1e3;

export function parseOffsetAndLimit({page, limit, all}: {page?: number, limit?: number, all?: boolean | string}): any {
  all = all === 'true';
  return {
    offset: all ? 0 : computeOffset(parsePage(page), parseLimit(limit)),
    limit: all ? MAX_LIMIT : parseLimit(limit)
  };
}

function parsePage(page: number) {
  page = Number(page);
  return (isFinite(page) && page > 0) ? page : 1;
}

function parseLimit(limit: number) {
  limit = Number(limit);
  return (isFinite(limit) && limit > 0 && limit <= MAX_LIMIT) ? limit : 1;
}

function computeOffset(page: number, limit: number) {
  return (page - 1) * limit;
}

export function parseSortBy(sortBy: any): any | undefined {
  sortBy = String(sortBy);
  const key = sortBy.substr(0, sortBy.length - 1);
  const sign = sortBy[sortBy.length - 1];
  let value;

  switch (sign) {
    case '+':
      value = 1;
      break;
    case ' ':
      value = 1;
      break;
    case '-':
      value = -1;
      break;
    default:
      return { _id: -1 };
  }

  return { [key]: value };
}

export function parseArray(data: any) {
  if (data && data instanceof Array) {
    return data;
  } else if (data && typeof data === 'string') {
    return [data];
  } else {
    return [];
  }
}
