import { mapItems } from "../../util/actor";
import { itemSystem } from "../../util/document";
import { StaItem } from "../StaItem";
import { b } from "vitest/dist/reporters-O4LBziQ_";


export function createLaunchbay(document: Item): StaLaunchbay {
  return new StaLaunchbay(document.id!, document.name!, document.img, itemSystem(document));
}

export function filterLaunchbay(source: Actor | Collection<Item>) {
  return mapItems(source, StaLaunchbay.type, createLaunchbay);
}


export class StaLaunchbay implements StaItem {
  static type = "launchbay";

  id: string;
  name: string;
  img: string | null;
  description: string;
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
    this.id = id;
    this.name = name;
    this.img = img;
    this.description = description;
    this.type = type;
    this.landed = landed;
  }
}
