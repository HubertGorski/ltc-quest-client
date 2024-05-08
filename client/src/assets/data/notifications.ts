import { MODULE_NAME } from "@/models/Module";
import {
  KILL_GAME_INFO_TYPE,
  KillGameNotification,
} from "@/models/notifications/KillGameNotification";
import { Notification, RECIPIENT } from "@/models/notifications/Notification";

export const notifications = [
  new KillGameNotification(
    1,
    "04.01.2024 16:41",
    MODULE_NAME.KILL_GAME,
    RECIPIENT.ADMIN,
    true,
    {
      killer: "Adam",
      user: "Hubert",
      infoType: KILL_GAME_INFO_TYPE.EXPECTANCY,
    }
  ),
  new KillGameNotification(
    2,
    "03.01.2024 11:15",
    MODULE_NAME.KILL_GAME,
    RECIPIENT.ADMIN,
    false,
    {
      killer: "Laura",
      user: "Magda",
      infoType: KILL_GAME_INFO_TYPE.REJECTED,
    }
  ),
  new KillGameNotification(
    3,
    "04.01.2024 16:41",
    MODULE_NAME.KILL_GAME,
    RECIPIENT.ADMIN,
    true,
    {
      killer: "Adam",
      user: "Hubert",
      infoType: KILL_GAME_INFO_TYPE.EXPECTANCY,
    }
  ),
  new KillGameNotification(
    4,
    "03.01.2024 11:15",
    MODULE_NAME.KILL_GAME,
    RECIPIENT.ADMIN,
    false,
    {
      killer: "Laura",
      user: "Magda",
      infoType: KILL_GAME_INFO_TYPE.REJECTED,
    }
  ),
  new KillGameNotification(
    5,
    "04.01.2024 16:41",
    MODULE_NAME.KILL_GAME,
    RECIPIENT.ADMIN,
    true,
    {
      killer: "Adam",
      user: "Hubert",
      infoType: KILL_GAME_INFO_TYPE.EXPECTANCY,
    }
  ),
  new KillGameNotification(
    6,
    "03.01.2024 11:15",
    MODULE_NAME.KILL_GAME,
    RECIPIENT.ADMIN,
    true,
    {
      killer: "Laura",
      user: "Magda",
      infoType: KILL_GAME_INFO_TYPE.REJECTED,
    }
  ),
  new KillGameNotification(
    7,
    "03.01.2024 11:15",
    MODULE_NAME.KILL_GAME,
    RECIPIENT.ADMIN,
    true,
    {
      killer: "Laura",
      user: "Magda",
      infoType: KILL_GAME_INFO_TYPE.REJECTED,
    }
  ),
  new KillGameNotification(
    8,
    "03.01.2024 11:15",
    MODULE_NAME.KILL_GAME,
    RECIPIENT.ADMIN,
    true,
    {
      killer: "Laura",
      user: "Magda",
      infoType: KILL_GAME_INFO_TYPE.REJECTED,
    }
  ),
];
