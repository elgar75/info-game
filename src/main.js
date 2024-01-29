import { createApp } from 'vue'
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import { createRouter, createWebHistory } from 'vue-router'
import landingPage from './pages/landingPage.vue';
import gamePage from './pages/gamePage.vue';


const router = new createRouter({
    history:createWebHistory(),
    routes: [
      { path: '/', component: landingPage },
      { path: '/game', component: gamePage },
    ]
  });




const app = createApp(App);
app.use(router)
app.mount('#app');
