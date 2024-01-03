import {StaStarshipSystems} from "../../actor/starship/StaStarship";

import {mapItems} from "../../util/actor";
import {itemSystem} from "../../util/document";


export function createRefit(document: Item): StaRefit {
  return new StaRefit(document.id!, document.name!, document.img, itemSystem(document));
}

export function filterRefit(source: Actor | Collection<Item>) {
  return mapItems(source, StaRefit.type, createRefit);
}


export class StaRefit {
  static type = "refit"

  id: string;
  name: string;
  img: string | null;
  system: keyof StaStarshipSystems | null;

  constructor(
    id: string,
    name = "",
    img: string | null,
    {
      system = null as keyof StaStarshipSystems | null,
    },
  ) {
    this.id = id;
    this.name = name;
    this.img = img;
    this.system = system;
  }
}
