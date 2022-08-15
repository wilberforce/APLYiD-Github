<template>
  <section :style="clientWidth">
    <p class="is-size-5 mb-0">
      {{ $t("choose.select") }}
    </p>

    <div class="field has-addons">
      <div class="control">
        <input
          class="input"
          type="text"
          placeholder="Find a github user"
          v-model="search"
        />
      </div>
      <div class="control">
        <button
          class="button is-info"
          @click="searchUsers"
          :disabled="search.length < 4"
        >
          Search
        </button>
      </div>
    </div>

    <div class="field has-addons">
      Sorting:
      <div class="control">
        <label class="radio">
          <input
            type="radio"
            name="sorting"
            v-bind:value="1"
            v-model="sort_order"
          />
          A-Z
        </label>
        <label class="radio">
          <input
            type="radio"
            name="sorting"
            v-bind:value="-1"
            v-model="sort_order"
          />
          Z-A
        </label>
      </div>
    </div>
    <p>Found: {{ users.length }}</p>

    <table v-if="users.length" class="table">
      <thead>
        <tr>
          <th>User</th>
          <th>Avatar</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(user, index) in sortedUsers" v-bind:key="index">
          <td>
            <router-link :to="{ name: 'user', params: { id: user.login } }">{{
              user.login
            }}</router-link>
          </td>
          <td>
            <router-link :to="{ name: 'user', params: { id: user.login } }">
              <figure class="image is-128x128">
                <img :src="user.avatar_url" />
              </figure>
            </router-link>
          </td>
          <!---
      <td>{{user.followers}}</td>
      <td>{{user.public_repos}}</td>
      <td>{{user.created_at}}</td>
      -->
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script lang="ts">

type GithubUser = {
  login: string;
  avatar_url: string;
}
 

import { ref, computed, defineComponent } from "vue";
import store from "../store/store";
import { useRouter } from "../router/router";

export default defineComponent({
  
  setup: () => {
    const router = useRouter();
    const users = ref([]);
    const search = ref("wilber");
    const sort_order = ref(1);
    return {
      clientWidth: computed(() => store.state.clientWidth),
      router,
      users,
      search,
      sort_order,
    };
  },
  computed: {
    sortedUsers() {
      let sorted:GithubUser[] = this.users.sort(this.compare);
      return sorted;
    },
  },
  methods: {
    compare(a:GithubUser, b:GithubUser) {
      if (a.login.toLowerCase() < b.login.toLowerCase()) {
        return -this.sort_order;
      }
      if (a.login.toLowerCase() > b.login.toLowerCase()) {
        return this.sort_order;
      }
      return 0;
    },

    searchUsers() {

      let q = encodeURIComponent(this.search);
      // When development use local files to prevent Github rate limit
      let route = import.meta.env.DEV
        ? "/src/assets/users/search.json"
        : `https://api.github.com/search/users?q=${q}`;

      fetch(route)
        .then((response) => response.json())
        .then(
          (data) => {
            this.users = data.items;
          } // Handle errors here
        );
    },
  },
});
</script>

<style lang="scss">
// Prevent IOS mobile pseudo hover highlighting
@media screen and (max-width: 768px) {
  a.button:hover {
    background-color: inherit;
    color: inherit;
  }
}
</style>
