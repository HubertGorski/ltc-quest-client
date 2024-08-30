import type { MODULE_NAME } from "../Module";

export class Notification {
  id: number;
  date: Date;
  module: string;
  recipient: string;
  displayed: boolean;

  constructor(
    id: number,
    date: string,
    module: MODULE_NAME,
    recipient: string,
    displayed: boolean,
  ) {
    this.id = id;
    this.date = new Date(date);
    this.module = module;
    this.recipient = recipient;
    this.displayed = displayed;
  }
}

export enum RECIPIENT {
  ADMIN = "admin",
  USER = "user",
}
