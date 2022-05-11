const { ref, reactive, onMounted, computed, inject } = Vue;
const { useRouter, useRoute } = VueRouter;
export default {
    name: 'Home',
    template: `
    <main>
        <router-view></router-view>
    </main>
    `,
    setup() {
        return {
        }
    }
};