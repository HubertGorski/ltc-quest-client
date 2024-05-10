export class KillGameUser {
    userId: number;
    userName: string;
    cardsOwned: number;
    killingsCommitted: number;
    killerId: number | null;
    killerName: string;
    status: KILL_GAME_USER_STATUS;
    
    constructor(
      userId: number,
      userName: string,
      cardsOwned: number,
      killingsCommitted: number,
      killerId: number,
      killerName: string,
      status: KILL_GAME_USER_STATUS = KILL_GAME_USER_STATUS.NEUTRAL,

    ) {
      this.userId = userId;
      this.userName = userName;
      this.cardsOwned = cardsOwned;
      this.killingsCommitted = killingsCommitted;
      this.killerId = killerId;
      this.killerName = killerName;
      this.status = status;
    }
  }
  
export  enum KILL_GAME_USER_STATUS {
  ALIVE = 1,
  UNCERTAIN = 0,
  NEUTRAL = -1,
  DEAD = -2,
}