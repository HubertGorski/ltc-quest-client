
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
  
  const anuluj = () => {
    router.go(-1);
  }
  </script>

   <template>
    <div>
      <p>Czy na pewno chcesz przejść?</p>
      <button @click="confirm">Tak</button>
      <button @click="anuluj">Anuluj</button>
    </div>
  </template>
  
  <style scoped>

  </style>