const { ref, reactive, onMounted, computed, provide, inject, nextTick } = Vue;

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

    let geolocation;

    const drawIcon = (map) => {

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


      const iconFeature = new ol.Feature();

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
      map.addLayer(vectorLayer)

      geolocation.on('change:position', function () {
        const coordinates = geolocation.getPosition();
        console.log('change:position', coordinates)
        iconFeature.setGeometry(coordinates ? new ol.geom.Point(coordinates) : null);
      });

    }

    let toggle = false;
    const getGeolocation = () => {
      toggle = !toggle;
      geolocation.setTracking(toggle);
      console.log('my func call', toggle);
    }

    return {
      getGeolocation,
      drawIcon,
    }
  },


};