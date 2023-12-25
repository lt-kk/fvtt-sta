export function registerHandlebarHelpers() {
  Handlebars.registerHelper("times", times);
}

function times(content: string, n: number) {
  console.log(arguments)
  let result = "";
  // for (let i = 0; i < n; i++) {
  //   result += content;
  // }
  return result;
}
