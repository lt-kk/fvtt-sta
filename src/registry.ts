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
    listTemplate: `/item/GenericListItem.hbs`,
    chatTemplate: `/item/armor/ArmorChat.hbs`,
  };
  characterweapon: ItemTypeConfig = {
    sheet: CharacterWeaponSheet,
    listTemplate: `/item/characterweapon/CharacterWeaponListItem.hbs`,
    chatTemplate: `/item/GenericItemChat.hbs`,
  };
  focus: ItemTypeConfig = {
    sheet: FocusSheet,
    listTemplate: `/item/GenericListItem.hbs`,
    chatTemplate: `/item/GenericItemChat.hbs`,
  };
  injury: ItemTypeConfig = {
    sheet: InjurySheet,
    listTemplate: `/item/GenericListItem.hbs`,
    chatTemplate: `/item/GenericItemChat.hbs`,
  };
  launchbay: ItemTypeConfig = {
    sheet: LaunchbaySheet,
    listTemplate: `/item/GenericListItem.hbs`,
    chatTemplate: `/item/GenericItemChat.hbs`,
  };
  milestone: ItemTypeConfig = {
    sheet: MilestoneSheet,
    listTemplate: `/item/GenericListItem.hbs`,
    chatTemplate: `/item/GenericItemChat.hbs`,
  };
  refit: ItemTypeConfig = {
    sheet: RefitSheet,
    listTemplate: `/item/GenericListItem.hbs`,
    chatTemplate: `/item/GenericItemChat.hbs`,
  };
  starshipweapon: ItemTypeConfig = {
    sheet: StarshipWeaponSheet,
    listTemplate: `/item/GenericListItem.hbs`,
    chatTemplate: `/item/GenericItemChat.hbs`,
  };
  talent: ItemTypeConfig = {
    sheet: TalentSheet,
    listTemplate: `/item/GenericListItem.hbs`,
    chatTemplate: `/item/GenericItemChat.hbs`,
  };
  thing: ItemTypeConfig = {
    sheet: ThingSheet,
    listTemplate: `/item/GenericListItem.hbs`,
    chatTemplate: `/item/GenericItemChat.hbs`,
  };
  trait: ItemTypeConfig = {
    sheet: TraitSheet,
    listTemplate: `/item/GenericListItem.hbs`,
    chatTemplate: `/item/GenericItemChat.hbs`,
  };
  value: ItemTypeConfig = {
    sheet: ValueSheet,
    listTemplate: `/item/GenericListItem.hbs`,
    chatTemplate: `/item/GenericItemChat.hbs`,
  };
}

export const itemTypes = new ItemTypes();
