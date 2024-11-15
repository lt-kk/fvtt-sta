import { StaRanges } from "./model/StaTypes";
import { ResourceTracker } from "./app/ResourceTracker";

const systemName = "fvtt-sta";

export const sta = {
  // this reference is here so TypeScript is happy...
  game: game as Game,
  systemName: systemName,
  templateBasePath: `systems/${systemName}/templates`,
  resourceTracker: undefined as ResourceTracker | undefined,
  settings: {
    maxD20: 5, // not used in sheets
    maxD6: 9,
    item: {
      opportunity: {
        max: 2,
      },
      escalation: {
        max: 3,
      },
      armor: {
        protection: {
          max: 4,
        },
      },
      characterweapon: {
        damage: {
          max: 4,
        },
      },
      starshipweapon: {
        damage: {
          max: 5,
        },
      },
    },
    ranges: StaRanges,
    maxMomentum: 6,
    maxThreat: 99,
    maxComplication: 5,
    maxTaskPool: 5,
  },
};
