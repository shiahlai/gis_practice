const { ref, reactive, onMounted, computed, provide, inject } = Vue;
const { useRouter, useRoute } = VueRouter;

export default {
  name: 'MapGeolocation',
  template: `
  <section id="mapGeolocation">

    <button @click="MyFunction"
    class="bg-slate-800/60 p-2 rounded text-white text-xl">
      <i class="icon-target" />
    </button>

   </section>
    `,
  setup() {

    let map, geolocation, positionFeature;

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

      positionFeature = new ol.Feature();
      positionFeature.setStyle(
        new ol.style.Style({
          image: new ol.style.Circle({
            radius: 6,
            fill: new ol.style.Fill({
              color: '#3399CC',
            }),
            stroke: new ol.style.Stroke({
              color: '#fff',
              width: 2,
            }),
          }),
        })
      );

      geolocation.on('change:position', function () {
        const coordinates = geolocation.getPosition();
        console.log('change:position', coordinates)
        positionFeature.setGeometry(coordinates ? new ol.geom.Point(coordinates) : null);
      });

      new ol.renderer.canvas.VectorLayer({
        map: map,
        source: new ol.source.Vector({
          features: [accuracyFeature, positionFeature],
        }),
      });

      // update the HTML page when the position changes.
      geolocation.on('change', function () {
        const acc = geolocation.getAccuracy() + ' [m]';
        const alt = geolocation.getAltitude() + ' [m]';
        const alt_acc = geolocation.getAltitudeAccuracy() + ' [m]';
        const head = geolocation.getHeading() + ' [rad]';
        const speed = geolocation.getSpeed() + ' [m/s]';

        console.log('geo changed', {
          acc, alt, alt_acc, head, speed
        })
      });


    })


    let toggle = false;
    const MyFunction = () => {
      toggle = !toggle;
      geolocation.setTracking(toggle);
      console.log('my func call', toggle);
    }

    return {
      MyFunction,
    }
  },
};