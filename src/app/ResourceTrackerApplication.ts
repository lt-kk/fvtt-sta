import {tplPath} from "../template/TemplateHelpers";
import {sta} from "../config";
import {Resource, RESOURCE_TRACKER_SOCKET, Resources, ResourceTracker,} from "./ResourceTracker";
import {LooseObject} from "../util/util";

export class ResourceTrackerApplication extends Application implements ResourceTracker {

  static get defaultOptions() {
    const options = super.defaultOptions;
    options.template = tplPath("app/ResourceTracker.hbs");
    options.popOut = false;
    options.resizable = false;
    return options;
  }

  override getData(options?: Partial<ItemSheet.Options>): LooseObject<any> {
    const data = super.getData(options) as ActorSheet.Data;
    const resources: LooseObject<any> = {}
    Resources.forEach((r) => resources[r] = this.value(r))
    let sheetData = {
      ...data,
      settings: sta.settings,
      resources: resources,
    };
    // console.log(sheetData);
    return sheetData;
  }

  value(resource: Resource) {
    return sta.game.settings.get("sta", resource) as number
  }

  changeResource(resource: Resource, value: number, send: boolean) {
    sta.game.settings.set('sta', resource, value);
    this.updateView();
    if (send) this.send(new UpdateMessage(resource));
  }

  private updateView() {
    Resources.forEach((resource) => {
      const value = this.value(resource)
      $(document).find(`.property.${resource} .form-control`).val(value)
    })
  }


  activateListeners(html: JQuery) {
    super.activateListeners(html);
    html.find(".control.adjust").on("click", this.handleAdjust.bind(this))
    // html.find(".control .form-control").on("change", this.handleChange.bind(this))
    sta.game.socket!.on(RESOURCE_TRACKER_SOCKET, this.receive.bind(this));
  }

  private send(msg: Message) {
    sta.game.socket!.emit(RESOURCE_TRACKER_SOCKET, msg);
  }

  private receive(msg: Message) {
    if (msg.type == UpdateMessage.constructor.name) {
      this.updateView();
    } else if (msg.type == SetMessage.constructor.name) {
      this.changeResource(msg.resource, (msg as SetMessage).value, false);
    }
  }

  private handleAdjust(event: JQuery.ClickEvent) {
    event.preventDefault();
    let element = $(event.currentTarget);
    const resource = element.data("resource") as Resource
    const delta = parseInt(element.data("delta"))
    this.changeResource(resource, this.value(resource) + delta, true);
  }

  private handleChange(event: JQuery.ClickEvent) {
    event.preventDefault();
    let element = $(event.currentTarget);
    const resource = element.data("resource") as Resource
    const value = element.val()
    this.changeResource(resource, value, true);
  }
}


interface Message {
  type: string;
  resource: Resource;
}

class UpdateMessage implements Message {
  type = this.constructor.name;
  resource: Resource;

  constructor(resource: Resource) {
    this.resource = resource;
  }
}

class SetMessage implements Message {
  type = this.constructor.name;
  resource: Resource;
  value: number;

  constructor(resource: Resource, value: number) {
    this.resource = resource;
    this.value = value;
  }
}