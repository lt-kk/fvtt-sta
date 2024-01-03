import {itemSystem} from "../../util/document";
import {mapItems} from "../../util/actor";


export function createArmor(document: Item): StaArmor {
  return new StaArmor(document.id!, document.name!, document.img, itemSystem(document));
}

export function filterArmor(source: Actor | Collection<Item>) {
  return mapItems(source, StaArmor.type, createArmor);
}


export class StaArmor {
  static type = "armor"

  id: string;
  name: string;
  img: string | null;
  protection: number;
  description: string;
  equipped: boolean;
  rule: string;

  opportunity: number;
  escalation: number;

  constructor(
    id: string,
    name: string,
    img: string | null,
    {
      protection = 1,
      description = "",
      equipped = true,
      rule = "",
      opportunity = 0,
      escalation = 0,
    } = {},
  ) {
    this.id = id;
    this.name = name;
    this.img = img;
    this.protection = protection;
    this.description = description;
    this.equipped = equipped;
    this.rule = rule;
    this.opportunity = opportunity;
    this.escalation = escalation;
  }
}
