import { CurrentValue } from "../../model/StaTypes";
import { createArmor, StaArmor } from "../../item/armor/StaArmor";
import { createFocus, StaFocus } from "../../item/focus/StaFocus";
import { createMilestone, StaMilestone } from "../../item/milestone/StaMilestone";
import { createCharacterWeapon, StaCharacterWeapon } from "../../item/characterweapon/StaCharacterWeapon";
import { createInjury, StaInjury } from "../../item/injury/StaInjury";
import { createItem, StaItem } from "../../item/item/StaItem";
import { createTalent, StaTalent } from "../../item/talent/StaTalent";
import { createTrait, StaTrait } from "../../item/trait/StaTrait";
import { createValue, StaValue } from "../../item/value/StaValue";
import { filterItemType } from "../../util/util";

export class StaCharacter {
  name: string;
  species: string;
  rank: string;
  assignment: string;
  environment: string;
  upbringing: string;
  notes: string = "";

  attributes: StaCharacterAttributes = new StaCharacterAttributes();
  disciplines: StaCharacterDisciplines = new StaCharacterDisciplines();

  reputation: CurrentValue;
  stress: CurrentValue;
  determination: CurrentValue;

  // items
  armor: StaArmor[] = [];
  focuses: StaFocus[] = [];
  injuries: StaInjury[] = [];
  items: StaItem[] = [];
  milestones: StaMilestone[] = [];
  talents: StaTalent[] = [];
  traits: StaTrait[] = [];
  values: StaValue[] = [];
  weapons: StaCharacterWeapon[] = [];

  roll: StaCharacterRoll = new StaCharacterRoll("control", "command");

  constructor(
    name: string,
    {
      rank = "",
      assignment = "",
      species = "",
      environment = "",
      upbringing = "",
      notes = "",
      attributes = {},
      disciplines = {},
      reputation = 10,
      determination = -1,
      stress = -1,
    } = {},
    items: Collection<Item>,
  ) {
    this.name = name;
    this.rank = rank;
    this.assignment = assignment;
    this.species = species;
    this.environment = environment;
    this.upbringing = upbringing;
    this.notes = notes;
    this.attributes = new StaCharacterAttributes(attributes);
    this.disciplines = new StaCharacterDisciplines(disciplines);
    this.reputation = new CurrentValue(reputation, 20);
    this.determination = new CurrentValue(determination, 3);
    this.stress = new CurrentValue(stress, this.attributes.fitness + this.disciplines.security);

    this.armor = filterItemType(items, "armor").map((item) => createArmor(item));
    this.focuses = filterItemType(items, "armor").map((item) => createFocus(item));
    this.injuries = filterItemType(items, "armor").map((item) => createInjury(item));
    this.items = filterItemType(items, "items").map((item) => createItem(item));
    this.milestones = filterItemType(items, "armor").map((item) => createMilestone(item));
    this.talents = filterItemType(items, "armor").map((item) => createTalent(item));
    this.traits = filterItemType(items, "armor").map((item) => createTrait(item));
    this.values = filterItemType(items, "armor").map((item) => createValue(item));
    this.weapons = filterItemType(items, "armor").map((item) => createCharacterWeapon(item));
  }

}

export class StaCharacterAttributes {
  control: number;
  daring: number;
  fitness: number;
  insight: number;
  presence: number;
  reason: number;

  constructor({
    control = 7,
    daring = 7,
    fitness = 7,
    insight = 7,
    presence = 7,
    reason = 7,
  } = {}) {
    this.control = control;
    this.daring = daring;
    this.fitness = fitness;
    this.insight = insight;
    this.presence = presence;
    this.reason = reason;
  }
}

export class StaCharacterDisciplines {
  command: number = 1;
  conn: number = 1;
  security: number = 1;
  engineering: number = 1;
  science: number = 1;
  medicine: number = 1;

  constructor({
    command = 1,
    conn = 1,
    security = 1,
    engineering = 1,
    science = 1,
    medicine = 1,
  } = {}) {
    this.command = command;
    this.conn = conn;
    this.security = security;
    this.engineering = engineering;
    this.science = science;
    this.medicine = medicine;
  }
}

export class StaCharacterRoll {
  attribute: keyof StaCharacterAttributes;
  discipline: keyof StaCharacterDisciplines;

  constructor(attribute: keyof StaCharacterAttributes, discipline: keyof StaCharacterDisciplines) {
    this.attribute = attribute;
    this.discipline = discipline;
  }
}
