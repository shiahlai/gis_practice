import MapToolBar from '../components/MapToolbar.vue.js'
import mapInit from '../utils/map-init.js'

const { ref, reactive, onMounted, computed, provide, inject } = Vue;
const { useRouter, useRoute } = VueRouter;

export default {
    name: 'Map',
    components: {
        'map-toolbar': MapToolBar
    },
    template: `
    <!-- main -->
    <main id="mapPage">
        <article 
        id="map"
         tabindex="0">
            <div 
            class="rt-block" 
            v-if="olMap.rtBlock">
            </div>
            <div 
            class="rb-block" 
            v-if="olMap.rbBlock">
                <section id="mapZoomInOut"></section>
                <section id="mapScaleLine"></section>
            </div>
        </article>
        <map-toolbar></map-toolbar>
    </main>
    `,
    setup() {
        let olMap = reactive({
            map: null,
            rtBlock: true,
            rbBlock: true
        });
        provide('olMap', olMap);
        onMounted(() => {
            olMap.map = mapInit();
        })
        return {
            olMap
        }
    }
};