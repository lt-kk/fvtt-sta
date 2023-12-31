import { itemSystem } from "../../util/util";


export class StaValue {
  name: string;
  img: string | null;
  description: string;
  questioned: boolean;

  constructor(
    name = "",
    img: string | null,
    {
      description = "",
      questioned = false,
    },
  ) {
    this.name = name;
    this.img = img;
    this.description = description;
    this.questioned = questioned;
  }
}


export function createValue(document: Item): StaValue {
  return new StaValue(document.name!, document.img, itemSystem(document));
}