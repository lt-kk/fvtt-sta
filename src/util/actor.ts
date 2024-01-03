import {actorItems} from "./document";

export function mapItems<I>(source: Actor | Collection<Item>, type: string, mapper: (item: Item) => I): I[] {
  if (source instanceof Actor) source = actorItems(source);
  return filterItemType(source, type)
    .map(mapper);
}

export function filterItemType(list: Collection<Item>, itemType: string): Item[] {
  return list.filter((item) => {
    return item.type === itemType;
  });
}