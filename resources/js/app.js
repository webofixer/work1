
import Vue from 'vue';
import axios from "axios";

import VueCookies from 'vue-cookies';
Vue.use(VueCookies)

import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)


import Accommodations from "./components/Accommodations";
Vue.component("accommodations", Accommodations);

//axios.defaults.headers.common["X-App-Locale"] = window.App.locale;

const version_key = 'app-version';
const nev_version_key = 'new-app-version';
new Vue({
	el: '#app',
    methods: {
        checkAppVersion(){
            axios.get('/api/check-version').then(({data})=>{
                if (data && data.hash) {
                    if (this.$cookies.isKey(version_key)) {
                        if (this.$cookies.get(version_key) !== data.hash) {
                            this.$cookies.set(nev_version_key, data.hash)
                            $('#reload_page_modal').modal('show')
                        }
                    } else {
                        this.$cookies.set(version_key, data.hash)
                    }
                }
            }).catch(({response})=>{
                console.error(response.data)
            })
        },
        reloadPage() {
            let newHash = this.$cookies.get(nev_version_key)

            this.$cookies.set(version_key, newHash)
            this.$cookies.remove(nev_version_key)

            window.location.reload(true)
        },
    },
	data: {
	},
    created() {
		
        //todo this.checkAppVersion();
    }
});