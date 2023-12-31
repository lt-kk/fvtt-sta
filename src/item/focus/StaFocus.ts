import { itemSystem } from "../../util/util";


export class StaFocus {
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


export function createFocus(document: Item): StaFocus {
  return new StaFocus(document.name!, document.img, itemSystem(document));
}