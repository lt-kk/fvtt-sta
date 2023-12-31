import { LooseObject } from "../util/util";

export class CurrentValue {
  value: number;
  max: number;
  min: number;

  constructor(value = 0, max = value, min = 0) {
    this.value = value;
    this.max = max;
    this.min = min;
  }
}

export type StaRange = "close" | "near" | "far" | "extreme";


export type HasStaEntity = {
  staEntity: LooseObject<any>,
}