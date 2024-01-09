import { StaStarship, StaStarshipDepartments, StaStarshipSystems } from "./StaStarship";
import { TaskRoll, TaskRollData } from "../../roll/TaskRoll";
import { StaEntity } from "../../model/StaSystemDocument";
import { rollDataDialog } from "../../roll/RollDialog";


export type StarshipTaskRollData = TaskRollData & {
  system: keyof StaStarshipSystems;
  department: keyof StaStarshipDepartments;
  systemValue: number;
  departmentValue: number;
}


export async function starshipTaskRoll(sta: StaStarship, dicePool: number, {
  complication = 1,
} = {}) {
  const systemValue = sta.systems[sta.taskRoll.system].effective;
  const departmentValue = sta.departments[sta.taskRoll.department];
  let rollData = await rollDataDialog<StarshipTaskRollData>({
    result: undefined,
    actions: {simple: 0, task: 1},
    source: sta as StaEntity,
    dicePool: dicePool,
    target: systemValue + departmentValue,
    double: departmentValue,
    complication: complication,
    determination: false,
    system: sta.taskRoll.system,
    department: sta.taskRoll.department,
    systemValue: systemValue,
    departmentValue: departmentValue,
  }, "roll/TaskRollDialog.hbs");
  return new TaskRoll("", rollData);
}