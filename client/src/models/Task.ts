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
  teamTaskColor: string;
  teamLogoTaskOwner: string;
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
    teamTaskColor: string,
    teamLogoTaskOwner: string,
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
    this.teamTaskColor = teamTaskColor;
    this.teamLogoTaskOwner = teamLogoTaskOwner;
    this.acceptDate = acceptDate;
    this.accepterId = accepterId;
  }

  get isDefaultTask(): boolean {
    return this.createrId === ADMIN.ID;
  }

  get isDone(): boolean {
    return TASK_STATUS.CONFIRMED === this.status;
  }

  get isRejected(): boolean {
    return TASK_STATUS.REJECTED === this.status;
  }

  get isExpectancy(): boolean {
    return TASK_STATUS.EXPECTANCY === this.status;
  }

  setTaskStatus(status: TASK_STATUS): void {
    this.status = status;
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
