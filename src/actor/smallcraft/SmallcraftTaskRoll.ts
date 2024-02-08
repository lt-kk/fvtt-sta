import { StaStarship } from "../starship/StaStarship";
import { rollDataDialog } from "../../roll/RollDialog";
import { StaEntity } from "../../model/StaSystemDocument";
import { TaskRoll } from "../../roll/task/TaskRoll";
import { StarshipTaskRollData } from "../starship/StarshipTaskRoll";
import { StaSmallcraft } from "./StaSmallcraft";


export async function starshipTaskRoll(sta: StaSmallcraft, dicePool: number, {
  complication = 1,
} = {}) {
  const systemValue = sta.systems[sta.taskRoll.system].effective;
  const departmentValue = sta.departments[sta.taskRoll.department];
  let rollData = await rollDataDialog<StarshipTaskRollData>({
    result: undefined,
    actions: { simple: 0, task: 1 },
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
  }, "roll/task/TaskRollDialog.hbs");
  return new TaskRoll("", rollData);
}
