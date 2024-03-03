<script setup lang="ts">
import AuthenticationService from "@/services/AuthenticationService";
import { reactive } from "vue";

interface User {
  login: string;
  password: string;
}

const newUser: User = reactive({ login: "", password: "" });

const registerNewUser = async () => {
  await AuthenticationService.register(newUser);
};
</script>

<template>
  <input v-model="newUser.login" type="text" name="login" placeholder="login" />
  <input
    v-model="newUser.password"
    type="password"
    name="password"
    placeholder="password"
  />
  <br />
  <button @click="registerNewUser">Register</button>
</template>
