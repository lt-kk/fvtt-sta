import { mapItems } from "../../util/actor";
import { itemSystem } from "../../util/document";
import { StaItem } from "../StaItem";


export function createTaskProgress(document: Item): StaTaskProgress {
  return new StaTaskProgress(document.id!, document.name!, document.img, itemSystem(document));
}

export function filterTaskProgress(source: Actor | Collection<Item>) {
  return mapItems(source, StaTaskProgress.type, createTaskProgress);
}


export class StaTaskProgress extends StaItem {
  static type = "taskprogress";

  player: boolean;
  hits: number;
  breakthroughs: number

  constructor(
    id: string,
    name = "",
    img: string | null,
    {
      description = "",
      player = true,
      hits = 0,
      breakthroughs = 0,
    },
  ) {
    super(id, name, img, description);
    this.player = player;
    this.hits = hits;
    this.breakthroughs = breakthroughs;
  }
}
