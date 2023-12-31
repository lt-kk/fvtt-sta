import { itemSystem } from "../../util/util";


export function createLaunchbay(document: Item): StaLaunchbay {
  return new StaLaunchbay(document.id!, document.name!, document.img, itemSystem(document));
}


export class StaLaunchbay {
  id: string;
  name: string;
  img: string | null;
  description: string;
  ship: string;

  constructor(
    id: string,
    name = "",
    img: string | null,
    {
      description = "",
      ship = "",
    },
  ) {
    this.id = id;
    this.name = name;
    this.img = img;
    this.description = description;
    this.ship = ship;
  }
}
