<template>
  <section class="has-text-centered" :style="clientWidth">
    <p>{{ $t("welcome.intro") }}</p>

    {{ $route.params.id }}

    <div v-if="user.login" class="user">
      <img :src="user.avatar_url" />
      <h1 class="is-size-1">{{ user.login }}</h1>
      <h3 class="is-size-4">Public Repos {{ user.public_repos }}</h3>
      <h3 class="is-size-4">Followers {{ user.followers }}</h3>
    </div>

<router-link class="button is-info" to="/">Restart</router-link>    
  </section>
</template>

<script>
import { defineComponent, computed, ref } from "vue";
import store from "../store/store";
import { useRouter } from '../router/router';

export default defineComponent({
  setup: () => {
    const router = useRouter()
    const user = ref({
      avatar_url: undefined,
      login: null,
      public_repos: null,
      followers: null,
    });

    return {
      clientWidth: computed(() => store.state.clientWidth),
      user,
      router
    };
  },

  mounted() {
    const user = this.router.currentRoute.value.params.id;
    this.getUser(user);
  },
  methods: {
    async getUser(username) {
      //let route = 'https://api.github.com/users/' + username;
      // When development use local files to prevent Github rate limit
      let route = import.meta.env.DEV  ? "/src/assets/users/" + username + ".json" : 'https://api.github.com/users/' + username;
    

      fetch(route)
        .then((response) => response.json())
        .then((data) => {
          this.user = data;
        }); // Handle errors here
    }
  },
});
</script>
