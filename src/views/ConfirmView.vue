<script setup lang="ts">
import InformationCard from '@/components/InformationCard.vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const icon = "mdi-file-eye-outline";
const title = t("classifiedInformation.title");
const description = t("classifiedInformation.description");
</script>

<template>
  <information-card :icon="icon" :title="title" :description="description" isBackBtn isActionBtn/>
</template>
