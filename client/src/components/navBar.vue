<script setup lang="ts">
import { computed, ref } from "vue";
import { USER } from "@/enums/enumUsers";
import { useRoute } from "vue-router";
import { noSelectedTeam } from "@/models/Team";

const isOpenMenu = ref<boolean>(false);
const closeMenu = () => {
  isOpenMenu.value = false;
};
const route = useRoute();
const currentRouteName = computed(() => route.name);
</script>

<template>
  <div class="navBar_shadow"></div>
  <div class="navBar">
    <v-menu
      v-model="isOpenMenu"
      :close-on-content-click="false"
      location="bottom"
    >
      <template v-slot:activator="{ props }">
        <v-toolbar :color="noSelectedTeam.color">
          <v-toolbar-title>{{ currentRouteName }}</v-toolbar-title>
          <v-btn class="mx-4" v-bind="props">
            <v-icon size="32">mdi-menu</v-icon>
          </v-btn>
        </v-toolbar>
      </template>
      <v-card center max-width="270">
        <v-list>
          <RouterLink
            class="text-decoration-none text-grey-darken-2"
            @click="closeMenu"
            to="/profile"
          >
            <v-list-item
              prepend-avatar="https://cdn.vuetifyjs.com/images/john.jpg"
              :subtitle="USER.TEAM"
              :title="USER.NAME"
            >
              <template v-slot:append>
                <v-icon>{{ USER.TEAM_LOGO }}</v-icon>
              </template>
            </v-list-item>
          </RouterLink>
        </v-list>
        <v-divider></v-divider>
        <v-list>
          <v-list-item>
            <RouterLink
              class="text-decoration-none text-grey-darken-2"
              @click="closeMenu"
              to="/ranking"
              >Ranking</RouterLink
            >
          </v-list-item>
          <v-list-item>
            <RouterLink
              class="text-decoration-none text-grey-darken-2"
              @click="closeMenu"
              to="/tasks"
              >Zadania</RouterLink
            >
          </v-list-item>
          <v-list-item>
            <RouterLink
              class="text-decoration-none text-grey-darken-2"
              @click="closeMenu"
              to="/bingo"
              >Cyborg bingo</RouterLink
            >
          </v-list-item>
          <v-list-item>
            <RouterLink
              class="text-decoration-none text-grey-darken-2"
              @click="closeMenu"
              to="/settings"
              >Ustawienia konta</RouterLink
            >
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item>
            <RouterLink
              class="text-decoration-none text-grey-darken-2"
              @click="closeMenu"
              to="/login"
              >Wyloguj</RouterLink
            >
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
  </div>
</template>

<style scoped>
.navBar_shadow {
  height: 64px;
}
.navBar {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1;
}
</style>
