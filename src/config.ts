import { StaRanges } from "./model/StaTypes";

const systemName = "fvtt-sta";

export const sta = {
  // this reference is here so TypeScript is happy...
  game: game as Game,
  systemName: systemName,
  templateBasePath: `systems/${systemName}/templates`,
  settings: {
    maxD20: 5, // not used in sheets
    maxD6: 9,
    item: {
      opportunity: {
        max: 2,
      },
      escalation: {
        max: 2,
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
    },
    ranges: StaRanges
  },
};
