const { ref, reactive, onMounted, computed, provide, inject } = Vue;
const { useRouter, useRoute } = VueRouter;

export default {
    name: 'MapControlMousePosition',
    template: `
    <div id="mapMousePosition">
    <div id="wgs84">
      <div class="label">經緯度</div>
    </div>
    <div id="twd97">
      <div class="label">97坐標</div>
    </div>
  </div>
    `,
    setup() {
        


        onMounted(() => {

        })
        return {

        }
    }
};