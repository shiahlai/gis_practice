const { ref, reactive, onMounted, computed, provide, inject } = Vue;
const { useRouter, useRoute } = VueRouter;

export default {
  name: 'testPosition',
  template: `

    `,
  setup() {



    onMounted(() => {
      // map = inject('olMap').map;

      // const view = map.getView();

      const iconFeature = new ol.Feature({
        geometry: new ol.geom.Point([0, 0]),
        name: 'Null Island',
        population: 4000,
        rainfall: 500,
      });
      
      const iconStyle = new ol.style.Style({
        image: new ol.style.Icon({
          anchor: [0.5, 46],
          anchorXUnits: 'fraction',
          anchorYUnits: 'pixels',
          src: '../icon/person_pin.svg',
        }),
      });
      
      iconFeature.setStyle(iconStyle);
      
      const vectorSource = new ol.source.Vector({
        features: [iconFeature],
      });
      
      const vectorLayer = new ol.layer.Vector({
        source: vectorSource,
      });
      
      const rasterLayer = new ol.layer.Tile({
        source: new ol.source.TileJSON({
          url: 'https://a.tiles.mapbox.com/v3/aj.1x1-degrees.json?secure=1',
          crossOrigin: '',
        }),
      });
      
      const target = document.getElementById('map');
      const map = new ol.Map({
        layers: [rasterLayer, vectorLayer],
        target: target,
        view: new ol.View({
          center: [0, 0],
          zoom: 3,
        }),
      })
      
      const modify = new ol.interaction.Modify({
        hitDetection: vectorLayer,
        source: vectorSource,
      });
      modify.on(['modifystart', 'modifyend'], function (evt) {
        target.style.cursor = evt.type === 'modifystart' ? 'grabbing' : 'pointer';
      });
      const overlaySource = modify.getOverlay().getSource();
      overlaySource.on(['addfeature', 'removefeature'], function (evt) {
        target.style.cursor = evt.type === 'addfeature' ? 'pointer' : '';
      });
      
      map.addInteraction(modify);

      

    })

    




    return {

    }
  },
};