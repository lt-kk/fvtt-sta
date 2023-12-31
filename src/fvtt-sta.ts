import "../styles/fvtt-sta.less";
import { sta } from "./config";
import { registerHandlebarHelpers } from "./template/TemplateHelpers";
import { itemTypes, StaItem } from "./item/StaItem";
import { actorTypes, StaActor } from "./actor/StaActor";

Hooks.on("init", () => {
  console.log(sta.systemName + " | Initializing system...");
  sta.game = game as Game;

  CONFIG.Actor.documentClass = StaActor;
  CONFIG.Item.documentClass = StaItem;

  registerTemplates();
  registerActorSheets();
  registerItemSheets();
});

Hooks.on("ready", () => {
  console.log(sta.systemName + " | Initialization complete!");
});


function registerActorSheets() {
  Actors.unregisterSheet("core", ActorSheet);
  Object.entries(actorTypes)
    .forEach(([type, config]) =>
      Actors.registerSheet(sta.systemName, config.sheet, { types: [type] }),
    );
}

function registerItemSheets() {
  Items.unregisterSheet("core", ItemSheet);
  Object.entries(itemTypes)
    .forEach(([type, config]) =>
      Actors.registerSheet(sta.systemName, config.sheet, { types: [type] }),
    );
}

function registerTemplates() {
  registerHandlebarHelpers();
  loadTemplates([]);
}
