import { StaStatus } from "./StaTypes";

export class ScalePill {
  value: number;
  status: StaStatus;
  checked: boolean;

  constructor(value: number, status: StaStatus, checked: boolean) {
    this.value = value;
    this.status = status;
    this.checked = checked;
  }
}


export function generatePills(
  value: number,
  {
    begin = 0,
    end = 2,
    fatal = -1,
    error = -1,
    warn = -1,
    info = -1,
    success = -1,
    moreIsWorse = false,
  } = {}) {
  const direction = begin < end ? 1 : -1;
  const pills: ScalePill[] = [];
  [fatal, error, warn, info, success];

  for (let i = begin; direction > 0 ? i <= end : i >= end; i += direction) {
    const status: StaStatus = (fatal > -1 && (moreIsWorse ? i >= fatal : i <= fatal)) ? "fatal"
      : ((error > -1 && (moreIsWorse ? i >= error : i <= error)) ? "error"
        : ((warn > -1 && (moreIsWorse ? i >= warn : i <= warn)) ? "warn"
          : ((info > -1 && (moreIsWorse ? i >= info : i <= info)) ? "info"
            : ((success > -1 && (moreIsWorse ? i >= success : i <= success)) ? "success"
              : ""))));
    pills.push(new ScalePill(i, status, i == value));
  }
  return pills;
}
