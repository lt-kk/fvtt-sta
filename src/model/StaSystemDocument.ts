import { LooseObject } from "../util/util";

export interface StaSystemDocument<STA extends StaEntity> {
  sta: STA | undefined;
}

export abstract class StaEntity {
  id: string;
  name: string;
  img: string | null;

  constructor(id: string, name: string, img: string | null) {
    this.id = id;
    this.name = name;
    this.img = img;
  }

  derivedValues(): LooseObject<any> {
    return {};
  };
}
