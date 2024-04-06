<script lang="ts">
import type { FilterTasks } from '@/models/Filters';
import { useI18n } from "vue-i18n";

function getTranslatedFilterOptions(filterOptions: FilterTasks[]) {
    const { t } = useI18n();
    const translatedOptions: FilterTasks[] = [];
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