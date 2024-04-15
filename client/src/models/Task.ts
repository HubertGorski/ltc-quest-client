export class Task {
  teamTaskId: number;
  taskId: number;
  title: string;
  description: string;
  additionalDescription: string;
  status: TASK_STATUS;
  points: number;
  isSpecial: boolean;
  createrId: number;
  creationDate: string;
  teamId: number;
  userId: number;
  acceptDate: string | null;
  accepterId: number | null;
  additionalImages: string[];
  startDate: Date | null;
  endDate: Date | null;
  teamsPoints: taskTeamsPoints[];
  wordId: number;

  constructor(
    teamTaskId: number,
    taskId: number,
    title: string,
    description: string,
    additionalDescription: string,
    status: TASK_STATUS,
    points: number,
    isSpecial: boolean,
    createrId: number,
    creationDate: string,
    teamId: number,
    userId: number,
    acceptDate: string | null = null,
    accepterId: number | null = null,
    additionalImages: string[] = [],
    startDate: string | null = null,
    endDate: string | null = null,
    teamsPoints: taskTeamsPoints[] = [],
    wordId: number = 0,
  ) {
    this.teamTaskId = teamTaskId;
    this.taskId = taskId;
    this.title = title;
    this.description = description;
    this.additionalDescription = additionalDescription;
    this.status = status;
    this.points = points;
    this.isSpecial = isSpecial;
    this.createrId = createrId;
    this.creationDate = creationDate;
    this.teamId = teamId;
    this.userId = userId;
    this.acceptDate = acceptDate;
    this.accepterId = accepterId;
    this.additionalImages = additionalImages;
    this.startDate = startDate ? new Date(startDate) : null;
    this.endDate = endDate ? new Date(endDate) : null;
    this.teamsPoints = teamsPoints;
    this.wordId = wordId;
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

  get isDisabled(): boolean {
    return TASK_STATUS.DISABLED === this.status;
  }

  get isStarted(): boolean {
    return this.startDate ? new Date() > this.startDate : true;
  }

  get isExpired(): boolean {
    return this.endDate ? new Date() > this.endDate : false;
  }

  get isActive(): boolean {
    return !this.isDisabled && this.isStarted && !this.isExpired;
  }

  setTaskStatus(status: TASK_STATUS): void {
    this.status = status;
  }
}

export enum TASK_STATUS {
  CONFIRMED = 2,
  EXPECTANCY = 1,
  UNDONE = 0,
  REJECTED = -1,
  DISABLED = -2,
  HIDDEN = -3,
}

// per taskId
interface taskStatus {
  userId: number;
  isDone: boolean;
}
interface taskTeamsPoints {
  teamId: number;
  points: number;
}
interface taskTeamsAvailability {
  teamId: number;
  availability: boolean;
}
