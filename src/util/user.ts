import { sta } from "../config";
import { StaSystemActor } from "../actor/StaSystemActor";

export function currentTargets<A extends StaSystemActor>(): A[] {
  const result: A[] = [];
  sta.game.user?.targets.forEach((token) => {
    if (token.actor) result.push(token.actor as A);
  });
  return result;
}