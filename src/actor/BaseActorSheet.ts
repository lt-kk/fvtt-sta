import { sta } from "../config";
import { LooseObject } from "../util/util";
import { confirmDialog } from "../dialog/ConfimDialog";
import { StaActor } from "./StaActor";
import { StaSystemActor } from "./StaSystemActor";

export abstract class BaseActorSheet<STA extends StaActor> extends ActorSheet {

  get sta(): STA {
    return (this.actor as StaSystemActor).sta as unknown as STA;
  }

  override getData(options?: Partial<ItemSheet.Options>): Data {
    const data = super.getData(options) as ActorSheet.Data;
    let sheetData: Data = {
      ...data,
      ...this.additionalData(this.sta, data),
      settings: sta.settings,
      sta: (this.actor as StaSystemActor).sta!,
    };
    // console.log(sheetData);
    return sheetData;
  }

  additionalData(sta: STA, data: ActorSheet.Data): LooseObject<any> {
    return {};
  }

  override activateListeners(html: JQuery) {
    super.activateListeners(html);
    html.find(".control.create").on("click", this.handleCreate.bind(this));
    html.find(".control.edit").on("click", this.handleEdit.bind(this));
    html.find(".control.delete").on("click", this.handleDelete.bind(this));
    html.find(".control.roll").on("click", this.handleRoll.bind(this));
    html.find(".control.toggle").on("click", this.handleToggle.bind(this));
    html.find(".control.reset-status").on("click", this.handleResetStatus.bind(this));
    html.find(".item-list .item:has(.tooltip-container)").on("click", this.handleTooltip.bind(this));
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


  handleToggle(event: JQuery.ClickEvent) {
    event.preventDefault();
    const element = $(event.currentTarget);
    const field = element.data("toggle") as string;
    const itemId = this.findItemId(event);
    const item = this.actor.items.get(itemId)!;

    this.actor.updateEmbeddedDocuments("Item", [{
      _id: itemId,
      system: {
        [field]: !(item as LooseObject<any>).system[field] as boolean,
      },
    }]);
  }

  handleResetStatus(event: JQuery.ClickEvent) {
    event.preventDefault();
    this.sta!.resetStatus();
  }

  handleTooltip(event: JQuery.ClickEvent) {
    event.preventDefault();
    $(event.currentTarget).children(".tooltip-container")
      .toggleClass("hide");
  }


  findItemId(event: JQuery.ClickEvent) {
    const element = $(event.currentTarget);
    const itemEl = element.closest(".item");
    return itemEl.data("itemId");
  }
}

type Data = ActorSheet.Data & LooseObject<any> & {
  settings: object;
  sta: LooseObject<any>
};