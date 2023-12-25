import { sta } from "../config";
import { LooseObject } from "../util";

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
      }
    };
    console.log(sheetData)
    return sheetData;
  }

  private filterItems(data: Data, itemType: string): object[] {
    return data.items.filter((item) => {
      return item.type === itemType;
    });
  }

  override activateListeners(html: JQuery) {
    super.activateListeners(html);
    html.find(".control.create").on("click", this.handleCreate.bind(this))
    html.find(".control.edit").on("click", this.handleEdit.bind(this))
    html.find(".control.delete").on("click", this.handleDelete.bind(this))
  }

  handleCreate(event: JQuery.ClickEvent) {
    event.preventDefault()
    const type = $(event.currentTarget).data("type")
    const itemData = {
      name: sta.game.i18n.localize(`sta.item.${type}.create`),
      type: type,
      data: {},
    };
    return this.actor.createEmbeddedDocuments('Item', [(itemData)]);
  }

  handleEdit(event: JQuery.ClickEvent) {
    event.preventDefault()
    const itemId = this.findItemId(event);
    const item = this.actor.items.get(itemId)
    item?.sheet?.render(true)
  }
  handleDelete(event: JQuery.ClickEvent) {
    event.preventDefault()
    const itemId = this.findItemId(event);
    return this.actor.deleteEmbeddedDocuments("Item", [itemId]);
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