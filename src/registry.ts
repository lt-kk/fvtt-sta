import {CharacterSheet} from "./actor/character/CharacterSheet";
import {StarshipSheet} from "./actor/starship/StarshipSheet";
import {ArmorSheet} from "./item/armor/ArmorSheet";
import {GenericItemSheet} from "./item/GenericItemSheet";
import { CharacterWeaponSheet } from "./item/characterweapon/CharacterWeaponSheet";
import { FocusSheet } from "./item/focus/FocusSheet";
import { InjurySheet } from "./item/injury/InjurySheet";
import { BelongingSheet } from "./item/belonging/BelongingSheet";


export interface ActorTypeConfig {
  sheet: typeof ActorSheet
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
  sheet: typeof ItemSheet
  listTemplate: string
  chatTemplate: string
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
  item: ItemTypeConfig = {
    sheet: BelongingSheet,
    listTemplate: `/item/GenericListItem.hbs`,
    chatTemplate: `/item/GenericItemChat.hbs`,
  };
  launchbay: ItemTypeConfig = {
    sheet: GenericItemSheet,
    listTemplate: `/item/GenericListItem.hbs`,
    chatTemplate: `/item/GenericItemChat.hbs`,
  };
  milestone: ItemTypeConfig = {
    sheet: GenericItemSheet,
    listTemplate: `/item/GenericListItem.hbs`,
    chatTemplate: `/item/GenericItemChat.hbs`,
  };
  refit: ItemTypeConfig = {
    sheet: GenericItemSheet,
    listTemplate: `/item/GenericListItem.hbs`,
    chatTemplate: `/item/GenericItemChat.hbs`,
  };
  starshipweapon: ItemTypeConfig = {
    sheet: GenericItemSheet,
    listTemplate: `/item/GenericListItem.hbs`,
    chatTemplate: `/item/GenericItemChat.hbs`,
  };
  talent: ItemTypeConfig = {
    sheet: GenericItemSheet,
    listTemplate: `/item/GenericListItem.hbs`,
    chatTemplate: `/item/GenericItemChat.hbs`,
  };
  trait: ItemTypeConfig = {
    sheet: GenericItemSheet,
    listTemplate: `/item/GenericListItem.hbs`,
    chatTemplate: `/item/GenericItemChat.hbs`,
  };
  value: ItemTypeConfig = {
    sheet: GenericItemSheet,
    listTemplate: `/item/GenericListItem.hbs`,
    chatTemplate: `/item/GenericItemChat.hbs`,
  };
}

export const itemTypes = new ItemTypes();
