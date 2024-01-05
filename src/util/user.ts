import { sta } from "../config";

export function currentTargets() {
  const result: Actor[] = [];
  sta.game.user?.targets.forEach((token) => {
    if (token.actor) result.push(token.actor);
  });
  return result;
}