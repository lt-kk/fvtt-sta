import { itemSystem } from "../../util/util";


export class StaInjury {
  name: string;
  img: string | null;
  description: string;

  constructor(
    name = "",
    img: string | null,
    {
      description = "",
    },
  ) {
    this.name = name;
    this.img = img;
    this.description = description;
  }
}


export function createInjury(document: Item): StaInjury {
  return new StaInjury(document.name!, document.img, itemSystem(document));
}