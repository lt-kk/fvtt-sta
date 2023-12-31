import { LooseObject } from "../util/util";

export class CurrentValue {
  value: number;
  max: number;

  constructor(value = 0, max = value) {
    this.value = value;
    this.max = max;
  }
}

export type StaRange = "close" | "near" | "far" | "extreme";


export type HasStaEntity = {
  staEntity: LooseObject<any>,
}