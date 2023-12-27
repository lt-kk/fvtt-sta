import { sta } from "../config";
import { LooseObject } from "../util";
import { confirmDialog } from "../util/ConfimDialog";

export class CharacterSheet extends ActorSheet {
  get template() {
    return `systems/fvtt-sta/templates/sheets/character-sheet.hbs`;
  }

  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      width: 850,
      height: 910,
    });
  }

  override getData(options?: Partial<ItemSheet.Options>): Data {
    const data = super.getData(options) as Data;
    let sheetData = {
      ...data,
      config: sta,
      sta: { // TODO replace with instance of StaCharacter
        armor: this.filterItems(data, "armor"),
        items: this.filterItems(data, "item"),
        focuses: this.filterItems(data, "focus"),
        injuries: this.filterItems(data, "injury"),
        milestones: this.filterItems(data, "milestone"),
        talents: this.filterItems(data, "talent"),
        traits: this.filterItems(data, "trait"),
        values: this.filterItems(data, "value"),
        weapons: this.filterItems(data, "characterweapon"),
      },
    };
    return sheetData;
  }

  private filterItems(data: Data, itemType: string): object[] {
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
          type: sta.game.i18n.localize(`sta.item.${item?.type}._singular`)
        }),
      ).render(true);
    }
  }

  handleRoll(event: JQuery.ClickEvent) {
    event.preventDefault();
    const element = $(event.currentTarget);
    const rollType = element.data("roll");
    const rollValue = element.data("value");
    const roll = new Roll(`${rollValue}${rollType}`);

    roll.roll();
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
  // known to be present
  data: {
    system: object;
    items: Items;
  };
  // derived
  config: object;
  sta: LooseObject
};