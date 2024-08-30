<script setup lang="ts">
import { User } from "@/models/User";

const props = defineProps({
  user: {
    type: User,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  dateText: {
    type: String,
    required: true,
  },
  reverse: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div
    :class="{ direction: reverse }"
    class="d-flex py-4 px-2 ga-2 align-center"
  >
    <v-card class="avatar-box">
      <img class="avatar" :src="user.avatar" />
    </v-card>
    <v-card class="flex-grow-1">
      <v-card-text>
        <div
          :class="{ direction: reverse }"
          class="d-flex justify-space-between text-grey-darken-1"
        >
          <div>
            <p class="font-16 text-grey-darken-3">{{ user.name }}</p>
            <p class="font-14">{{ user.roleName }}</p>
          </div>
          <v-icon class="">{{ user.teamLogo }}</v-icon>
        </div>
        <div class="font-italic pt-2 text-grey-darken-2">
          <span>{{ $t(dateText) }}</span>
          <span>{{ date }}</span>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<style scoped>
.avatar-box {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 92px;
  width: 92px;
  border-radius: 50%;
}
.avatar {
  max-height: 100%;
  /* max-width: 100%; TODO: uncomment when avatars will be square */
}
.direction {
  flex-direction: row-reverse;
  text-align: end;
}
</style>
