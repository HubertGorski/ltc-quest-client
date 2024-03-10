import { TASK_STATUS } from "@/enums/enumTasks";
import { USER } from "@/enums/enumUsers";
import { Task } from "@/models/Task";

export const tasksData = [
  new Task(
    1,
    "Pojedynek Posejdona",
    "Napij się z trenerem balsamu pomorskiego. Potem zrób słowiański przykuc. I tak dalej do zrobienia ",
    TASK_STATUS.UNDONE,
    8,
    2,
    "piątek",
    1,
    USER.ID,
    "red"
  ),
  new Task(
    2,
    "Posiłek Hadesa",
    "Biegaj wokoło inwalidera śpiewając qbika",
    TASK_STATUS.UNDONE,
    4,
    2,
    "piątek",
    1,
    USER.ID,
    "red"
  ),
  new Task(
    3,
    "Króliczki zarządu",
    "Zbuduj fortece z win",
    TASK_STATUS.CONFIRMED,
    12,
    2,
    "piątek",
    1,
    USER.ID,
    "red"
  ),
  new Task(
    4,
    "Zdjęcie całego klanu",
    "Zbierz wszystkich członków zespołu i zróbcie grupowe zdjęcie",
    TASK_STATUS.EXPECTANCY,
    6,
    2,
    "piątek",
    1,
    USER.ID,
    "red"
  ),
  new Task(
    5,
    "Wykonaj słowiański przykuc",
    "Kucnij piętami do ziemi",
    TASK_STATUS.REJECTED,
    2,
    2,
    "piątek",
    1,
    USER.ID,
    "red"
  ),
  new Task(
    6,
    "Odnajdź legendarny artefakt",
    "Schowany jest gdzieś złoty znicz. Odnajdź go!",
    TASK_STATUS.UNDONE,
    16,
    2,
    "piątek",
    1,
    USER.ID,
    "red"
  ),
];
