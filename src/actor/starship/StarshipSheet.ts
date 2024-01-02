import { sta } from "../../config";
import { LooseObject } from "../../util/util";
import { confirmDialog } from "../../dialog/ConfimDialog";
import { createStarship, StaStarship } from "./StaStarship";
import { starshipTaskRoll } from "./StarshipTaskRoll";
import { challengeRoll } from "../../roll/ChallangeRoll";

export class StarshipSheet extends ActorSheet {
  static templatePath = `${sta.templateBasePath}/actor/starship/StarshipSheet.hbs`;

  sta: StaStarship | null = null;

  get template() {
    return StarshipSheet.templatePath;
  }

  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["sta-app", "actor-sheet", "starship-sheet"],
      width: 640,
      height: 870,
    });
  }

  override getData(options?: Partial<ItemSheet.Options>): Data {
    const data = super.getData(options) as ActorSheet.Data;
    this.sta = createStarship(data.actor);
    let sheetData: Data = {
      ...data,
      settings: sta.settings,
      sta: this.sta,
    };
    return sheetData;
  }

  private filterItems(data: ActorSheet.Data, itemType: string): object[] {
    return data.items.filter((item) => {
      return item.type === itemType;
    });
  }

  override activateListeners(html: JQuery) {
    super.activateListeners(html);
    html.find(".control.create").on("click", this.handleCreate.bind(this));
    html.find(".control.edit").on("click", this.handleEdit.bind(this));
    html.find(".control.delete").on("click", this.handleDelete.bind(this));
    html.find(".control.roll").on("click", this.handleRoll.bind(this));
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
    const rollType = element.data("roll");
    const dicePool = element.data("value");
    switch (rollType) {
      case "task":
        this.rollTask(dicePool);
        break;
      case "challenge":
        this.rollChallenge(dicePool);
        break;
    }

  }

  async rollTask(dicePool: number) {
    const roll = starshipTaskRoll(this.sta!, dicePool);
    roll.toMessage({
      speaker: ChatMessage.getSpeaker({ actor: this.actor }),
    });
  }

  rollChallenge(dicePool: number) {
    const roll = challengeRoll(dicePool);
    roll.toMessage({
      speaker: ChatMessage.getSpeaker({ actor: this.actor }),
    });
  }

  private findItemId(event: JQuery.ClickEvent<any, any, any, any>) {
    const element = $(event.currentTarget);
    const itemEl = element.closest(".item");
    return itemEl.data("itemId");
  }
}

type Data = ActorSheet.Data & {
  settings: object;
  sta: LooseObject<any>
};