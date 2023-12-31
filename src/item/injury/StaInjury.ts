import { itemSystem } from "../../util/util";


export function createInjury(document: Item): StaInjury {
  return new StaInjury(document.id!, document.name!, document.img, itemSystem(document));
}


export class StaInjury {
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
