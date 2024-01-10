import { StaDialog } from "../app/StaDialog";
import { formData, LooseObject } from "../util/util";
import { sta } from "../config";
import { tplPath } from "../template/TemplateHelpers";
import { StaRollData } from "./StaRoll";


export async function rollDataDialog<D extends StaRollData<any>>(rollData: D, template: string): Promise<D> {
  const htmlContent = await renderTemplate(tplPath(template), {
    roll: rollData,
    settings: sta.settings,
  });
  return new Promise<D>((resolve) => {
    const dialog = new RollDialog(htmlContent, (values: LooseObject<any>) => {
      resolve(mergeObject(rollData, values) as D);
    });
    dialog.render(true);
  });
}


export class RollDialog extends StaDialog {
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      width: 200,
    });
  }

  constructor(htmlContent: string, callback: (values: LooseObject<any>) => void) {
    super({
      title: sta.game.i18n.localize("sta.task.roll.title"),
      content: htmlContent,
      buttons: {
        roll: {
          icon: "<img class=\"icon roll d20\" src=\"/icons/svg/d20-grey.svg\" />",
          label: sta.game.i18n.localize("sta.task.roll.confirm"),
          callback: (html: HTMLElement | JQuery<HTMLElement>) => {
            let values = formData(html);
            callback(values);
          },
        },
      },
    });
  }
}