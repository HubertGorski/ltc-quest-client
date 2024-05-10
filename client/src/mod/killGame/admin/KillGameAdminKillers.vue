<script setup lang="ts">
import { ref } from "vue";
import type { KillGameUser } from "../models/KillGameUser";

const props = defineProps({
  killers: {
    type: Array<KillGameUser>,
    required: true,
  },
});

</script>

<template>
  <div>
    {{ killers }}
  </div>
</template>
