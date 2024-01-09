import { HelperOptions } from "handlebars";
import { sta } from "../config";
import { e } from "vitest/dist/reporters-O4LBziQ_";

export function registerHandlebarHelpers() {
  Handlebars.registerHelper({
    range: range,
    onEmpty: (value, onEmpty) => value ? value : onEmpty,
    tplPath: tplPath,
    isGM: () => !!sta.game.user?.isGM,
    add: (a, b) => parseFloat(a) + parseFloat(b),
    min: (a, b) => parseFloat(a) < parseFloat(b) ? a : b,
    max: (a, b) => parseFloat(a) > parseFloat(b) ? a : b,
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

export function tplPath(staPath: string, content?: HelperOptions) {
  if (staPath.startsWith("/")) staPath = staPath.substring(1);
  if (staPath.endsWith(".hbs")) staPath = staPath.substring(0, staPath.length - 4);
  return `${sta.templateBasePath}/${staPath}.hbs`;
}

