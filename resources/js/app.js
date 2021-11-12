
import Vue from 'vue';
import axios from "axios";

import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';
Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

import VueProgressBar from 'vue-progressbar';
Vue.use(VueProgressBar, {
  color: '#55b881',
  failedColor: '#874b4b',
  height: '5px',
  thickness: '5px',
  transition: {
    speed: '0.2s',
    opacity: '0.6s',
    termination: 300,
  },
  autoRevert: true,
  location: 'bottom',
  //inverse: false,
});

import Accommodations from "./components/Accommodations";
Vue.component("accommodations", Accommodations);

//axios.defaults.headers.common["X-App-Locale"] = window.App.locale;

new Vue({
	el: '#app',
	data: {
	},
    created() {
		
    },
    methods: {
    },
});