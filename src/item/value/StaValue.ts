import { mapItems } from "../../util/actor";
import { itemSystem } from "../../util/document";
import { StaItem } from "../StaItem";


export function createValue(document: Item): StaValue {
  return new StaValue(document.id!, document.name!, document.img, itemSystem(document));
}

export function filterValue(source: Actor | Collection<Item>) {
  return mapItems(source, StaValue.type, createValue);
}


export class StaValue implements StaItem {
  static type = "value";

  id: string;
  name: string;
  img: string | null;
  description: string;
  questioned: boolean;

  constructor(
    id: string,
    name = "",
    img: string | null,
    {
      description = "",
      questioned = false,
    },
  ) {
    this.id = id;
    this.name = name;
    this.img = img;
    this.description = description;
    this.questioned = questioned;
  }
}
