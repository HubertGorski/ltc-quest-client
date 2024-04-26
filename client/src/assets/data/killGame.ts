import { KILL_GAME_CARD_STATUS, KillGameCard } from "@/mod/killGame/models/KillGameCard"
import { KILL_GAME_USER_STATUS, KillGameUser } from "@/mod/killGame/models/KillGameUser"

export const killGameData = {
    user: new KillGameUser(1, 4, 2, KILL_GAME_USER_STATUS.UNCERTAIN, 2),
    usersAlive: 17,
    cards: [
        new KillGameCard(1,1,"Oskar Litka",'Spirit', 'Zrób słowiański przykuc', KILL_GAME_CARD_STATUS.INACTIVE, 2, 'Laura Chrzanowska'),
        new KillGameCard(2,1,"Amadeusz Hyży",'Szkolenie', 'Zaśpiewaj coś z disneya', KILL_GAME_CARD_STATUS.INACTIVE, 1),
        new KillGameCard(2,1,"Stanisław Kot",'Ogarniam', 'Poprowadź grupową grę dla conajmniej 10 uczestników', KILL_GAME_CARD_STATUS.ACTIVE),
        new KillGameCard(3,1,"Klara Orłowska",'Ognisty krąg', 'Zrób tosta', KILL_GAME_CARD_STATUS.EXPECTANCY)
    ]
}