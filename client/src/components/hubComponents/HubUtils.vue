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

export { getTranslatedFilterOptions };
</script>
