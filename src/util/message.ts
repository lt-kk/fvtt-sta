import {StaRollResult} from "../roll/StaRoll";
import {LooseObject} from "./util";

export interface HasActivateListeners {
  activateListeners(html: JQuery, message: ChatMessage): void;
}


export function getActor(message: ChatMessage) {
  return (game as Game).actors!
    .get((message as LooseObject<any>).speaker.actor!)!;
}

export function getRollResult<R extends StaRollResult<any>>(message: ChatMessage) {
  return (message as LooseObject<any>).rolls[0]!.data.result as R;
}
