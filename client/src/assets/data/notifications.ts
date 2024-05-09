import { MODULE_NAME } from "@/models/Module";
import {
  KILL_GAME_ADMIN_INFO_TYPE,
  KILL_GAME_USER_INFO_TYPE,
  KillGameAdminNotification,
  KillGameUserNotification,
} from "@/models/notifications/KillGameNotification";
import { RECIPIENT } from "@/models/notifications/Notification";

export const adminKillGameNotifications = [
  new KillGameAdminNotification(
    1,
    "04.01.2024 16:41",
    MODULE_NAME.KILL_GAME,
    RECIPIENT.ADMIN,
    true,
    {
      killer: "Adam",
      user: "Hubert",
      infoType: KILL_GAME_ADMIN_INFO_TYPE.EXPECTANCY,
    }
  ),
  new KillGameAdminNotification(
    2,
    "03.01.2024 11:15",
    MODULE_NAME.KILL_GAME,
    RECIPIENT.ADMIN,
    false,
    {
      killer: "Laura",
      user: "Magda",
      infoType: KILL_GAME_ADMIN_INFO_TYPE.REJECTED,
    }
  ),
  new KillGameAdminNotification(
    3,
    "04.01.2024 16:41",
    MODULE_NAME.KILL_GAME,
    RECIPIENT.ADMIN,
    true,
    {
      killer: "Adam",
      user: "Hubert",
      infoType: KILL_GAME_ADMIN_INFO_TYPE.EXPECTANCY,
    }
  ),
  new KillGameAdminNotification(
    4,
    "03.01.2024 11:15",
    MODULE_NAME.KILL_GAME,
    RECIPIENT.ADMIN,
    false,
    {
      killer: "Laura",
      user: "Magda",
      infoType: KILL_GAME_ADMIN_INFO_TYPE.REJECTED,
    }
  ),
  new KillGameAdminNotification(
    5,
    "04.01.2024 16:41",
    MODULE_NAME.KILL_GAME,
    RECIPIENT.ADMIN,
    true,
    {
      killer: "Adam",
      user: "Hubert",
      infoType: KILL_GAME_ADMIN_INFO_TYPE.EXPECTANCY,
    }
  ),
  new KillGameAdminNotification(
    6,
    "03.01.2024 11:15",
    MODULE_NAME.KILL_GAME,
    RECIPIENT.ADMIN,
    true,
    {
      killer: "Laura",
      user: "Magda",
      infoType: KILL_GAME_ADMIN_INFO_TYPE.REJECTED,
    }
  ),
  new KillGameAdminNotification(
    7,
    "03.01.2024 11:15",
    MODULE_NAME.KILL_GAME,
    RECIPIENT.ADMIN,
    true,
    {
      killer: "Laura",
      user: "Magda",
      infoType: KILL_GAME_ADMIN_INFO_TYPE.REJECTED,
    }
  ),
  new KillGameAdminNotification(
    8,
    "03.01.2024 11:15",
    MODULE_NAME.KILL_GAME,
    RECIPIENT.ADMIN,
    true,
    {
      killer: "Laura",
      user: "Magda",
      infoType: KILL_GAME_ADMIN_INFO_TYPE.REJECTED,
    }
  ),
];

export const userKillGameNotifications = [
  new KillGameUserNotification(
    1,
    "03.01.2024 11:15",
    MODULE_NAME.KILL_GAME,
    RECIPIENT.USER,
    false,
    {
      owner: "Konrad",
      user: "Adam",
      infoType: KILL_GAME_USER_INFO_TYPE.REJECTED,
      newCards: null,
    }
  ),
  new KillGameUserNotification(
    2,
    "03.01.2024 14:15",
    MODULE_NAME.KILL_GAME,
    RECIPIENT.USER,
    false,
    {
      owner: "Konrad",
      user: "Hubert",
      infoType: KILL_GAME_USER_INFO_TYPE.REJECTED,
      newCards: null,
    }
  ),
  new KillGameUserNotification(
    3,
    "05.02.2024 12:15",
    MODULE_NAME.KILL_GAME,
    RECIPIENT.USER,
    false,
    {
      owner: "Konrad",
      user: "Krzysiek",
      infoType: KILL_GAME_USER_INFO_TYPE.KILL,
      newCards: 4,
    }
  ),
];
