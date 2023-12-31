import { itemSystem } from "../../util/util";


export class StaTrait {
  name: string = "";
  img: string | null;
  description: string = "";

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


export function createTrait(document: Item): StaTrait {
  return new StaTrait(document.name!, document.img, itemSystem(document));
}