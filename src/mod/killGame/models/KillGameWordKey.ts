import { LANG } from "@/enums/languagesEnum";

export class KillGameWordKey {
  keyId: number;
  lang: LANG;
  text: string;
  usageCount: number;
  ownerId: number;

  constructor(keyId: number = 0, lang: LANG = LANG.PL, text: string = "", usageCount: number = 0, ownerId: number = 0) {
    this.keyId = keyId;
    this.lang = lang;
    this.text = text;
    this.usageCount = usageCount;
    this.ownerId = ownerId;
  }
}
