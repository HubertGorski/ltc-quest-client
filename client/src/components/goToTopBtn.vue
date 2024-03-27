<script setup lang="ts">
import { ref } from "vue";

const fab = ref<Boolean>(false);
const onScroll = () => {
  if (typeof window === "undefined") return;
  const top = window.scrollY || 0;
  fab.value = top > 20;
};

const toTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
</script>

<template>
  <transition name="fade">
    <v-btn class="goToTopBtn" v-scroll="onScroll" @click="toTop" v-show="fab">
      <v-icon>mdi-arrow-up</v-icon>
    </v-btn>
  </transition>
</template>

<style scoped>
.goToTopBtn {
  position: fixed;
  bottom: 8px;
  right: 8px;
  min-width: 36px;
  z-index: 1;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
