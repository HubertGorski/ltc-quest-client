<script setup lang="ts"></script>

<template>
  <div>
    <div class="killGameAddCards">
      <v-btn>
        <span>Wybierz graczy</span>
      </v-btn>
      <v-btn>
        <span>Wybierz czynności</span>
      </v-btn>
      <v-btn>
        <span>Wybierz słowa</span>
      </v-btn>
      <v-btn>
        <span>Generuj grę</span>
      </v-btn>
    </div>
  </div>
</template>

<style scoped lang="scss">
.killGameAddCards {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 8px;
}
</style>