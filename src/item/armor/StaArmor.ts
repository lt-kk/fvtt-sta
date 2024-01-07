import { itemSystem } from "../../util/document";
import { mapItems } from "../../util/actor";
import { StaItem } from "../StaItem";
import { HasRule, StaRule } from "../../model/StaRule";


export function createArmor(document: Item): StaArmor {
  return new StaArmor(document.id!, document.name!, document.img, itemSystem(document));
}

export function filterArmor(source: Actor | Collection<Item>) {
  return mapItems(source, StaArmor.type, createArmor);
}


export class StaArmor extends StaItem implements HasRule {
  static type = "armor";

  rule: StaRule | undefined;
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
      rule = undefined,
      equipped = true,
      protection = 1,
      opportunity = 0,
      escalation = 0,
    } = {},
  ) {
    super(id, name, img, description);
    this.rule = rule ? new StaRule(`${name}[${id}]`, rule) : undefined;
    this.equipped = equipped;
    this.protection = protection;
    this.opportunity = opportunity;
    this.escalation = escalation;
  }
}
