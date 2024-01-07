import { StaEntity } from "../model/StaSystemDocument";

export abstract class StaActor extends StaEntity {
  abstract resetStatus(): void;
}
