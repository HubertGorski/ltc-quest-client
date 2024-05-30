import { LANG } from "@/enums/languagesEnum";

export class KillGameActionKey {
  keyId: number;
  lang: LANG;
  action: string;
  usageCount: number;

  constructor(keyId: number = 0, lang: LANG = LANG.PL, action: string = "", usageCount: number = 0) {
    this.keyId = keyId;
    this.lang = lang;
    this.action = action;
    this.usageCount = usageCount;
  }
}
