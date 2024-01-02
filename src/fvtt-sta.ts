import "../styles/fvtt-sta.less";
import { sta } from "./config";
import { registerHandlebarHelpers } from "./template/TemplateHelpers";
import { itemTypes, StaItem } from "./item/StaItem";
import { actorTypes, StaActor } from "./actor/StaActor";
import { TaskRoll } from "./roll/TaskRoll";
import { ChallengeRoll } from "./roll/ChallangeRoll";
import { HasActivateListeners, HasRolls } from "./util/util";

Hooks.once("init", () => {
  console.log(sta.systemName + " | Initializing system...");
  sta.game = game as Game;

  CONFIG.Actor.documentClass = StaActor;
  CONFIG.Item.documentClass = StaItem;
  CONFIG.Dice.rolls = [Roll, ChallengeRoll, TaskRoll];

  registerTemplates();
  registerActorSheets();
  registerItemSheets();
});

Hooks.on("renderChatMessage", (message, html) => {
  if(message.isRoll) {
    (message as unknown as HasRolls).rolls.forEach((roll) => {
      if('activateListeners' in roll) {
        (roll as HasActivateListeners).activateListeners(html, message);
      }
    });
  }
})

Hooks.on("ready", () => {
  console.log(sta.systemName + " | Initialization complete!");
});


function registerActorSheets() {
  Actors.unregisterSheet("core", ActorSheet);
  Object.entries(actorTypes)
    .forEach(([type, config]) => {
      Actors.registerSheet(sta.systemName, config.sheet, { types: [type] });
    });
}

function registerItemSheets() {
  Items.unregisterSheet("core", ItemSheet);
  Object.entries(itemTypes)
    .forEach(([type, config]) => {
      Items.registerSheet(sta.systemName, config.sheet, { types: [type] });
    });
}

function registerTemplates() {
  registerHandlebarHelpers();
  loadTemplates([]);
}
