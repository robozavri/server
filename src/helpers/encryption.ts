import { hashSync, compareSync }  from 'bcrypt-nodejs';

export function generateHash(data: any) {
  return hashSync(data, undefined);
}

export function compareHash(data: any, hash: any) {
  return compareSync(data, hash);
}
