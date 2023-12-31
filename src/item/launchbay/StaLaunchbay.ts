import { itemSystem } from "../../util/util";


export class StaLaunchbay {
  name: string;
  img: string | null;
  description: string;
  ship: string;

  constructor(
    name = "",
    img: string | null,
    {
      description = "",
      ship = "",
    },
  ) {
    this.name = name;
    this.img = img;
    this.description = description;
    this.ship = ship;
  }
}


export function createLaunchbay(document: Item): StaLaunchbay {
  return new StaLaunchbay(document.name!, document.img, itemSystem(document));
}