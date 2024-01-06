import { mapItems } from "../../util/actor";
import { itemSystem } from "../../util/document";
import { StaItem } from "../StaItem";


export function createInjury(document: Item): StaInjury {
  return new StaInjury(document.id!, document.name!, document.img, itemSystem(document));
}

export function filterInjury(source: Actor | Collection<Item>) {
  return mapItems(source, StaInjury.type, createInjury);
}


export class StaInjury implements StaItem {
  static type = "injury";

  id: string;
  name: string;
  img: string | null;
  description: string;
  healed: boolean;

  constructor(
    id: string,
    name = "",
    img: string | null,
    {
      description = "",
      healed = false,
    },
  ) {
    this.id = id;
    this.name = name;
    this.img = img;
    this.description = description;
    this.healed = healed;
  }
}
