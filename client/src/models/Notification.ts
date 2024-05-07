import type { MODULE_NAME } from "./Module";

export class Notification {
  id: number;
  date: Date;
  module: string;
  recipient: string;
  displayed: boolean;
  data: KillGameData | any;

  constructor(
    id: number,
    date: string,
    module: MODULE_NAME,
    recipient: string,
    displayed: boolean,
    data: any
  ) {
    this.id = id;
    this.date = new Date(date);
    this.module = module;
    this.recipient = recipient;
    this.displayed = displayed;
    this.data = data;
  }
}

export interface KillGameData {
  killer: String;
  user: String;
  infoType: KILL_GAME_INFO_TYPE;
}

export enum KILL_GAME_INFO_TYPE {
  EXPECTANCY = "expectancy",
  REJECTED = "rejected",
}

export enum RECIPIENT {
  ADMIN = "admin",
  USER = "user",
}
