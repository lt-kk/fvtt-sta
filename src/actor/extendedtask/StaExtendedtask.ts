import { actorItems, actorSystem, update } from "../../util/document";
import { StaActor } from "../StaActor";
import { sta } from "../../config";
import { CurrentValue } from "../../model/CurrentValue";
import { StaCharacterDisciplines } from "../character/StaCharacter";
import { generatePills, ScalePill } from "../../model/ScalePill";
import { filterTaskProgress, StaTaskProgress } from "../../item/taskprogress/StaTaskProgress";

export function createExtendedtask(document: Actor): StaExtendedtask {
  return new StaExtendedtask(
    document.id!,
    document.name!,
    document.img,
    actorSystem(document),
    actorItems(document),
  );
}

export const ExtendedtaskTypes = ["simple", "resisted", "challenge"];
export type ExtendedtaskType = typeof ExtendedtaskTypes[number];

export class StaExtendedtask extends StaActor {
  notes: string;
  type: ExtendedtaskType;
  leader: Actor | undefined;
  discipline: keyof StaCharacterDisciplines | undefined;
  difficulty: number;
  resistance: number;

  magnitude: number;
  work: CurrentValue;

  progress: StaTaskProgress[] = [];

  opposition: {
    resistance: number,
    work: number,
    magnitude: number,
    progress: StaTaskProgress[],
  };

  constructor(
    id: string,
    name: string,
    img: string | null,
    {
      notes = "",
      type = "simple",
      leader = "",
      discipline = "",
      difficulty = 1,
      resistance = 1,
      work = { value: 0, max: 5 },
      magnitude = 1,
      opposition = {
        resistance: 0,
        work: 0,
        magnitude: 0,
        progress: [],
      },
    } = {},
    items: Collection<Item>,
  ) {
    super(id, name, img);
    this.notes = notes;
    this.leader = sta.game.actors?.get(leader)
    this.discipline = discipline ? discipline as keyof StaCharacterDisciplines : undefined;
    this.type = type;
    this.difficulty = difficulty;
    this.resistance = resistance;
    this.work = new CurrentValue(work.value, work.max);
    this.magnitude = magnitude

    this.opposition = opposition;

    const progress = filterTaskProgress(items);
    this.progress = progress.filter(p => p.player)
    this.opposition.progress = progress.filter(p => !p.player)
  }

  derivedValues() {
    return {};
  }

  resetStatus() {
    const actor = sta.game.actors!.get(this.id);
    update(actor, {
      "work.value": 0,
      "magnitude.value": 0,
      "opposition.work": 0,
      "opposition.magnitude": 0,
    });
  }

  get typePills() {
    return ExtendedtaskTypes.map(type => {
      return new ScalePill(type, "", this.type == type)
    });
  }

  get leaderPills() {
    return sta.game.actors
      ?.filter(actor => actor.hasPlayerOwner)
      ?.map(actor => {
        return new ScalePill(
          actor.id,
          "",
          this.leader?.id == actor.id,
          actor.name!,
        )
      });
  }

  get disciplinePills() {
    return Object.keys(new StaCharacterDisciplines()).map(discipline => {
      return new ScalePill(
        discipline,
        "",
        this.discipline == discipline,
        sta.game.i18n.localize(`sta.discipline.${discipline}`),
      )
    });
  }
}
