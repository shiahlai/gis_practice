import router from './router.js'
const { ref, reactive, onMounted, computed, provide, readonly } = Vue;
const { useRouter, useRoute } = VueRouter;
const colorBrand = '#00a687';

const app = {
    setup() {
        onMounted(() => {
        })
        return {
        }
    }
}

Vue.createApp(app).use(router).mount('#app');
