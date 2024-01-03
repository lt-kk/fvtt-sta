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