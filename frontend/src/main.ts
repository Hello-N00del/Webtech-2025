import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import './styles/globals.css';
// optional, falls ihr einen Router habt
// import router from './router';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
// app.use(router); // aktivieren, wenn Router benutzt wird

app.mount('#app');
