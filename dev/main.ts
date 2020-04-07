import Vue from "vue";
import ElementUi from "element-ui";
import App from "./app.vue";
Vue.use(ElementUi);

new Vue({
    render:h=>h(App)
}).$mount("#myApp");