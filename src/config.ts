import { StaArmor } from "./item/armor/StaArmor";
import { StaFocus } from "./item/focus/StaFocus";
import { StaMilestone } from "./item/milestone/StaMilestone";
import { StaCharacterWeapon } from "./item/characterweapon/StaCharacterWeapon";
import { StaInjury } from "./item/injury/StaInjury";
import { StaStarshipWeapon } from "./item/starshipweapon/StaStarshipWeapon";
import { StaItem } from "./item/item/StaItem";
import { StaLaunchbay } from "./item/launchbay/StaLaunchbay";
import { StaTalent } from "./item/talent/StaTalent";
import { StaValue } from "./item/value/StaValue";

const systemName = "fvtt-sta";

export const sta = {
  // this reference is here so TypeScript is happy...
  game: game as Game,
  systemName: systemName,
  templateBasePath: `systems/${systemName}/templates`,
  type: {
    item: {
      armor: StaArmor,
      characterweapon: StaCharacterWeapon,
      focus: StaFocus,
      injury: StaInjury,
      item: StaItem,
      launchbay: StaLaunchbay,
      milestone: StaMilestone,
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
      "value",
    ],
  },
  settings: {
    maxD20: 5, // not used in sheets
    maxD6: 10,
    item: {
      opportunity: {
        min: 0,
        max: 2,
      },
      escalation: {
        min: 0,
        max: 2,
      },
      armor: {
        protection: {
          min: 0,
          max: 4,
        },
      },
    },
  },
};
