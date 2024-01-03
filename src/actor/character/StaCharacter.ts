import {CurrentValue} from "../../model/StaTypes";
import {filterArmor, StaArmor} from "../../item/armor/StaArmor";
import {filterFocus, StaFocus} from "../../item/focus/StaFocus";
import {filterMilestone, StaMilestone} from "../../item/milestone/StaMilestone";
import {filterCharacterWeapon, StaCharacterWeapon} from "../../item/characterweapon/StaCharacterWeapon";
import {filterInjury, StaInjury} from "../../item/injury/StaInjury";
import {filterItem, StaItem} from "../../item/item/StaItem";
import {filterTalent, StaTalent} from "../../item/talent/StaTalent";
import {filterTrait, StaTrait} from "../../item/trait/StaTrait";
import {filterValue, StaValue} from "../../item/value/StaValue";
import {actorItems, actorSystem} from "../../util/document";


export function createCharacter(document: Actor): StaCharacter {
  return new StaCharacter(
    document.name!,
    document.img,
    actorSystem(document),
    actorItems(document),
  );
}


export class StaCharacter {
  name: string;
  img: string | null;
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

  taskRoll: StaCharacterTaskRoll;

  constructor(
    name: string,
    img: string | null,
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
      taskRoll = {},
    } = {},
    items: Collection<Item>,
  ) {
    this.name = name;
    this.img = img;
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

    this.armor = filterArmor(items);
    this.focuses = filterFocus(items);
    this.injuries = filterInjury(items);
    this.items = filterItem(items);
    this.milestones = filterMilestone(items);
    this.talents = filterTalent(items);
    this.traits = filterTrait(items);
    this.values = filterValue(items);
    this.weapons = filterCharacterWeapon(items);

    this.taskRoll = new StaCharacterTaskRoll(taskRoll);
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

export class StaCharacterTaskRoll {
  attribute: keyof StaCharacterAttributes;
  discipline: keyof StaCharacterDisciplines;

  constructor({
    attribute = "control" as keyof StaCharacterAttributes,
    discipline = "command" as keyof StaCharacterDisciplines,
  } = {}) {
    this.attribute = attribute;
    this.discipline = discipline;
  }
}
