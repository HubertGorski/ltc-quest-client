import { TASK_STATUS } from "@/enums/enumTasks";
import { TEAM_ID } from "@/enums/enumTeams";
import { USER } from "@/enums/enumUsers";
import { Task } from "@/models/Task";

export const tasks = [
  new Task(
    1,
    "Pojedynek Posejdona",
    "Napij się z trenerem balsamu pomorskiego. Potem zrób słowiański przykuc. I tak dalej do zrobienia ",
    TASK_STATUS.UNDONE,
    8,
    2,
    "piątek",
    TEAM_ID.TEAM_1,
    USER.ID
  ),
  new Task(
    2,
    "Posiłek Hadesa",
    "Biegaj wokoło inwalidera śpiewając qbika",
    TASK_STATUS.UNDONE,
    8,
    2,
    "piątek",
    TEAM_ID.TEAM_1,
    USER.ID
  ),
];
