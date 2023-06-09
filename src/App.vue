<template>
  <div v-if="isAuth" @submit.prevent="logOut">
      <form>
          <p>
              Usuario activo: {{ user.nombre}}
              <strong v-if="user.rol_id === 1">Admin</strong>
          </p>
          <button>Log out</button>
      </form>
  </div>
  <router-view></router-view>
</template>

<script lang="ts" setup>
import { computed} from "vue"
import { useRouter} from "vue-router";
import { useUserStore } from "./stores/userStore";
import { User } from "./interfaces/users/userInterface";
import { UserService } from "./services/auth/Auth";

// Store
const store = useUserStore();

// Router
const router = useRouter();

// Computed properties
const isAuth = computed<Boolean | undefined>(() => store.userIsAuth);
const user = computed<User>(() => store.getUser);

// Methods
const logOut = async () : Promise<void> => {
  const userService = new UserService()
  await userService.logout()
  router.replace({ name: "authLogin" });
  store.logOut();
};
</script>

<style></style>
