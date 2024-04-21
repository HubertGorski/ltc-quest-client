<script setup lang="ts">
import { ref } from 'vue';

const show = ref(true);
</script>

<template>
  <div class="killGamePanel text-grey-darken-2">
    <div class="killGamePanel_header">
      <v-card class="px-2 py-2 text-grey-darken-2">
        <v-icon>mdi-information-variant</v-icon>
      </v-card>
      <v-card class="summaryPanel text-grey-darken-2">
        <div class="summaryPanel_tab">
          <v-tooltip v-model="show" location="top">
            <template v-slot:activator="{ props }">
                <v-icon @click="show = !show" v-bind="props">mdi-cards-outline</v-icon>
            </template>
            <span>cards tooltip</span>
          </v-tooltip>
          <div>4</div>
        </div>
        <div class="summaryPanel_tab">
          <v-icon>mdi-account-remove-outline</v-icon>
          <div>2</div>
        </div>
        <div class="summaryPanel_tab">
          <v-icon>mdi-account-heart-outline</v-icon>
          <div>14</div>
        </div>
      </v-card>
    </div>
    <div>
      <div class="statusBox">
        <v-icon class="statusBox_icon">mdi-emoticon-cool-outline</v-icon>
        <span class="statusBox_text"
          >Żadne zabójstwo nie oczekuje na potwierdzenie.</span
        >
      </div>
    </div>
    <v-divider />
  </div>
</template>

<style scoped>
.killGamePanel {
  padding: 12px;
}
.killGamePanel_header {
  display: flex;
  justify-content: space-between;
}
.summaryPanel {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  padding: 4px;
  width: min-content;
}
.summaryPanel_tab {
  display: flex;
  padding: 4px;
  align-items: center;
  gap: 4px;
}
.statusBox {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px;
}
.statusBox_icon {
  font-size: 68px;
}
.statusBox_text {
  text-align: center;
  padding-top: 16px;
}
</style>
