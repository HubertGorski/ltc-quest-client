import type { taskTeamsPoints } from "./Task";

export class ModeratorTask {
  teamTaskId: number;
  taskId: number;
  title: string;
  description: string;
  createrId: number;
  creationDate: string;
  startDate: Date | null;
  endDate: Date | null;
  teamsPoints: taskTeamsPoints[];
  wordId: number;

  constructor(
    teamTaskId: number,
    taskId: number,
    title: string,
    description: string,
    createrId: number,
    creationDate: string,
    startDate: string | null = null,
    endDate: string | null = null,
    teamsPoints: taskTeamsPoints[] = [],
    wordId: number = 0,
) {
    this.teamTaskId = teamTaskId;
    this.taskId = taskId;
    this.title = title;
    this.description = description;
    this.createrId = createrId;
    this.creationDate = creationDate;
    this.startDate = startDate ? new Date(startDate) : null;
    this.endDate = endDate ? new Date(endDate) : null;
    this.teamsPoints = teamsPoints;
    this.wordId = wordId;
  }

  get isStarted(): boolean {
    return this.startDate ? new Date() > this.startDate : true;
  }

  get isExpired(): boolean {
    return this.endDate ? new Date() > this.endDate : false;
  }
}