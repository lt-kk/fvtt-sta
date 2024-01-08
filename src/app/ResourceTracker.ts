export const RESOURCE_TRACKER_SOCKET = "sta.resource.tracker"

export interface ResourceTracker {
  value(resource: Resource): number

  changeResource(resource: Resource, value: number, send: boolean): void
}


export const Resources = ["momentum", "threat"]
export type Resource = typeof Resources[number];
