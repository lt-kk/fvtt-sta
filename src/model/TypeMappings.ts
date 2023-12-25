import {
  StaCharacter,
  StaCharacterArmor,
  StaCharacterFocus,
  StaCharacterMilestone,
  StaCharacterWeapon,
  StaInjury,
} from "./StaCharacter";
import { StaStarship, StaStarshipWeapon } from "./StaStarship";
import { StaItem, StaLaunchbay, StaTalent } from "./StaTypes";

export const staTypeMappings = {
  actor: {
    character: StaCharacter,
    starship: StaStarship,
  },
  item: {
    item: StaItem,
    focus: StaCharacterFocus,
    characterweapon: StaCharacterWeapon,
    starshipweapon: StaStarshipWeapon,
    armor: StaCharacterArmor,
    talent: StaTalent,
    milestone: StaCharacterMilestone,
    injury: StaInjury,
    smallcraftcontainer: StaLaunchbay,
  },
};
