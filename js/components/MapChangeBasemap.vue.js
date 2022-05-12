const { ref, reactive, onMounted, computed, provide, inject } = Vue;
const { useRouter, useRoute } = VueRouter;

export default {
  name: 'MapChangeBasemap',
  template: `
  <div class="flex items-center justify-center">
    <div class="inline-flex shadow-md hover:shadow-lg focus:shadow-lg" role="group">
      <button @click="setSource('osm')"
      type="button" class="rounded-l inline-block px-6 py-2.5 bg-blue-600 
      text-white font-medium text-xs leading-tight uppercase hover:bg-blue-700 
      focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800 
      transition duration-150 ease-in-out">正射影像圖</button>

      <button @click="setSource('osm')"
      type="button" class=" inline-block px-6 py-2.5 bg-blue-600 
      text-white font-medium text-xs leading-tight uppercase 
      hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800 
      transition duration-150 ease-in-out">電子地圖</button>

      <button @click="setSource('osm')"
      type="button" class=" rounded-r inline-block px-6 py-2.5 bg-blue-600 
      text-white font-medium text-xs leading-tight uppercase 
      hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800 
      transition duration-150 ease-in-out">混合地圖</button>
    </div>
  </div>
    `,
  setup() {

    const source = reactive({
      osm: new ol.source.OSM(),
      
    })


    // 切换/设置图源
    function setSource(data) {
      ol.layer.setSource(source[data])
    }

    return {
      source,
      setSource
    }
  }
};