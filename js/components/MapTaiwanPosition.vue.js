const { ref, reactive, onMounted, computed, provide, inject } = Vue;
const { useRouter, useRoute } = VueRouter;

export default {
    name: 'MapTaiwanPosition',
    template: `
    
    <section id="mapTaiwanPosition">
    <button :click="panToTaiwan" class="bg-slate-800/60 py-1 rounded text-white text-3xl">
    <i class="icon-taiwan" />
    </button>
    </section>  

    `,
    setup() {

        const map = inject('olMap').map
        const view = map.getView()

        const taiwan = ol.proj.fromLonLat([120.58, 23.58]);

        const panToTaiwan = () => {
            view.animate({
                center: taiwan,
                duration: 2000,
              });
        }

        return {
            map,
            view,
            panToTaiwan
        }
    }
};