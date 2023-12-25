import {
  StaCharacterArmor,
  StaCharacterFocus,
  StaCharacterMilestone,
  StaCharacterWeapon,
  StaInjury,
} from "./model/StaCharacter";
import { StaItem, StaLaunchbay, StaTalent, StaValue } from "./model/StaTypes";
import { StaStarshipWeapon } from "./model/StaStarship";

export const sta = {
  // this reference is here so TypeScript is happy...
  game: game as Game,
  systemName: "fvtt-sta",
  type: {
    item: {
      armor: StaCharacterArmor,
      characterweapon: StaCharacterWeapon,
      focus: StaCharacterFocus,
      injury: StaInjury,
      item: StaItem,
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
