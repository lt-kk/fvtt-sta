import { BaseActorSheet } from "../BaseActorSheet";
import { tplPath } from "../../template/TemplateHelpers";
import { StaExtendedtask } from "./StaExtendedtask";

export class ExtendedtaskSheet extends BaseActorSheet<StaExtendedtask> {
  static templatePath = tplPath("actor/extendedtask/ExtendedtaskSheet.hbs");

  get template() {
    return ExtendedtaskSheet.templatePath;
  }

  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["sta-app", "actor-sheet", "extendedtask-sheet"],
      width: 580,
      height: 660,
      dragDrop: [{
        dragSelector: ".item-list .item",
        dropSelector: null,
      }],
    });
  }

  async rollTask(dicePool: number) {

  }

  async rollChallenge(dicePool: number) {

  }

  async rollWeapon(html: JQuery) {

  }
}