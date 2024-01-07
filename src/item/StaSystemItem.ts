import { StaItem } from "./StaItem";
import { itemType } from "../registry";
import { tplPath } from "../template/TemplateHelpers";
import { itemSystem } from "../util/document";
import { StaSystemDocument } from "../model/StaSystemDocument";

export class StaSystemItem extends Item implements StaSystemDocument<StaItem> {
  sta: StaItem | undefined;

  tpl = {
    sheet: tplPath("item/GenericItemSheet"),
    listItem: tplPath("item/GenericListItem"),
    chat: tplPath("item/GenericItemChat"),
  };


  prepareBaseData() {
    super.prepareBaseData();
    const itemTypeConfig = itemType(this.type);
    this.sta = itemTypeConfig.entityFactory(this);
    // if (itemTypeConfig.listTemplate) this.tpl.listItem = itemTypeConfig.listTemplate;
    // if (itemTypeConfig.chatTemplate) this.tpl.chat = itemTypeConfig.chatTemplate;
  }

  prepareDerivedData() {
    super.prepareDerivedData();
    const system = itemSystem(this);
    const systemUpdates = this.sta!.derivedValues();
    mergeObject(system, systemUpdates);
  }

}