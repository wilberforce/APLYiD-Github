<template>
    <section :style="clientWidth">
        <p class="is-size-2">{{$t("failure.intro")}}</p>
        <div v-if="connectFailType === 'failure.connect'">
            <p>
                {{$t(connectFailType)}}
                <br>
                &ldquo;{{ssid}}&rdquo;
            </p>
            <router-link class="button button-app is-rounded is-info mt-3" to="/choose">
                {{$t("failure.btn")}}
            </router-link>
        </div>
        <div v-else>
            <p>{{$t("failure.reconnect")}}</p>
        </div>
    </section>
</template>

<script lang="ts">
    import {
        ref,
        computed,
        defineComponent
    } from 'vue'
    import store from "../store/store";

    export default defineComponent({
        setup: () => {
            const ssid = ref(store.state.settings.wifi.ssid);
            return {
                ssid,
                connectFailType: computed(() => store.state.connectFailType),
                clientWidth: computed(() => store.state.clientWidth)
            }
        }
    })
</script>