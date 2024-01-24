import { StaRollData, StaRollResult } from "../roll/StaRoll";
import { LooseObject } from "./util";

export interface HasActivateListeners {
  activateListeners(html: JQuery, message: ChatMessage): void;
}

export interface HasRolls {
  rolls: Roll[];
}


export function getActor(message: ChatMessage) {
  return (game as Game).actors!
    .get((message as LooseObject<any>).speaker.actor!)!;
}

export function getRollData<D extends StaRollData<any>>(message: ChatMessage): D {
  return (message as LooseObject<any>).rolls[0]!.data;
}

export function getRollResult<R extends StaRollResult<any>>(message: ChatMessage) {
  return getRollData(message).result as R;
}
