import { generatePills } from "./ScalePill";

export class CurrentValue {
  value: number;
  max: number;
  min: number;

  constructor(value = 0, max = value, min = 0) {
    this.value = value;
    this.max = max;
    this.min = min;
  }

  get pills() {
    return generatePills(this.value, {
      begin: this.min, end: this.max, fatal: 0,
    });
  };
}
