export interface ResourceTracker {
  value(resource: Resource): number;

  changeResource(resource: Resource, value: number, userName: string): void;
}


export const Resources = ["momentum", "threat"];
export type Resource = typeof Resources[number];


export const STA_SOCKET = "system.fvtt-sta";

export interface SocketMessage {
  type: string;
}
