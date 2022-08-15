import {
  createApp
} from 'vue'
import App from './App.vue'

import router from './router/router';
import store from './store/store';

const app = createApp(App);
app.use(router)
app.use(store)

import i18n from "./store/i18n";

app.use(i18n)

app.mount('#app')

export default app