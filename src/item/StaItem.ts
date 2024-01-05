export abstract class StaItem {
  static type: string;

  abstract id: string;
  abstract name: string;
  abstract img: string | null;
  abstract description: string;
}