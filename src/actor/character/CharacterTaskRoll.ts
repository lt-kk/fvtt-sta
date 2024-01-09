import { StaCharacter, StaCharacterAttributes, StaCharacterDisciplines } from "./StaCharacter";
import { TaskRoll, TaskRollData } from "../../roll/TaskRoll";
import { StaEntity } from "../../model/StaSystemDocument";
import { rollDataDialog } from "../../roll/StaRoll";

export type CharacterTaskRollData = TaskRollData & {
  focus: boolean;
  attribute: keyof StaCharacterAttributes;
  discipline: keyof StaCharacterDisciplines;
  attributeValue: number;
  disciplineValue: number
}


export async function characterTaskRoll(sta: StaCharacter, dicePool: number, {
  complication = 0,
  determination = false,
  focus = false,
} = {}) {
  const attributeValue = sta.attributes[sta.taskRoll.attribute];
  const disciplineValue = sta.disciplines[sta.taskRoll.discipline];
  let rollData = await rollDataDialog<CharacterTaskRollData>({
    result: undefined,
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
  }, "actor/character/CharacterTaskRollDialog.hbs");
  if (rollData.focus) rollData.double = disciplineValue;
  return new TaskRoll("", rollData);
}