import { StaStarshipSystems } from "../../actor/starship/StaStarship";

import { mapItems } from "../../util/actor";
import { itemSystem } from "../../util/document";
import { StaItem } from "../StaItem";


export function createRefit(document: Item): StaRefit {
  return new StaRefit(document.id!, document.name!, document.img, itemSystem(document));
}

export function filterRefit(source: Actor | Collection<Item>) {
  return mapItems(source, StaRefit.type, createRefit);
}


export class StaRefit extends StaItem {
  static type = "refit";

  system: keyof StaStarshipSystems | null;

  constructor(
    id: string,
    name = "",
    img: string | null,
    {
      description = "",
      system = null as keyof StaStarshipSystems | null,
    },
  ) {
    super(id, name, img, description);
    this.system = system;
  }
}
