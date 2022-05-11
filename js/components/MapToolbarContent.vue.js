const { ref, reactive, onMounted, computed, provide, inject } = Vue;
const { useRouter, useRoute } = VueRouter;

export default {
    name: 'MapToolbarContent',
    template: `
    <article id="layerSwitcher">123</article>
    `,
    setup() {

        onMounted(() => {
        })
        return {
        }
    }
};