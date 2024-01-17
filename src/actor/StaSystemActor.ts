import { actorType } from "../registry";
import { StaActor } from "./StaActor";
import { actorSystem } from "../util/document";
import { StaSystemDocument } from "../model/StaSystemDocument";

/** Glue together Foundry Actor and system specific types */
export class StaSystemActor extends Actor implements StaSystemDocument<StaActor> {
  sta: StaActor | undefined;

  prepareBaseData() {
    super.prepareBaseData();
    console.log(this.type, this.name, this)
    this.sta = actorType(this.type).entityFactory(this);
  }

  override prepareEmbeddedDocuments() {
    super.prepareEmbeddedDocuments();
  }

  prepareDerivedData() {
    super.prepareDerivedData();
    const system = actorSystem(this);
    const systemUpdates = this.sta!.derivedValues();
    mergeObject(system, systemUpdates);
  }

}