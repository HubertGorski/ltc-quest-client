import {
  KILL_GAME_CARD_STATUS,
  KillGameCard,
} from "@/mod/killGame/models/KillGameCard";
import {
  KILL_GAME_USER_STATUS,
  KillGameUser,
} from "@/mod/killGame/models/KillGameUser";

export const killGameData = {
  user: new KillGameUser(1, 4, 2, KILL_GAME_USER_STATUS.UNCERTAIN, 2),
  usersAlive: 17,
  cards: [
    new KillGameCard(
      1,
      1,
      "Oskar Litka",
      "Spirit",
      "Zrób słowiański przykuc",
      KILL_GAME_CARD_STATUS.EXPECTANCY
    ),
    new KillGameCard(
      2,
      1,
      "Amadeusz Hyży",
      "Szkolenie",
      "Zaśpiewaj coś z disneya",
      KILL_GAME_CARD_STATUS.INACTIVE,
      1
    ),
    new KillGameCard(
      2,
      1,
      "Stanisław Kot",
      "Ogarniam",
      "Poprowadź grupową grę dla conajmniej 10 uczestników",
      KILL_GAME_CARD_STATUS.ACTIVE
    ),
    new KillGameCard(
      3,
      1,
      "Klara Orłowska",
      "Ognisty krąg",
      "Zrób tosta",
      KILL_GAME_CARD_STATUS.INACTIVE,
      2,
      "Laura Chrzanowska"
    ),
  ],
};

export const killersData = [
  { killerId: 1, killerName: "Adam", cardsOwned: 12, killingsCommitted: 3 },
  { killerId: 2, killerName: "Laura", cardsOwned: 11, killingsCommitted: 6 },
  { killerId: 3, killerName: "Oskar", cardsOwned: 7, killingsCommitted: 7 },
  { killerId: 4, killerName: "Kuba", cardsOwned: 10, killingsCommitted: 2 },
  { killerId: 5, killerName: "Magda", cardsOwned: 5, killingsCommitted: 5 },
  { killerId: 6, killerName: "Igor", cardsOwned: 32, killingsCommitted: 13 },
];

export const cardsData = [
  { killerId: 1, killerName: "Adam", userId: 2, userName: "Hubert", action: 'zjedz tosty', word: 'spirit'},
  { killerId: 3, killerName: "Laura", userId: 4, userName: "Kacper", action: 'zrób słowiański przykuc', word: 'ognisty krąg'},
  { killerId: 5, killerName: "Grzesiu", userId: 6, userName: "Oskar", action: 'polej alkohol', word: 'zdrowie'},
];
