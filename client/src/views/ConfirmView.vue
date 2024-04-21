
  <script setup lang="ts">
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  const confirmationTarget = sessionStorage.getItem("targetUrl");

  const confirm = () => {
    if (!confirmationTarget){
        return
    }

    sessionStorage.setItem("isAccepted", 'true');
    router.push(confirmationTarget);
    sessionStorage.removeItem("targetUrl");
  }
  
  const backRoute = () => {
  return router.go(-1);
}
  </script>

   <template>
    <div class="confimView">
      <v-card class="confimView_card text-grey-darken-3">
        <v-icon class="confimView_icon">mdi-file-eye-outline</v-icon>
        <span class="confimView_alert">{{ $t("classifiedInformation.title") }}</span>
        <p class="confimView_info text-grey-darken-2">{{ $t("classifiedInformation.description") }}</p>
      </v-card>
      <div class="confirmView_buttons text-grey-darken-3">
        <div class="confimView_button elevation-1" @click="backRoute">{{ $t("back") }}</div>
        <div class="confimView_button elevation-1" @click="confirm">{{ $t("continue") }}</div>
      </div>
    </div>
  </template>
  
  <style scoped>
.confimView {
  padding: 12px;
}
.confimView_card {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 24px 8px;
}
.confimView_alert{
  padding: 12px;
  font-size: 20px;
}
.confimView_info{
  padding: 8px;
  font-size: 14px;
  text-align: justify;
  font-style: italic;
}
.confimView_icon{
  font-size: 98px;
}
.confirmView_buttons{
  display: flex;
  justify-content: center;
  gap: 12px;
  padding: 12px 0;
}
.confimView_button {
  flex-grow: 1;
  flex-basis: 0;
  padding: 4px;
  text-align: center;
}
  </style>