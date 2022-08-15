<template>
  <section class="has-text-centered" :style="clientWidth">
    <p>{{ $t("welcome.intro") }}</p>
    <div class="container"></div>
    <router-link class="button button-app mt-3" to="/users">
      {{ $t("welcome.continue") }}
    </router-link>
  </section>
</template>

<script>
import { defineComponent, computed, ref } from "vue";
import store from "../store/store";
export default defineComponent({
  setup: () => {
    const canSearch = ref(false);

    return {
      clientWidth: computed(() => store.state.clientWidth),
    };
  },
});
</script>
