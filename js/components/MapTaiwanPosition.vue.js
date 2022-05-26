const { ref, reactive, onMounted, computed, provide, inject } = Vue;

export default {
    name: 'MapTaiwanPosition',
    template: `
    
    <section id="mapTaiwanPosition">
    <button @click="flyToTaiwan" class="bg-slate-800/60 py-1 rounded text-white text-3xl">
    <i class="icon-taiwan"></i>
    </button>
    </section>  

    `,
    setup() {

        let map = ref()

        const setMap = (instance) => {
            map = instance
        }

        const flyToTaiwan = () => {
            
            const view = map.getView();
            const taiwan = ol.proj.fromLonLat([120.58, 23.58]);

            view.animate({
                center: taiwan,
                duration: 2000,
            });
        }






        return {
            setMap,
            flyToTaiwan
        }
    }
};