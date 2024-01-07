import { StaEntity } from "../model/StaSystemDocument";

export abstract class StaItem extends StaEntity {
  static type: string;

  description: string;

  constructor(
    id: string,
    name: string,
    img: string | null,
    description: string,
  ) {
    super(id, name, img);
    this.description = description;
  }
}
