export class Module {
  id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}

export enum MODULE_NAME {
  KILL_GAME = "killGame",
  BINGO = "bingo",
}
