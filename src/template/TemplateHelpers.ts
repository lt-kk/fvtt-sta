import { HelperOptions } from "handlebars";
import { sta } from "../config";

export function registerHandlebarHelpers() {
  Handlebars.registerHelper({
    range: range,
    onEmpty: onEmpty,
    tplPath: tplPath,
    isGM: isGM,
  });
}

function range(begin: number, end: number, content: HelperOptions) {
  let result = "";
  let direction = (begin <= end) ? 1 : -1;
  for (let i = begin; direction > 0 ? i <= end : i >= end; i += direction) {
    result += content.fn({ i: i, index: `${i}` });
  }
  return result;
}


function onEmpty(value: any, onEmpty: any, content: HelperOptions) {
  return value ? value : onEmpty;
}


export function tplPath(staPath: string, content?: HelperOptions) {
  if (staPath.startsWith("/")) staPath = staPath.substring(1);
  if (staPath.endsWith(".hbs")) staPath = staPath.substring(0, staPath.length - 4);
  return `${sta.templateBasePath}/${staPath}.hbs`;
}

function isGM(content: HelperOptions): number {
  return sta.game.user?.isGM ? 1 : 0;
}
