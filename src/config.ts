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
