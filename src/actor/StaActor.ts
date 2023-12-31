import { LooseObject } from "../util/util";
import { CharacterSheet } from "./character/CharacterSheet";
import { StarshipSheet } from "./starship/StarshipSheet";
import { ActorData } from "@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/data.mjs";


type StaEntityFactory = (data: ActorData) => LooseObject<any>
const simpleEntityFactory: StaEntityFactory = (data) => {
  return {
    name: data.name,
  };
};

export interface ActorType {
  sheet: typeof ActorSheet,
}

export const actorTypes: LooseObject<ActorType> = {
  character: {
    sheet: CharacterSheet,
  },
  starship: {
    sheet: StarshipSheet,
  },
};


export class StaActor extends Actor {

  constructor(
    data: ConstructorParameters<typeof foundry.documents.BaseActor>[0],
    context?: ConstructorParameters<typeof foundry.documents.BaseActor>[1],
  ) {
    super(data, context);
  }

  get currentType(): ActorType {
    return actorTypes[this.type as keyof typeof actorTypes];
  }
}
