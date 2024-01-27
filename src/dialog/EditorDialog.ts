import { sta } from "../config";
import { Document } from "@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/abstract/module.mjs";
import { StaDialog } from "../app/StaDialog";


export class EditorDialog extends StaDialog {
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      width: 480,
      height: 480,
      classes: ["sta-app", "sta-dialog", "sta-dialog-editor"],
    });
  }

  document: Document<any, any, any>;
  field: string;
  editable: boolean;
  editor: tinyMCE.Editor | undefined;
  form: HTMLElement | undefined;

  constructor(
    document: Document<any, any, any>,
    field: string,
    title: string,
    editable: boolean,
  ) {
    super({
      title: EditorDialog.buildTitle(document, title),
      content: EditorDialog.buildContent(),
      render: async (el) => {
        await this.renderEditor(el);
      },
      buttons: {
        save: {
          icon: "<i class=\"fas fa-check\"></i>",
          label: sta.game.i18n.localize("sta.editor.save"),
          callback: () => this.saveEditor(),
        },
      },
      default: "save",
    });

    this.document = document;
    this.field = field;
    this.editable = editable;
  }


  static buildTitle(document: Document<any, any, any>, fieldI18n: string): string {
    const title = sta.game.i18n.localize("sta.editor.title");
    return `${title} - ${document.name}: ${sta.game.i18n.localize(fieldI18n)}`;
  }

  static buildContent(): string {
    return `<form>
      <div class="editor"></div>
    </form>`;
  }

  async renderEditor(el: HTMLElement | JQuery) {
    const value = foundry.utils.getProperty(this.document, this.field);
    const target = $(el).find(".editor");
    this.form = target.closest("form").get()[0];
    const editorTarget = target.get()[0];
    this.editor = await TextEditor.create({
      target: editorTarget,
      save_onsavecallback: () => this.saveEditor(),
      document: this.document,
      content_css: [`systems/fvtt-sta/fvtt-sta.css`],
      save_enablewhendirty: this.editable,
    } as TextEditor.Options, value);
  }

  async saveEditor() {
    if (!this.editable) return;
    const content = this.editor?.getContent();
    await this.document.update({
      [this.field]: content,
    });
  }
}
