import type { MODULE_NAME } from "../Module";
import { Notification } from "./Notification";

export class KillGameNotification extends Notification {
  data: KillGameData;

  constructor(id: number, date: string, module: MODULE_NAME, recipient: string, displayed: boolean, data: KillGameData) {
    super(id, date, module, recipient, displayed);
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
