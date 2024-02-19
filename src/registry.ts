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
import { StaActor } from "./actor/StaActor";
import { createCharacter } from "./actor/character/StaCharacter";
import { createStarship } from "./actor/starship/StaStarship";
import { StaItem } from "./item/StaItem";
import { createArmor } from "./item/armor/StaArmor";
import { createValue } from "./item/value/StaValue";
import { createTrait } from "./item/trait/StaTrait";
import { createThing } from "./item/thing/StaThing";
import { createTalent } from "./item/talent/StaTalent";
import { createStarshipWeapon } from "./item/starshipweapon/StaStarshipWeapon";
import { createRefit } from "./item/refit/StaRefit";
import { createMilestone } from "./item/milestone/StaMilestone";
import { createLaunchbay } from "./item/launchbay/StaLaunchbay";
import { createInjury } from "./item/injury/StaInjury";
import { createFocus } from "./item/focus/StaFocus";
import { createCharacterWeapon } from "./item/characterweapon/StaCharacterWeapon";
import { createSmallcraft } from "./actor/smallcraft/StaSmallcraft";
import { SmallcraftSheet } from "./actor/smallcraft/SmallcraftSheet";
import { createExtendedtask } from "./actor/extendedtask/StaExtendedtask";
import { ExtendedtaskSheet } from "./actor/extendedtask/ExtendedtaskSheet";
import { createTaskProgress } from "./item/taskprogress/StaTaskProgress";
import { TaskProgressSheet } from "./item/taskprogress/TaskProgressSheet";


export interface ActorTypeConfig {
  entityFactory: (actor: Actor) => StaActor;
  sheet: typeof ActorSheet;
}

// noinspection JSUnusedGlobalSymbols
export class ActorTypes {
  character: ActorTypeConfig = {
    entityFactory: createCharacter,
    sheet: CharacterSheet,
  };
  starship: ActorTypeConfig = {
    entityFactory: createStarship,
    sheet: StarshipSheet,
  };
  smallcraft: ActorTypeConfig = {
    entityFactory: createSmallcraft,
    sheet: SmallcraftSheet,
  };
  extendedtask: ActorTypeConfig = {
    entityFactory: createExtendedtask,
    sheet: ExtendedtaskSheet,
  };
}

export const actorTypes = new ActorTypes();

export function actorType(type: string): ActorTypeConfig {
  return actorTypes[type as keyof ActorTypes] as ActorTypeConfig;
}


export interface ItemTypeConfig {
  entityFactory: (item: Item) => StaItem;
  sheet: typeof ItemSheet;
  listTemplate: string;
  chatTemplate: string;
}

class ItemTypes {
  armor: ItemTypeConfig = {
    entityFactory: createArmor,
    sheet: ArmorSheet,
    listTemplate: "item/armor/ArmorListItem",
    chatTemplate: "item/armor/ArmorChat",
  };
  characterweapon: ItemTypeConfig = {
    entityFactory: createCharacterWeapon,
    sheet: CharacterWeaponSheet,
    listTemplate: "item/characterweapon/CharacterWeaponListItem",
    chatTemplate: "item/GenericItemChat",
  };
  focus: ItemTypeConfig = {
    entityFactory: createFocus,
    sheet: FocusSheet,
    listTemplate: "item/GenericListItem",
    chatTemplate: "item/GenericItemChat",
  };
  injury: ItemTypeConfig = {
    entityFactory: createInjury,
    sheet: InjurySheet,
    listTemplate: "item/injury/InjuryListItem",
    chatTemplate: "item/GenericItemChat",
  };
  launchbay: ItemTypeConfig = {
    entityFactory: createLaunchbay,
    sheet: LaunchbaySheet,
    listTemplate: "item/GenericListItem",
    chatTemplate: "item/GenericItemChat",
  };
  milestone: ItemTypeConfig = {
    entityFactory: createMilestone,
    sheet: MilestoneSheet,
    listTemplate: "item/GenericListItem",
    chatTemplate: "item/GenericItemChat",
  };
  refit: ItemTypeConfig = {
    entityFactory: createRefit,
    sheet: RefitSheet,
    listTemplate: "item/refit/RefitListItem",
    chatTemplate: "item/GenericItemChat",
  };
  starshipweapon: ItemTypeConfig = {
    entityFactory: createStarshipWeapon,
    sheet: StarshipWeaponSheet,
    listTemplate: "item/starshipweapon/StarshipWeaponListItem",
    chatTemplate: "item/GenericItemChat",
  };
  talent: ItemTypeConfig = {
    entityFactory: createTalent,
    sheet: TalentSheet,
    listTemplate: "item/GenericListItem",
    chatTemplate: "item/GenericItemChat",
  };
  taskprogress: ItemTypeConfig = {
    entityFactory: createTaskProgress,
    sheet: TaskProgressSheet,
    listTemplate: "item/GenericListItem",
    chatTemplate: "item/GenericItemChat",
  };
  thing: ItemTypeConfig = {
    entityFactory: createThing,
    sheet: ThingSheet,
    listTemplate: "item/thing/ThingListItem",
    chatTemplate: "item/GenericItemChat",
  };
  trait: ItemTypeConfig = {
    entityFactory: createTrait,
    sheet: TraitSheet,
    listTemplate: "item/GenericListItem",
    chatTemplate: "item/GenericItemChat",
  };
  value: ItemTypeConfig = {
    entityFactory: createValue,
    sheet: ValueSheet,
    listTemplate: "item/value/ValueListItem",
    chatTemplate: "item/GenericItemChat",
  };
}

export const itemTypes = new ItemTypes();

export function itemType(type: string): ItemTypeConfig {
  return (itemTypes[type as keyof ItemTypes] as ItemTypeConfig);
}
