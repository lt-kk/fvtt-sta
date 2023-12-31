export interface LooseObject<V extends any> {
  [key: string]: V;
}


export function filterItemType(list: Collection<Item>, itemType: string): Item[] {
  return list.filter((item) => {
    return item.type === itemType;
  });
}

export function actorSystem(document: Actor): LooseObject<any> {
  return (document as unknown as LooseObject<LooseObject<any>>).system;
}

export function actorItems(document: Actor): Collection<Item> {
  return document.items as unknown as Collection<Item>;
}

export function itemSystem(document: Item): LooseObject<any> {
  return (document as unknown as LooseObject<LooseObject<any>>).system;
}

