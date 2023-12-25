import {
  StaCharacterArmor,
  StaCharacterFocus,
  StaCharacterMilestone,
  StaCharacterWeapon,
  StaInjury,
} from "./model/StaCharacter";
import { StaEquipment, StaLaunchbay, StaTalent, StaValue } from "./model/StaTypes";
import { StaStarshipWeapon } from "./model/StaStarship";

export const sta = {
  game: game as Game,
  systemName: "fvtt-sta",
  type: {
    item: {
      armor: StaCharacterArmor,
      characterweapon: StaCharacterWeapon,
      focus: StaCharacterFocus,
      injury: StaInjury,
      item: StaEquipment,
      launchbay: StaLaunchbay,
      milestone: StaCharacterMilestone,
      starshipweapon: StaStarshipWeapon,
      talent: StaTalent,
      value: StaValue,
    },
    characterItem: [
      "armor",
      "characterweapon",
      "focus",
      "injury",
      "item",
      "milestone",
      "talent",
      "value"
    ]
  },
};
