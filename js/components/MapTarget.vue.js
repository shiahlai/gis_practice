const { ref, reactive, onMounted, computed, provide, inject } = Vue;
const { useRouter, useRoute } = VueRouter;

export default {
  name: 'MapTarget',
  template: `
  <button id="locate"
   class="bg-slate-800/60 p-2 rounded text-white text-xl"><i class="icon-target" /></button>
    `,
  setup() {
    const view = new ol.View({});
      
    const geolocation = new ol.Geolocation({
      // enableHighAccuracy must be set to true to have the heading value.
      trackingOptions: {
        enableHighAccuracy: true,
      },
      projection: view.getProjection(),
    });
    
    document.getElementById('locate').onclick = function() {
      vector.removeAllFeatures();
      geolocate.deactivate();
      document.getElementById('track').checked = false;
      geolocate.watch = false;
      firstGeolocation = true;
      geolocate.activate();
  };
    
   
    // handle geolocation error.
    geolocation.on('error', function (error) {
      const info = document.getElementById('info');
      info.innerHTML = error.message;
      info.style.display = '';
    });
    
    const accuracyFeature = new ol.Feature();
    geolocation.on('change:accuracyGeometry', function () {
      accuracyFeature.setGeometry(geolocation.getAccuracyGeometry());
    });
    
    const positionFeature = new ol.Feature();
    positionFeature.setStyle(
      new ol.style.Style({
        image: new ol.style.CircleStyle({
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
      positionFeature.setGeometry(coordinates ? new Point(coordinates) : null);
    });
    
    new ol.renderer.canvas.VectorLayer({
      map: map,
      source: new ol.source.Vector.VectorSource({
        features: [accuracyFeature, positionFeature],
      }),
    });


    // const locate = document.createElement('div');
    // locate.className = 'bg-slate-800/60 p-2 rounded text-white text-xl';
    // locate.innerHTML = '<button title="Locate me"><i class="icon-target" /></button>';
    // locate.addEventListener('click', function () {
    //   if (!source.isEmpty()) {
    //     map.getView().fit(source.getExtent(), {
    //       maxZoom: 18,
    //       duration: 500,
    //     });
    //   }
    // });
    // map.addControl(
    //   new ol.control.Control({
    //     element: locate,
    //   })
    // );
    
    return {
     
      
    }
  }
};