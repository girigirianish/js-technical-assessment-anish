import { StringMap } from '../models';

const NOT_ALLOWED = [undefined, null, ''];

export const removeEmptyPropertiesFromObj = (obj: StringMap): StringMap => Object.keys(obj)
  .filter((item) => !NOT_ALLOWED.includes(obj[item]))
  .reduce((acc, item) => ({ ...acc, [item]: obj[item] }), {});
