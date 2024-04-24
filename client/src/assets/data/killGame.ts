import { KILL_GAME_USER_STATUS, KillGameUser } from "@/mod/killGame/models/KillGameUser"

export const killGameData = {
    user: new KillGameUser(1, 4, 2, KILL_GAME_USER_STATUS.UNCERTAIN, 2),
    usersAlive: 17,
    cards: []
}