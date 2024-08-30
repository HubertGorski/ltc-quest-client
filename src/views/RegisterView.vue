<script setup lang="ts">
import AuthenticationService from "@/services/AuthenticationService";
import axios from "axios";
import { reactive, ref } from "vue";

interface User {
  login: string;
  password: string;
}
const error = ref<string>("");
const newUser: User = reactive({
  login: "",
  password: "",
});

const registerNewUser = async () => {
  try {
    await AuthenticationService.register(newUser);
    error.value = "";
  } catch (e) {
    if (axios.isAxiosError(e)) {
      error.value = e.response?.data.error;
    }
  }
};
</script>

<template>
  <div>
    <div
      :class="{ 'rounded-b-xl': !error }"
      class="elevation-2 mx-4 mt-12 mb-2 rounded-t-lg"
    >
      <v-toolbar class="rounded-t-lg" color="deep-purple accent-4">
        <v-toolbar-title>Register</v-toolbar-title>
      </v-toolbar>
      <div class="px-4 py-4">
        <form ref="register-form">
          <v-text-field
            label="Login"
            v-model="newUser.login"
            :rules="[(v) => !!v || 'Item is required']"
          ></v-text-field>
          <v-text-field
            label="Password"
            type="password"
            :rules="[(v) => !!v || 'Item is required']"
            v-model="newUser.password"
          ></v-text-field>
          <div class="d-flex justify-center">
            <v-btn @click="registerNewUser">Register</v-btn>
          </div>
        </form>
      </div>
    </div>
    <div
      v-if="error"
      class="rounded-b-xl d-flex justify-center elevation-2 py-4 px-4 mx-auto w-25 text-red-darken-4"
    >
      {{ error }}
    </div>
  </div>
</template>
