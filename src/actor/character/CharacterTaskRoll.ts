import { StaCharacter, StaCharacterAttributes, StaCharacterDisciplines } from "./StaCharacter";
import { TaskRoll, TaskRollData } from "../../roll/TaskRoll";
import { StaEntity } from "../../model/StaSystemDocument";

export type CharacterTaskRollData = TaskRollData & {
  focus: boolean;
  attribute: keyof StaCharacterAttributes;
  discipline: keyof StaCharacterDisciplines;
  attributeValue: number;
  disciplineValue: number
}


export function characterTaskRoll(sta: StaCharacter, dicePool: number, {
  complication = 0,
  determination = false,
  focus = false,
} = {}) {
  const attributeValue = sta.attributes[sta.taskRoll.attribute];
  const disciplineValue = sta.disciplines[sta.taskRoll.discipline];
  return new TaskRoll("", {
    source: sta as StaEntity,
    dicePool: dicePool,
    target: attributeValue + disciplineValue,
    double: focus ? disciplineValue : 1,
    complication: complication,
    determination: determination,
    focus: focus,
    attribute: sta.taskRoll.attribute,
    discipline: sta.taskRoll.discipline,
    attributeValue: attributeValue,
    disciplineValue: disciplineValue,
  } as CharacterTaskRollData);
}