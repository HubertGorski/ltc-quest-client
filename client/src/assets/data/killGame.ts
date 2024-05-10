import {
  KILL_GAME_CARD_STATUS,
  KillGameCard,
} from "@/mod/killGame/models/KillGameCard";
import {
  KILL_GAME_USER_STATUS,
  KillGameUser,
} from "@/mod/killGame/models/KillGameUser";

export const killGameData = {
  user: new KillGameUser(
    1,
    "Adam",
    12,
    3,
    2,
    "Laura",
    KILL_GAME_USER_STATUS.UNCERTAIN
  ),
  usersAlive: 17,
  cards: [
    new KillGameCard(
      1,
      1,
      "Adam",
      "Oskar Litka",
      "Spirit",
      "Zrób słowiański przykuc",
      KILL_GAME_CARD_STATUS.EXPECTANCY
    ),
    new KillGameCard(
      2,
      1,
      "Adam",
      "Amadeusz Hyży",
      "Szkolenie",
      "Zaśpiewaj coś z disneya",
      KILL_GAME_CARD_STATUS.INACTIVE,
      1
    ),
    new KillGameCard(
      2,
      1,
      "Adam",
      "Stanisław Kot",
      "Ogarniam",
      "Poprowadź grupową grę dla conajmniej 10 uczestników",
      KILL_GAME_CARD_STATUS.ACTIVE
    ),
    new KillGameCard(
      3,
      1,
      "Adam",
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
  new KillGameUser(1, "Adam", 12, 3, 2, "Laura"),
  new KillGameUser(2, "Laura", 11, 6, 3, "Oskar"),
  new KillGameUser(3, "Oskar", 7, 7, 4, "Kuba"),
  new KillGameUser(4, "Kuba", 10, 2, 5, "Magda"),
  new KillGameUser(5, "Magda", 5, 5, 6, "Igor"),
  new KillGameUser(6, "Igor", 32, 13, 1, "Adam"),
];

export const cardsData = [
  new KillGameCard(
    1,
    1,
    "Hubert",
    "Adam",
    "spirit",
    "zjedz tosty",
    KILL_GAME_CARD_STATUS.ACTIVE,
    2,
    "Hubert"
  ),
  new KillGameCard(
    2,
    2,
    "Kacper",
    "Hubert",
    "ognisty krąg",
    "zrób słowiański przykuc",
    KILL_GAME_CARD_STATUS.ACTIVE,
    3,
    "Kacper"
  ),
  new KillGameCard(
    3,
    3,
    "Adam",
    "Kacper",
    "zdrowie",
    "polej alkohol",
    KILL_GAME_CARD_STATUS.ACTIVE,
    1,
    "Adam"
  ),
];
