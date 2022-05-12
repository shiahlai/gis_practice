const { ref, reactive, onMounted, computed, provide, inject } = Vue;
const { useRouter, useRoute } = VueRouter;

export default {
    name: 'MapControlMousePosition',
    template: `
    <div id="mapMousePosition" class="bg-sky-600/30 p-2 rounded text-sm">
      <div id="wgs84" class="flex flex-row mb-1">
        <div class="bg-slate-800/50 px-1 rounded text-white mr-1">經緯度</div>
      </div>
      <div id="twd97" class="flex flex-row">
        <div class="bg-slate-800/50 px-1 rounded text-white mr-1">97坐標</div>
      </div>
    </div>
    `,
    setup() {
        return {
        }
    }
};