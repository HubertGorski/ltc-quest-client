<script setup lang="ts">
import { useSpaceStore } from '@/stores/spaceStore';

const spaceStore = useSpaceStore();
</script>

<template>
    <v-switch v-model="spaceStore.isPointsBarsAvailable" label="Show points bars" color="primary">
    </v-switch>
</template>