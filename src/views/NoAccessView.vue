<script setup lang="ts">
import InformationCard from '@/components/InformationCard.vue';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const icon = "mdi-shield-crown-outline";
const title = t("noAccess.title");
const description = t("noAccess.description");
</script>

<template>
  <information-card :icon="icon" :title="title" :description="description" isBackBtn/>
</template>
