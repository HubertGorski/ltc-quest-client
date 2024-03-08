import { TASK_STATUS } from "@/enums/enumTasks";
import { ADMIN } from "@/enums/enumUsers";

export class Task {
  teamTaskId: number;
  title: string;
  description: string;
  status: TASK_STATUS;
  points: number;
  createrId: number;
  creationDate: string;
  teamId: number;
  userId: number;
  acceptDate: string | null;
  accepterId: number | null;

  constructor(
    teamTaskId: number,
    title: string,
    description: string,
    status: TASK_STATUS,
    points: number,
    createrId: number,
    creationDate: string,
    teamId: number,
    userId: number,
    acceptDate: string | null = null,
    accepterId: number | null = null
  ) {
    this.teamTaskId = teamTaskId;
    this.title = title;
    this.description = description;
    this.status = status;
    this.points = points;
    this.createrId = createrId;
    this.creationDate = creationDate;
    this.teamId = teamId;
    this.userId = userId;
    this.acceptDate = acceptDate;
    this.accepterId = accepterId;
  }

  get isDefaultTask(): boolean {
    return this.createrId === ADMIN.ID;
  }

  get isDone(): boolean {
    return TASK_STATUS.CONFIRMED === this.status;
  }
}

interface taskStatus {
  taskId: number;
  userId: number;
  status: number;
}
interface taskTeamsPoints {
  taskId: number;
  teamId: number;
  points: number;
}
