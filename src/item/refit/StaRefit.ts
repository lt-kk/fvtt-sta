import { itemSystem } from "../../util/util";
import { StaStarshipSystems } from "../../actor/starship/StaStarship";


export function createRefit(document: Item): StaRefit {
  return new StaRefit(document.id!, document.name!, document.img, itemSystem(document));
}


export class StaRefit {
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
