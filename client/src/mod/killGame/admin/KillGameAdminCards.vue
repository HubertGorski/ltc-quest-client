<script setup lang="ts">
import { ref } from "vue";
import type { KillGameCard } from "../models/KillGameCard";

const props = defineProps({
  cards: {
    type: Array<KillGameCard>,
    required: true,
  },
});

</script>

<template>
  <div>
    {{ cards }}
  </div>
</template>
