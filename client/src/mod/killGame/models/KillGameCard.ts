export class KillGameCard {
  cardId: number;
  ownerId: number;
  userName: string;
  keyWord: string;
  keyAction: string;
  status: KILL_GAME_CARD_STATUS;

  constructor(
    cardId: number,
    ownerId: number,
    userName: string,
    keyWord: string,
    keyAction: string,
    status: KILL_GAME_CARD_STATUS
  ) {
    this.cardId = cardId;
    this.ownerId = ownerId;
    this.userName = userName;
    this.keyWord = keyWord;
    this.keyAction = keyAction;
    this.status = status;
  }

  get isExpectancy(): boolean {
    return KILL_GAME_CARD_STATUS.EXPECTANCY === this.status;
  }
}
  
export enum KILL_GAME_CARD_STATUS {
  ACTIVE = 0,
  EXPECTANCY = 1,
  INACTIVE = 2,
}