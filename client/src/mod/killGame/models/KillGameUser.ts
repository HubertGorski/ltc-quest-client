export class KillGameUser {
    userId: number;
    cardsOwned: number;
    killingsCommitted: number;
    status: KILL_GAME_USER_STATUS;
    killerId: number | null;

    constructor(
      userId: number,
      cardsOwned: number,
      killingsCommitted: number,
      status: KILL_GAME_USER_STATUS = KILL_GAME_USER_STATUS.NEUTRAL,
      killerId: number | null = null,

    ) {
      this.userId = userId;
      this.cardsOwned = cardsOwned;
      this.killingsCommitted = killingsCommitted;
      this.status = status;
      this.killerId = killerId;
    }
  }
  
export  enum KILL_GAME_USER_STATUS {
  ALIVE = 1,
  UNCERTAIN = 0,
  NEUTRAL = -1,
  DEAD = -2,
}