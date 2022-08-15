<template>
  <main class="hero">
    <div class="hero-head has-text-centered">
      <router-link to="/">
      <!--
        <svgLogo class="mt-5 mb-5" style="width:7rem" />
        -->
        <img src="./assets/aplyid-logo.svg" alt="APLYiD" class="mt-5 mb-5" style="width:7rem" />
      </router-link>
    </div>

    <div class="hero-body pt-0" style="align-items: start;">
      <div class="columns">
        <div class="column is-half is-offset-one-quarter">
          <div class="container has-text-centered" ref="viewport">
            <router-view v-slot="{ Component }">
              <transition :name="transitionName" @after-leave="afterLeave" @before-enter="beforeEnter">
                <component :is="Component" />
              </transition>
            </router-view>
           
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
  import { defineComponent, computed } from 'vue'
  import { useRouter } from './router/router';
  import { useRoute } from 'vue-router';
  import store from './store/store';

  import { useI18n } from '@yangss/vue3-i18n';

  import { getCurrentInstance } from "vue";

  export default defineComponent({
    name: 'App',
    setup() {
      const { locale, t } = useI18n();
      const route = useRoute()
      const router = useRouter()
      let transitionName = '';

      return {
        route,
        router,
        transitionName,
        switchLanguage: (loc: string) => {
          locale.value = loc
        },
        settingsLocale: computed(() => store.state.locale)
      }
    },
    mounted() {
      // @ts-ignore: Object is possibly 'null'
      window.addEventListener("resize", this.resize);
      window.addEventListener("orientationchange", this.resize);
      this.resize();
    },
    watch: {
      $route(to, from) {
        let trans = to.path === "/" ? "" : "slide";
        this.transitionName = trans;
      },
      settingsLocale(newLocale) {
        this.switchLanguage(newLocale);
      },
      reconnectError(error) {
        if (error) {
          this.fatalError();
        }
      },
      hasNoSocket(error) {
        if (error) {
          this.fatalError();
        }
      }
    },
    methods: {
       beforeEnter(el:any) {
        store.commit('setTransistion',{state:'before-enter'});
       },
       afterLeave(el:any) {
        store.commit('setTransistion',{state:'after-leave'});
       },       
      resize() {
        store.commit('setWidth',this.$refs.viewport);
      },
      fatalError() {
          store.commit('setConnectFailType', {
            msg: 'failure.reconnect'
          });
          this.router.push('/failure')
      }
    }
  })
</script>

<style lang="scss">
  @import './sass/main.scss';

  .slide-enter-to {
    position: absolute;
    right: 0;
    animation: enterFromRight 500ms both cubic-bezier(0.165, 0.84, 0.44, 1);
  }

  .slide-enter-from {
    position: absolute;
    right: -100%;
  }

  .slide-leave-to {
    position: absolute;
    left: -100%;
    animation: leaveToLeft 500ms both cubic-bezier(0.165, 0.84, 0.44, 1);
  }

  .slide-leave-from {
    position: absolute;
    left: 0;
  }

  @keyframes leaveToLeft {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-25%);
    filter: brightness(0.5);
  }
}

@keyframes enterFromRight {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}
</style>