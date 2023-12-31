import { itemSystem } from "../../util/util";


export class StaArmor {
  name: string;
  img: string | null;
  protection: number;
  description: string;
  equipped: boolean;
  rule: string;

  opportunity: number;
  escalation: number;

  constructor(
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


export function createArmor(document: Item): StaArmor {
  return new StaArmor(document.name!, document.img, itemSystem(document));
}