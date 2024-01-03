import {sta} from "../config";

export class GenericItemSheet extends ItemSheet {
  static templatePath = `${sta.templateBasePath}/item/characterweapon/CharacterWeaponSheet.hbs`;

  get template() {
    return GenericItemSheet.templatePath;
  }

  override getData(options?: Partial<ItemSheet.Options>): Data {
    const data = super.getData(options) as Data;
    return {
      ...data,
      settings: sta.settings,
      fields: Object.keys(data.data.system),
    };
  }
}

type Data = ItemSheet.Data & {
  // known to be present
  data: {
    system: object;
  };
  // derived
  settings: object;
  fields: string[];
};
