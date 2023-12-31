import {
  ChatMessageDataConstructorData,
} from "@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/data.mjs/chatMessageData";
import { sta } from "../config";
import { LooseObject } from "../util/util";
import { ArmorSheet } from "./armor/ArmorSheet";
import { GenericItemSheet } from "./GenericItemSheet";
import { ItemData } from "@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/data.mjs";


type StaEntityFactory = (data: ItemData) => LooseObject<any>;
const simpleEntityFactory: StaEntityFactory = (data) => {
  return {
    name: data.name,
  };
};

export interface ItemType {
  sheet: typeof ItemSheet;
  chatTemplate: string;
}

export const itemTypes: LooseObject<ItemType> = {
  armor: {
    sheet: ArmorSheet,
    chatTemplate: `${sta.templateBasePath}/item/armor/ArmorItemChat.hbs`,
  },
  characterweapon: {
    sheet: GenericItemSheet,
    chatTemplate: `${sta.templateBasePath}/item/GenericItemChat.hbs`,
  },
  focus: {
    sheet: GenericItemSheet,
    chatTemplate: `${sta.templateBasePath}/item/GenericItemChat.hbs`,
  },
  injury: {
    sheet: GenericItemSheet,
    chatTemplate: `${sta.templateBasePath}/item/GenericItemChat.hbs`,
  },
  item: {
    sheet: GenericItemSheet,
    chatTemplate: `${sta.templateBasePath}/item/GenericItemChat.hbs`,
  },
  launchbay: {
    sheet: GenericItemSheet,
    chatTemplate: `${sta.templateBasePath}/item/GenericItemChat.hbs`,
  },
  milestone: {
    sheet: GenericItemSheet,
    chatTemplate: `${sta.templateBasePath}/item/GenericItemChat.hbs`,
  },
  refit: {
    sheet: GenericItemSheet,
    chatTemplate: `${sta.templateBasePath}/item/GenericItemChat.hbs`,
  },
  starshipweapon: {
    sheet: GenericItemSheet,
    chatTemplate: `${sta.templateBasePath}/item/GenericItemChat.hbs`,
  },
  talent: {
    sheet: GenericItemSheet,
    chatTemplate: `${sta.templateBasePath}/item/GenericItemChat.hbs`,
  },
  trait: {
    sheet: GenericItemSheet,
    chatTemplate: `${sta.templateBasePath}/item/GenericItemChat.hbs`,
  },
  value: {
    sheet: GenericItemSheet,
    chatTemplate: `${sta.templateBasePath}/item/GenericItemChat.hbs`,
  },
};


export class StaItem extends Item {

  constructor(
    data: ConstructorParameters<typeof foundry.documents.BaseItem>[0],
    context?: ConstructorParameters<typeof foundry.documents.BaseItem>[1],
  ) {
    super(data, context);
  }

  get currentType(): ItemType {
    return itemTypes[this.type as keyof typeof itemTypes];
  }


  async roll() {
    const templateData = {
      ...this.data,
      owner: this.actor?.id,
    };
    const html = await renderTemplate(this.currentType.chatTemplate, templateData);

    const msgData: ChatMessageDataConstructorData = {
      user: sta.game.user?.id,
      speaker: ChatMessage.getSpeaker(),
      content: html,
    };
    return ChatMessage.create(msgData);
  }
}
