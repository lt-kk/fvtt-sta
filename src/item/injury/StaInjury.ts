import { mapItems } from "../../util/actor";
import { itemSystem } from "../../util/document";
import { StaItem } from "../StaItem";


export function createInjury(document: Item): StaInjury {
  return new StaInjury(document.id!, document.name!, document.img, itemSystem(document));
}

export function filterInjury(source: Actor | Collection<Item>) {
  return mapItems(source, StaInjury.type, createInjury);
}


export class StaInjury extends StaItem {
  static type = "injury";

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
    super(id, name, img, description);
    this.healed = healed;
  }
}
