import { sta } from "../config";

export class CharacterSheet extends ActorSheet {
  get template() {
    return `systems/fvtt-sta/templates/sheets/character-sheet.hbs`;
  }

  override getData(options?: Partial<ItemSheet.Options>): Data {
    const data = super.getData(options) as Data;
    return {
      ...data,
      config: sta,
      fields: Object.keys(data.data.system),
    };
  }
}

type Data = ActorSheet.Data & {
  // known to be present
  data: {
    system: object;
  };
  // derived
  config: object;
  fields: string[];
};
