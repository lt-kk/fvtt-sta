import "../styles/fvtt-sta.less";
import { registerHandlebarHelpers } from "./template/TemplateHelpers";
import { TaskRoll } from "./roll/TaskRoll";
import { ChallengeRoll } from "./roll/ChallangeRoll";
import { HasRolls } from "./util/util";
import { CharacterWeaponRoll } from "./item/characterweapon/CharacterWeaponRoll";
import { HasActivateListeners } from "./util/message";
import { ActorTypeConfig, actorTypes, ItemTypeConfig, itemTypes } from "./registry";
import { sta } from "./config";

Hooks.once("init", () => {
  console.log(sta.systemName + " | Initializing system...");
  sta.game = game as Game;

  // CONFIG.Actor.documentClass = StaActor;
  // CONFIG.Item.documentClass = StaItem;
  CONFIG.Dice.rolls = [Roll, ChallengeRoll, TaskRoll, CharacterWeaponRoll];

  registerTemplates();
  registerActorSheets();
  registerItemSheets();
});

Hooks.on("renderChatMessage", (message, html) => {
  if (message.isRoll) {
    (message as unknown as HasRolls<any>).rolls.forEach((roll) => {
      if ("activateListeners" in roll) {
        (roll as HasActivateListeners).activateListeners(html, message);
      }
    });
  }
});

Hooks.on("ready", () => {
  console.log(sta.systemName + " | Initialization complete!");
});


function registerActorSheets() {
  Actors.unregisterSheet("core", ActorSheet);
  Object.entries(actorTypes)
    .forEach(([type, config]) => {
      const c = config as ActorTypeConfig;
      Actors.registerSheet(sta.systemName, c.sheet, { types: [type] });
    });
}

function registerItemSheets() {
  Items.unregisterSheet("core", ItemSheet);
  const templates: Set<string> = new Set();
  Object.entries(itemTypes)
    .forEach(([type, config]) => {
      const c = config as ItemTypeConfig;
      Items.registerSheet(sta.systemName, c.sheet, { types: [type] });
      templates.add(sta.templateBasePath + c.listTemplate);
      templates.add(sta.templateBasePath + c.chatTemplate);
    });
  loadTemplates(Array.from(templates.keys()));
}

function registerTemplates() {
  registerHandlebarHelpers();
  loadTemplates([
    `${sta.templateBasePath}/item/_partials/ItemHeader.hbs`,
    `${sta.templateBasePath}/item/_partials/PropertyText.hbs`,
  ]);
}
