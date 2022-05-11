import sourceLayers from '../api/map-source-layers.js'

export default function () {
    // #1 初始化map，並綁定Dom
    let map = new ol.Map({
        controls: [],
        target: 'map',
    });
    // #2 引入map圖層列表
    let baseLayerGroup = new ol.layer.Group({
        layers: sourceLayers.data
    })
    // #3 將map綁定圖層
    map.addLayer(baseLayerGroup);
    // #4 設定初始視角
    let view = new ol.View({
        center: ol.proj.fromLonLat([120.58, 23.58]),
        zoom: 8,
        minZoom: 8,
        maxZoom: 18,
        extent: [13065484.655591443,2432948.0717033036,13780323.74411441,2971676.2470572256]
    });
    // #5 將map綁定初始視角
    map.setView(view);
    // #6 增加控件
    map.addControl(new ol.control.Zoom({ target: 'mapZoomInOut' }));
    map.addControl(new ol.control.ScaleLine({ target: 'mapScaleLine' }));
    // console.log(map.getView().calculateExtent(map.getSize()))

    return map
}

