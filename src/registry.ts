import { CharacterSheet } from "./actor/character/CharacterSheet";
import { StarshipSheet } from "./actor/starship/StarshipSheet";
import { ArmorSheet } from "./item/armor/ArmorSheet";
import { CharacterWeaponSheet } from "./item/characterweapon/CharacterWeaponSheet";
import { FocusSheet } from "./item/focus/FocusSheet";
import { InjurySheet } from "./item/injury/InjurySheet";
import { ThingSheet } from "./item/thing/ThingSheet";
import { LaunchbaySheet } from "./item/launchbay/LaunchbaySheet";
import { MilestoneSheet } from "./item/milestone/MilestoneSheet";
import { RefitSheet } from "./item/refit/RefitSheet";
import { StarshipWeaponSheet } from "./item/starshipweapon/StarshipWeaponSheet";
import { TalentSheet } from "./item/talent/TalentSheet";
import { TraitSheet } from "./item/trait/TraitSheet";
import { ValueSheet } from "./item/value/ValueSheet";


export interface ActorTypeConfig {
  sheet: typeof ActorSheet;
}

export class ActorTypes {
  character: ActorTypeConfig = {
    sheet: CharacterSheet,
  };
  starship: ActorTypeConfig = {
    sheet: StarshipSheet,
  };
}

export const actorTypes = new ActorTypes();


export interface ItemTypeConfig {
  sheet: typeof ItemSheet;
  listTemplate: string;
  chatTemplate: string;
}

export class ItemTypes {
  armor: ItemTypeConfig = {
    sheet: ArmorSheet,
    listTemplate: "item/armor/ArmorListItem",
    chatTemplate: "item/armor/ArmorChat",
  };
  characterweapon: ItemTypeConfig = {
    sheet: CharacterWeaponSheet,
    listTemplate: "item/characterweapon/CharacterWeaponListItem",
    chatTemplate: "item/GenericItemChat",
  };
  focus: ItemTypeConfig = {
    sheet: FocusSheet,
    listTemplate: "item/GenericListItem",
    chatTemplate: "item/GenericItemChat",
  };
  injury: ItemTypeConfig = {
    sheet: InjurySheet,
    listTemplate: "item/injury/InjuryListItem",
    chatTemplate: "item/GenericItemChat",
  };
  launchbay: ItemTypeConfig = {
    sheet: LaunchbaySheet,
    listTemplate: "item/GenericListItem",
    chatTemplate: "item/GenericItemChat",
  };
  milestone: ItemTypeConfig = {
    sheet: MilestoneSheet,
    listTemplate: "item/GenericListItem",
    chatTemplate: "item/GenericItemChat",
  };
  refit: ItemTypeConfig = {
    sheet: RefitSheet,
    listTemplate: "item/GenericListItem",
    chatTemplate: "item/GenericItemChat",
  };
  starshipweapon: ItemTypeConfig = {
    sheet: StarshipWeaponSheet,
    listTemplate: "item/GenericListItem",
    chatTemplate: "item/GenericItemChat",
  };
  talent: ItemTypeConfig = {
    sheet: TalentSheet,
    listTemplate: "item/GenericListItem",
    chatTemplate: "item/GenericItemChat",
  };
  thing: ItemTypeConfig = {
    sheet: ThingSheet,
    listTemplate: "item/thing/ThingListItem",
    chatTemplate: "item/GenericItemChat",
  };
  trait: ItemTypeConfig = {
    sheet: TraitSheet,
    listTemplate: "item/GenericListItem",
    chatTemplate: "item/GenericItemChat",
  };
  value: ItemTypeConfig = {
    sheet: ValueSheet,
    listTemplate: "item/value/ValueListItem",
    chatTemplate: "item/GenericItemChat",
  };
}

export const itemTypes = new ItemTypes();
