export interface LooseObject<V extends any> {
  [key: string]: V;
}


/** foundry-vtt-types is missing this property */
export interface HasRolls<D extends Object> {
  rolls: Roll<D>[];
}

export function propertyOf<T>(name: keyof T): string {
  return String(name);
}

export function propertiesOf(type: any) {
  return Object.getOwnPropertyNames(new type());
}

export function splitObject(obj: any, rule: (name: string, value: any) => boolean) {
  const a: LooseObject<any> = {};
  const b: LooseObject<any> = {};
  Object.entries(obj).forEach(([name, value]) => {
    if (rule(name, value)) a[name] = value;
    else b[name] = value;
  });
  return [a, b];
}

export function sumAttributes<T>(obj: any, accessor: (v: T) => number) {
  return Object.entries(obj)
    .map(([_, value]) => accessor(value as T) as number)
    .reduce((a, b) => a + b)
}