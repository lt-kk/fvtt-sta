import "../styles/fvtt-sta.less";
import { sta } from "./config";
import { GenericItemSheet } from "./sheets/GenericItemSheet";
import { CharacterSheet } from "./sheets/CharacterSheet";
import { registerHandlebarHelpers } from "./TemplateHelpers";

console.log(sta.systemName + " | system loaded.");

Hooks.on("init", () => {
  console.log(sta.systemName + " | Initializing system...");
  sta.game = game as Game

  // Sheets
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet(sta.systemName, CharacterSheet, { types: ["character"] });
  Actors.registerSheet(sta.systemName, CharacterSheet, { types: ["starship"] });

  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet(sta.systemName, GenericItemSheet, { types: ["armor"] });
  Items.registerSheet(sta.systemName, GenericItemSheet, { types: ["characterweapon"] });
  Items.registerSheet(sta.systemName, GenericItemSheet, { types: ["focus"] });
  Items.registerSheet(sta.systemName, GenericItemSheet, { types: ["injury"] });
  Items.registerSheet(sta.systemName, GenericItemSheet, { types: ["item"] });
  Items.registerSheet(sta.systemName, GenericItemSheet, { types: ["launchbay"] });
  Items.registerSheet(sta.systemName, GenericItemSheet, { types: ["milestone"] });
  Items.registerSheet(sta.systemName, GenericItemSheet, { types: ["starshipweapon"] });
  Items.registerSheet(sta.systemName, GenericItemSheet, { types: ["talent"] });
  Items.registerSheet(sta.systemName, GenericItemSheet, { types: ["value"] });

  // Templates
  registerHandlebarHelpers()
  const templatePath = `systems/${sta.systemName}/templates`
  loadTemplates([

  ])
});

Hooks.on("ready", () => {
  console.log(sta.systemName + " | Initialization complete!");
});
