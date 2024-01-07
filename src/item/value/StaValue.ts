import { mapItems } from "../../util/actor";
import { itemSystem } from "../../util/document";
import { StaItem } from "../StaItem";


export function createValue(document: Item): StaValue {
  return new StaValue(document.id!, document.name!, document.img, itemSystem(document));
}

export function filterValue(source: Actor | Collection<Item>) {
  return mapItems(source, StaValue.type, createValue);
}


export class StaValue extends StaItem {
  static type = "value";

  used: boolean;

  constructor(
    id: string,
    name = "",
    img: string | null,
    {
      description = "",
      used = false,
    },
  ) {
    super(id, name, img, description);
    this.used = used;
  }
}
