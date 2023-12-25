import { sta } from "../config";

export function confirmDialog(
  handler: (html: JQuery | HTMLElement) => unknown,
  title: string = sta.game.i18n.localize("sta.config.default.title"),
  content: string = sta.game.i18n.localize("sta.confirm.default.content"),
) {
  return new Dialog({
    title: title,
    content: content,
    buttons: {
      yes: {
        icon: "<i class=\"fas fa-check\"></i>",
        label: sta.game.i18n.localize("sta.confirm.yes"),
        callback: handler,
      },
      no: {
        icon: "<i class=\"fas fa-times\"></i>",
        label: sta.game.i18n.localize("sta.confirm.no"),
      },
    },
    default: "no",
  }, { minimizable: false });
}