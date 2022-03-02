<template>
  <nav class="navbar">
    <div class="navbar__links">
      <div>
        <NuxtLink class="link" to="/">Home</NuxtLink>
      </div>
      <!-- if logged -->
      <client-only>
        <div v-if="isLogged">
          <NuxtLink
            :to="{
              path: profilPath,
            }"
            class="link"
          >
            Profil
          </NuxtLink>
          <div @click="logout" class="link">Logout</div>
        </div>
      </client-only>
      <!-- if NOT logged -->
      <client-only>
        <div v-if="!isLogged">
          <NuxtLink class="link" :to="{ path: '/login' }"> Login </NuxtLink>
          <NuxtLink class="link" :to="{ path: '/register' }">
            Register
          </NuxtLink>
        </div>
      </client-only>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.commit("LOGOUT");
      this.$router.push("/");
    },
  },

  computed: {
    isLogged() {
      if (Object.keys(this.$store.state.loggedUser).length !== 0) {
        return true;
      }
      return false;
    },
    profilPath() {
      let role = "user";

      if (Object.keys(this.$store.state.loggedUser).length !== 0) {
        if (this.$store.state.loggedUser.admin) {
          role = "admin";
        }
      } else {
        return;
      }
      return `/${role}/${this.$store.state.loggedUser._id}`;
    },
  },
};
</script>

<style lang="scss">
.navbar {
  background: rgb(199, 9, 9);

  &__links {
    display: flex;
    justify-content: space-between;
    padding: 0 20px;

    & > div {
      display: flex;
    }

    .link {
      display: block;
      background: white;
      padding: 10px;
      color: rgb(199, 9, 9);
      cursor: pointer;
    }
  }
}
</style>
