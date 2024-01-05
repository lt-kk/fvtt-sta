import { itemSystem } from "../../util/document";
import { mapItems } from "../../util/actor";
import { StaItem } from "../StaItem";


export function createArmor(document: Item): StaArmor {
  return new StaArmor(document.id!, document.name!, document.img, itemSystem(document));
}

export function filterArmor(source: Actor | Collection<Item>) {
  return mapItems(source, StaArmor.type, createArmor);
}


export class StaArmor extends StaItem {
  static type = "armor";

  id: string;
  name: string;
  img: string | null;
  description: string;
  rule: string;
  opportunity: number;
  escalation: number;
  equipped: boolean;
  protection: number;

  constructor(
    id: string,
    name: string,
    img: string | null,
    {
      description = "",
      rule = "",
      equipped = true,
      protection = 1,
      opportunity = 0,
      escalation = 0,
    } = {},
  ) {
    super();
    this.id = id;
    this.name = name;
    this.img = img;
    this.description = description;
    this.rule = rule;
    this.equipped = equipped;
    this.protection = protection;
    this.opportunity = opportunity;
    this.escalation = escalation;
  }
}
