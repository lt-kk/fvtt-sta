import { StaCharacter, StaCharacterAttributes, StaCharacterDisciplines } from "./StaCharacter";
import { TaskRoll, TaskRollData } from "../../roll/task/TaskRoll";
import { StaEntity } from "../../model/StaSystemDocument";
import { rollDataDialog } from "../../roll/RollDialog";


export type CharacterTaskRollData = TaskRollData & {
  focus: boolean;
  attribute: keyof StaCharacterAttributes;
  discipline: keyof StaCharacterDisciplines;
  attributeValue: number;
  disciplineValue: number
}


export async function characterTaskRoll(sta: StaCharacter, dicePool: number, {
  complication = 1,
  determination = false,
  focus = false,
} = {}) {
  const attributeValue = sta.attributes[sta.taskRoll.attribute];
  const disciplineValue = sta.disciplines[sta.taskRoll.discipline];
  let rollData: CharacterTaskRollData = {
    result: undefined,
    actions: {simple: 0, task: 1},
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
  }
  rollData = await rollDataDialog(rollData, "actor/character/CharacterTaskRollDialog.hbs");
  if (rollData.focus) rollData.double = disciplineValue;
  return new TaskRoll("", rollData);
}