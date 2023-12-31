import { itemSystem } from "../../util/util";


export function createFocus(document: Item): StaFocus {
  return new StaFocus(document.id!, document.name!, document.img, itemSystem(document));
}


export class StaFocus {
  id: string;
  name: string;
  img: string | null;
  description: string;

  constructor(
    id: string,
    name = "",
    img: string | null,
    {
      description = "",
    },
  ) {
    this.id = id;
    this.name = name;
    this.img = img;
    this.description = description;
  }
}
