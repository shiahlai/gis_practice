const { ref, reactive, onMounted, computed, provide, inject, nextTick } = Vue;
const { useRouter, useRoute } = VueRouter;

export default {
  name: 'MapGeolocation',
  template: `
  <section id="mapGeolocation">

    <button @click="getGeolocation" id="zoomToGeolocation"
    class="bg-slate-800/60 p-2 rounded text-white text-xl">
      <i class="icon-target" />
    </button>

   </section>
    `,
  setup() {

    let map, geolocation, componentLayer;

    onMounted(() => {
      map = inject('olMap').map;

      const view = map.getView();

      geolocation = new ol.Geolocation({
        // enableHighAccuracy must be set to true to have the heading value.
        trackingOptions: {
          enableHighAccuracy: true,
        },
        projection: view.getProjection(),
        
      });

      // handle geolocation error.
      geolocation.on('error', function (error) {
        console.log('err', error);
      });

      /* geolocation.setTracking(true); */

      const accuracyFeature = new ol.Feature();
      geolocation.on('change:accuracyGeometry', function () {
        console.log('change:accuracyGeometry', geolocation.getAccuracyGeometry());
        accuracyFeature.setGeometry(geolocation.getAccuracyGeometry());
      });

      const positionFeature = new ol.Feature();
      positionFeature.setStyle(
        new ol.style.Style({
          image: new ol.style.Icon({
            anchor: [0.5, 46],
            anchorXUnits: 'fraction',
            anchorYUnits: 'pixels',
            src: '../icon/person_pin.svg',
          }),
        })
      );

      geolocation.on('change:position', function () {
        const coordinates = geolocation.getPosition();
        console.log('change:position', coordinates)
        positionFeature.setGeometry(coordinates ? new ol.geom.Point(coordinates) : null);
      });

      componentLayer = new ol.layer.Vector({
        map: map,
        source: new ol.source.Vector({
          features: [accuracyFeature, positionFeature],
        }),
      });

    })


    let toggle = false;
    const getGeolocation = () => {
      toggle = !toggle;
      geolocation.setTracking(toggle);
      console.log('my func call', toggle);
    }

    onMounted(() => {
      nextTick(()=>{
        map.addLayer(componentLayer);
      })
    })

    return {
      getGeolocation,
    }
  },
};