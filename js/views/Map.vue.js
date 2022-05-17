import MapToolBar from '../components/MapToolbar.vue.js'
import mapInit from '../utils/map-init.js'
import MapControlMousePosition from '../components/MapControlMousePosition.vue.js'
import MapChangeBasemap from '../components/MapChangeBasemap.vue.js'
import MapInfo from '../components/MapInfo.vue.js'
import MapGeolocation from '../components/MapGeolocation.vue.js'

const { ref, reactive, onMounted, computed, provide, inject } = Vue;
const { useRouter, useRoute } = VueRouter;

export default {
    name: 'Map',
    components: {
        'map-toolbar': MapToolBar,
        'map-control-mouse-position': MapControlMousePosition,
        'map-change-basemap' : MapChangeBasemap,
        'map-info' : MapInfo,
        'map-geolcation' : MapGeolocation,
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
                <map-change-basemap :map="olMap.map"></map-change-basemap>  
            </div>
            
            <div 
            class="rm-block" 
            v-if="olMap.rmBlock">
                <section id="mapZoomInOut"></section>

                <section id="mapTaiwan">
                <button class="bg-slate-800/60 py-1 rounded text-white text-3xl">
                <i class="icon-taiwan" />
                </button>
                </section>           
                
                <map-geolocation />
                

            </div>

            <div 
            class="rb-block" 
            v-if="olMap.rbBlock">
                <map-info />

                <map-control-mouse-position />
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
            rbBlock: true,
            rmBlock: true,
        });
        provide('olMap', olMap);
        onMounted(() => {
            olMap.map = mapInit();
            console.log('map', olMap.map);
        })
        return {
            olMap
        }
    }
};