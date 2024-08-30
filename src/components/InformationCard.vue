<script setup lang="ts">
import { useRouter } from "vue-router";

const props = defineProps({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  icon: {
    type: String,
  },
  isBackBtn: {
    type: Boolean,
  },
  isActionBtn: {
    type: Boolean,
  },
});

const router = useRouter();

const action = () => {
  if (!props.isActionBtn) {
    return;
  }

  const confirmationTarget = sessionStorage.getItem("targetUrl");
  if (!confirmationTarget) {
    return;
  }

  sessionStorage.setItem("isAccepted", "true");
  router.push(confirmationTarget);
  sessionStorage.removeItem("targetUrl");
};

const back = () => {
  return router.go(-1);
};
</script>

<template>
  <div class="informationCard">
    <v-card class="informationCard_card text-grey-darken-3">
      <v-icon v-if="icon" class="informationCard_icon"> {{ icon }} </v-icon>
      <span v-if="title" class="informationCard_alert"> {{ title }} </span>
      <p v-if="description" class="informationCard_info text-grey-darken-2">
        {{ description }}
      </p>
    </v-card>
    <div class="informationCard_buttons text-grey-darken-3">
      <div
        v-if="isBackBtn"
        class="informationCard_button elevation-1"
        @click="back"
      >
        {{ $t("back") }}
      </div>
      <div
        v-if="isActionBtn"
        class="informationCard_button elevation-1"
        @click="action"
      >
        {{ $t("continue") }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.informationCard {
  padding: 12px;
}
.informationCard_card {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 24px 8px;
}
.informationCard_alert {
  padding: 12px;
  font-size: 20px;
  text-align: center;
}
.informationCard_info {
  padding: 8px;
  font-size: 14px;
  text-align: justify;
  font-style: italic;
}
.informationCard_icon {
  font-size: 98px;
}
.informationCard_buttons {
  display: flex;
  justify-content: center;
  gap: 12px;
  padding: 12px 0;
}
.informationCard_button {
  flex-grow: 1;
  flex-basis: 0;
  padding: 4px;
  text-align: center;
}
</style>
