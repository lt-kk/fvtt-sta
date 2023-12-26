export function registerHandlebarHelpers() {
  Handlebars.registerHelper("range", range);
}

function range(begin: number, end: number, content: HandlebarsContent) {
  let result = "";
  let direction = (begin <= end) ? 1 : -1;
  for (let i = begin; direction > 0 ? i <= end : i >= end; i += direction) {
    result += content.fn({ i: i, index: `${i}` });
  }
  return result;
}


type HandlebarsContent = {
  fn(context: object): string
}
