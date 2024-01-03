import {LooseObject} from "./util";


export function actorSystem(document: Actor): LooseObject<any> {
  return (document as unknown as LooseObject<LooseObject<any>>).system;
}

export function actorItems(document: Actor): Collection<Item> {
  return document.items as unknown as Collection<Item>;
}

export function itemSystem(document: Item): LooseObject<any> {
  return (document as unknown as LooseObject<LooseObject<any>>).system;
}

export function update(document: StoredDocument<any>, system: LooseObject<any>) {
  document.update({
    "system": system
  });
}