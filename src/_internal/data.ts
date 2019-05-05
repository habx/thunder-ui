export const omit = (obj: object, keys: string[]): object =>
  Object.entries(obj)
    .filter(([key]) => !keys.includes(key))
    .reduce((obj, [key, val]) => Object.assign(obj, { [key]: val }), {})

export const pick = (obj: object, keys: string[]): object =>
  Object.entries(obj)
    .filter(([key]) => keys.includes(key))
    .reduce((obj, [key, val]) => Object.assign(obj, { [key]: val }), {})

export const mapValues = (
  obj: object,
  iteratee: (value: any, key: string, obj: object) => object
) =>
  Object.entries(obj).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: iteratee(value, key, obj),
    }),
    {}
  )

export const isFunction = (value: any): value is (...args: any[]) => any =>
  value && {}.toString.call(value) === '[object Function]'

export const isString = (value?: any): value is string =>
  (value || value === '') &&
  Object.prototype.toString.call(value) === '[object String]'

export const isBoolean = (value: any): value is boolean =>
  value === true ||
  value === false ||
  Object.prototype.toString.call(value) === '[object Boolean]'

export const isNil = (value: any): value is null | undefined => value == null
