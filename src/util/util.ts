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
    .reduce((a, b) => a + b);
}

export function randomIndex(max: number) {
  return Math.floor(Math.random() * max);
}

export function constrainNumber(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}


export function formData(html: HTMLElement | JQuery): LooseObject<any> {
  html = $(html);
  let form: JQuery = html.find("form");
  if (form.length < 1) form = html.closest("form");
  let values: LooseObject<any> = {};
  form.serializeArray().forEach((entry) => {
    values[entry.name] = entry.value;
  });
  return values;
}


export function mapNotNullOrUndefined<T, R>(arr: T[], fn: (item: T) => R | null | undefined): R[] {
  return arr.reduce((result: R[], item: T) => {
    const value = fn(item);
    if (value !== null && value !== undefined) {
      result.push(value);
    }
    return result;
  }, []);
}
