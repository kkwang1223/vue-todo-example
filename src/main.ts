import { createApp } from 'vue'
import App from './App.vue'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.esm.min.js';

createApp(App)
.provide('today', new Date().toISOString().split('T')[0])
.mount('#app');
