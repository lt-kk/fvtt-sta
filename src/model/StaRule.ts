import { sta } from "../config";

export class StaRule {
  name: string;
  script: string;

  constructor(name: string, script: string) {
    this.name = name;
    this.script = script;
  }


  run(scope: any) {
    const AsyncFunction = (async function() {
    }).constructor;
    try {
      const fn = AsyncFunction(`{${this.script}\n}`);
      return fn.call(scope);
    } catch (err) {
      console.log(`StaRule error ${this.name} threw:`, sta.game.user?.isGM ? scope : null, err);
      // ui.notifications!.warn(`StaRule error ${this.name} threw: ` + err); // TODO
    }
  }
}


export interface HasRule {
  rule: StaRule | undefined;
}