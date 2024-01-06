import { createCharacter, StaCharacter } from "./character/StaCharacter";
import { sta } from "../config";
import { LooseObject } from "../util/util";
import { confirmDialog } from "../dialog/ConfimDialog";
import { StaActor } from "./StaActor";

export abstract class BaseActorSheet<STA extends StaActor> extends ActorSheet {
  sta: STA | null = null;

  override getData(options?: Partial<ItemSheet.Options>): Data {
    const data = super.getData(options) as ActorSheet.Data;
    this.sta = this.createSta(data.actor);
    let sheetData: Data = {
      ...data,
      settings: sta.settings,
      sta: this.sta!,
      templatePath: sta.templateBasePath,
    };
    return sheetData;
  }

  abstract createSta(document: Actor): STA

  override activateListeners(html: JQuery) {
    super.activateListeners(html);
    html.find(".control.create").on("click", this.handleCreate.bind(this));
    html.find(".control.edit").on("click", this.handleEdit.bind(this));
    html.find(".control.delete").on("click", this.handleDelete.bind(this));
    html.find(".control.roll").on("click", this.handleRoll.bind(this));
    html.find(".control.reset-status").on("click", this.handleResetStatus.bind(this));
  }

  handleCreate(event: JQuery.ClickEvent) {
    event.preventDefault();
    const type = $(event.currentTarget).data("type");
    const itemData = {
      name: sta.game.i18n.localize(`sta.item.${type}.create`),
      type: type,
      data: {},
    };
    this.actor.createEmbeddedDocuments("Item", [(itemData)]);
  }

  handleEdit(event: JQuery.ClickEvent) {
    event.preventDefault();
    const itemId = this.findItemId(event);
    const item = this.actor.items.get(itemId);
    item?.sheet?.render(true);
  }

  handleDelete(event: JQuery.ClickEvent) {
    event.preventDefault();
    const itemId = this.findItemId(event);
    const doDelete = () => {
      this.actor.deleteEmbeddedDocuments("Item", [itemId]);
    };
    if (event.ctrlKey) {
      this.actor.deleteEmbeddedDocuments("Item", [itemId]);
    } else {
      const item = this.actor.items.get(itemId);
      confirmDialog(
        doDelete,
        sta.game.i18n.localize("sta.confirm.delete.title"),
        sta.game.i18n.format("sta.confirm.delete.content", {
          ...item,
          type: sta.game.i18n.localize(`sta.item.${item?.type}._singular`),
        }),
      ).render(true);
    }
  }

  handleRoll(event: JQuery.ClickEvent) {
    event.preventDefault();
    const element = $(event.currentTarget);
    const dicePool = element.data("value") as number;
    switch (element.data("roll")) {
      case "task":
        this.rollTask(dicePool);
        break;
      case "challenge":
        this.rollChallenge(dicePool);
        break;
      case "weapon":
        this.rollWeapon(element);
        break;
    }
  }

  abstract rollTask(dicePool: number): Promise<any>
  abstract rollChallenge(dicePool: number): Promise<any>
  abstract rollWeapon(html: JQuery): Promise<any>

  findItemId(event: JQuery.ClickEvent<any, any, any, any>) {
    const element = $(event.currentTarget);
    const itemEl = element.closest(".item");
    return itemEl.data("itemId");
  }

  handleResetStatus(event: JQuery.ClickEvent) {
    this.sta?.resetStatus()
  }

}

type Data = ActorSheet.Data & LooseObject<any> & {
  settings: object;
  sta: LooseObject<any>
};