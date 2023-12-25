import {
  StaCharacter,
  StaCharacterArmor,
  StaCharacterFocus,
  StaCharacterMilestone,
  StaCharacterWeapon,
  StaInjury,
} from "./StaCharacter";
import { StaStarship, StaStarshipWeapon } from "./StaStarship";
import { StaEquipment, StaLaunchbay, StaTalent } from "./StaTypes";

export const staTypeMappings = {
  actor: {
    character: StaCharacter,
    starship: StaStarship,
  },
  item: {
    item: StaEquipment,
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
