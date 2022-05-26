const { ref, reactive, onMounted, computed, provide, inject } = Vue;

export default {
    name: 'MapClear',
    template: `
    
    <section id="mapClear">
    <button @click="mapClear" class="bg-slate-800/60 py-1 rounded text-white text-3xl">
    <i class="icon-trash"></i>
    </button>
    </section>  

    `,
    setup() {

        let map = ref()

        const setMap = (instance) => {
            map = instance
        }

        
        const mapClear = () => {
            // 清除圖層(Layer)
            const layers = map.getAllLayers();
            layers.forEach((layer) => {
                layer.get("keepAlive") ? "" : layer.getSource().clear();
            });

            // 清除疊加層(Overlay)
            map.getOverlays().clear();
        };






        return {
            setMap,
            mapClear
        }
    }
};