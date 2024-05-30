<script lang="ts">
import type { FilterObjectLabel } from "@/models/Filter";
import { useI18n } from "vue-i18n";

function getTranslatedFilterOptions(filterOptions: FilterObjectLabel[]) {
  const { t } = useI18n();
  const translatedOptions: FilterObjectLabel[] = [];
  Object.values(filterOptions).forEach((option, index) => {
    translatedOptions[index] = {
      title: t(option.title),
      value: option.value,
    };
  });
  return translatedOptions;
}

function deepEqual(obj1: any, obj2: any): boolean {
  if (obj1 === obj2) return true;

  if (obj1 == null || obj2 == null) return false;
  if (typeof obj1 !== "object" || typeof obj2 !== "object") return false;

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  for (const key of keys1) {
    if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
      return false;
    }
  }

  return true;
}

function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(item => deepClone(item)) as unknown as T;
  }

  const clonedObj: { [key: string]: any } = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      clonedObj[key] = deepClone((obj as { [key: string]: any })[key]);
    }
  }
  return clonedObj as T;
}

export { getTranslatedFilterOptions, deepEqual, deepClone };
</script>
