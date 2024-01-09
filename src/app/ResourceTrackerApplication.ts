import { tplPath } from "../template/TemplateHelpers";
import { sta } from "../config";
import { Resource, Resources, ResourceTracker, SocketMessage, STA_SOCKET } from "./ResourceTracker";
import { constrainNumber, LooseObject } from "../util/util";

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
    const resources: LooseObject<any> = {};
    Resources.forEach((r) => resources[r] = {
      value: this.value(r),
      plus: this.mayChange(r, 1) != "denied",
      minus: this.mayChange(r, -1) != "denied",
    });
    return {
      ...data,
      settings: sta.settings,
      resources: resources,
    };
  }

  value(resource: Resource) {
    return sta.game.settings.get("sta", resource) as number;
  }

  changeResource(resource: Resource, delta: number, userName: string) {
    const changeable = this.mayChange(resource, delta);
    switch (changeable) {
      case "permitted":
        this.changeResourcePermitted(resource, delta);
        break;
      case "delegated":
        if (userName == sta.game.user?.name!) { // prevent endless loop
          this.send(new AdjustResourceMessage(resource, this.value(resource), delta, sta.game.user?.name!));
        }
        break;
      default:
        ui.notifications?.error(`You may not change ${resource}`);
    }
  }

  private changeResourcePermitted(resource: string, delta: number) {
    let newValue = constrainNumber(this.value(resource) + delta, 0, this.maxValue(resource));
    sta.game.settings.set("sta", resource, newValue).then(() => {
      this.updateView();
      this.send(new ResourceChangedMessage(resource));
    });
  }

  maxValue(resource: Resource): number {
    switch (resource) {
      case "momentum":
        return sta.settings.maxMomentum;
      case "threat":
        return sta.settings.maxThreat;
    }
    return 99;
  }

  mayChange(resource: Resource, delta: number): Changeable {
    if (sta.game.user?.isGM) return "permitted";
    switch (resource) {
      case "momentum":
        return delta < 0 ? "delegated" : "denied";
      case "threat":
        return delta > 0 ? "delegated" : "denied";
    }
    return "denied";
  }

  private updateView() {
    Resources.forEach((resource) => {
      const value = this.value(resource);
      const trackerEl = $(document).find(".resource-tracker").first();
      const element = trackerEl.find(`.tracker-${resource} .form-control`);
      element.val(value);
    });
  }

  activateListeners(html: JQuery) {
    super.activateListeners(html);
    html.find(".control.adjust").on("click", this.handleAdjust.bind(this));
    sta.game.socket!.on(STA_SOCKET, this.receive.bind(this)); // TODO more general place
  }

  private send(msg: ResourceTrackerMessage) {
    sta.game.socket!.emit(STA_SOCKET, msg);
  }

  receive(msg: ResourceTrackerMessage) {
    if (msg.type == ResourceChangedMessage.name) {
      this.updateView();
    } else if (msg.type == AdjustResourceMessage.name) {
      let adjustMessage = msg as AdjustResourceMessage;
      if (adjustMessage.old == this.value(adjustMessage.resource)) { // keep data integrity
        this.changeResource(msg.resource, adjustMessage.delta, adjustMessage.userName);
      }
    }
  }

  private handleAdjust(event: JQuery.ClickEvent) {
    event.preventDefault();
    let element = $(event.currentTarget);
    const resource = element.data("resource") as Resource;
    let delta = parseInt(element.data("delta"));
    if (event.ctrlKey && sta.game.user?.isGM) {
      if (delta < 0) delta = -this.value(resource);
      if (delta > 0) delta = this.maxValue(resource);
    }
    this.changeResource(resource, delta, sta.game.user?.name!);
  }
}


type Changeable = "denied" | "permitted" | "delegated";

interface ResourceTrackerMessage extends SocketMessage {
  resource: Resource;
}

class ResourceChangedMessage implements ResourceTrackerMessage {
  type = this.constructor.name;
  resource: Resource;

  constructor(resource: Resource) {
    this.resource = resource;
  }
}

class AdjustResourceMessage implements ResourceTrackerMessage {
  type = this.constructor.name;
  resource: Resource;
  old: number;
  delta: number;
  userName: string;

  constructor(resource: Resource, old: number, delta: number, userName: string) {
    this.resource = resource;
    this.old = old;
    this.delta = delta;
    this.userName = userName;
  }
}