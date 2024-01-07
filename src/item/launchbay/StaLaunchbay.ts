import { mapItems } from "../../util/actor";
import { itemSystem } from "../../util/document";
import { StaItem } from "../StaItem";


export function createLaunchbay(document: Item): StaLaunchbay {
  return new StaLaunchbay(document.id!, document.name!, document.img, itemSystem(document));
}

export function filterLaunchbay(source: Actor | Collection<Item>) {
  return mapItems(source, StaLaunchbay.type, createLaunchbay);
}


export class StaLaunchbay extends StaItem {
  static type = "launchbay";

  type: string;
  landed: boolean;

  constructor(
    id: string,
    name = "",
    img: string | null,
    {
      description = "",
      type = "",
      landed = true,
    },
  ) {
    super(id, name, img, description);
    this.type = type;
    this.landed = landed;
  }
}
