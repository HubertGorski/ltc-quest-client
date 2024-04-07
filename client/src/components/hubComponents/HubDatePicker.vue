<script setup lang="ts">
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const locale = useI18n();
import { useDate } from 'vuetify'

const vueDate = useDate();


const props = defineProps({
  label: {
    type: String,
    required: true,
  },
});

const date = defineModel({type: Array<Date>, required: true });

</script>

<template>
    <div class="p-relative">
        <vue-date-picker 
        v-model="date"
        :enable-time-picker="false"
        :locale="locale.locale.value"
        :select-text="$t('select')"
        :cancel-text="$t('cancel')"
        hide-input-icon
        input-class-name="bg-grey-lighten-4 pt-6 pb-2 pl-4 border-none elevation-1 rounded-0 font-16"
        range>
            <template #clear-icon>
              <v-icon class="pr-4 text-grey-darken-2" @click="date = []">mdi-close-circle</v-icon>
            </template>
        </vue-date-picker>
        <span :class="[date.length > 0 ? 'dateSelected' : 'dateNotSelected']" class="text-grey-darken-1">{{ label }}</span>
    </div>
</template>

<style scoped>
.dateSelected{
  position: absolute;
  top: 6px;
  left: 16px;
  font-size: 12px;
  transition: all 0.2s;

}
.dateNotSelected{
  position: absolute;
  top: 16px;
  left: 16px;
  font-size: 16px;
  transition: all 0.2s;
}
</style>
