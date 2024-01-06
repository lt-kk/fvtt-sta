export interface StaActor {
  id: string;
  name: string;
  img: string | null;

  resetStatus(): void
}