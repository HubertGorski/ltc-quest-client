export class KillGameCard {
  cardId: number;
  ownerId: number;
  userName: string;
  keyWord: string;
  keyAction: string;
  status: KILL_GAME_CARD_STATUS;
  killerId: number | null;
  killerName: string;

  constructor(
    cardId: number,
    ownerId: number,
    userName: string,
    keyWord: string,
    keyAction: string,
    status: KILL_GAME_CARD_STATUS,
    killerId: number | null = null,
    killerName = ""
  ) {
    this.cardId = cardId;
    this.ownerId = ownerId;
    this.userName = userName;
    this.keyWord = keyWord;
    this.keyAction = keyAction;
    this.status = status;
    this.killerId = killerId;
    this.killerName = killerName;
  }

  get isExpectancy(): boolean {
    return KILL_GAME_CARD_STATUS.EXPECTANCY === this.status;
  }

  get isInactive(): boolean {
    return KILL_GAME_CARD_STATUS.INACTIVE === this.status;
  }

  get isAcquiredDirectly(): boolean {
    return this.isInactive && this.killerId === this.ownerId;
  }

  get isAcquiredIndirectly(): boolean {
    return this.isInactive && this.killerId !== this.ownerId;
  }
}

export enum KILL_GAME_CARD_STATUS {
  ACTIVE = 0,
  EXPECTANCY = 1,
  INACTIVE = 2,
}
