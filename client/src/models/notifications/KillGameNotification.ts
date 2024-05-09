import type { MODULE_NAME } from "../Module";
import { Notification } from "./Notification";

export class KillGameAdminNotification extends Notification {
  data: KillGameAdminData;

  constructor(id: number, date: string, module: MODULE_NAME, recipient: string, displayed: boolean, data: KillGameAdminData) {
    super(id, date, module, recipient, displayed);
    this.data = data;
  }
}

export class KillGameUserNotification extends Notification {
  data: KillGameUserData;

  constructor(id: number, date: string, module: MODULE_NAME, recipient: string, displayed: boolean, data: KillGameUserData) {
    super(id, date, module, recipient, displayed);
    this.data = data;
  }
}

export interface KillGameAdminData {
  killer: String;
  user: String;
  infoType: KILL_GAME_ADMIN_INFO_TYPE;
}

export enum KILL_GAME_ADMIN_INFO_TYPE {
  EXPECTANCY = "expectancy",
  REJECTED = "rejected",
}

export interface KillGameUserData {
  owner: String;
  user: String;
  infoType: KILL_GAME_USER_INFO_TYPE;
  newCards: Number | null;
}

export enum KILL_GAME_USER_INFO_TYPE {
  KILL = "kill",
  REJECTED = "rejected",
}
