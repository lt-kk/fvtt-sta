export class StaDialog extends Dialog {
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["sta-app", "sta-dialog"],
    });
  }
}