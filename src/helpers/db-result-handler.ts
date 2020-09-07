import { ResourceNotFoundError } from '../errors';

export function assertFound(message: any) {
  return assertFoundHelper.bind(undefined, message);
}

function assertFoundHelper(message: any, result: any) {
  if (!result) {
    throw new ResourceNotFoundError(message);
  }
  return result;
}
