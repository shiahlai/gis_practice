let matrixIds = [];
let resolutions = [];
const maxResolution = ol.extent.getWidth(ol.proj.get('EPSG:3857').getExtent()) / 256;
for (let i = 0; i < 20; i++) {
    matrixIds[i] = i.toString();
    resolutions[i] = maxResolution / Math.pow(2, i);
}
const attributions = '圖資應用說明：本系統提供之圖資，僅可作為查詢地理位置之參考，實際圖形及位置仍應以各公告圖籍與公告地籍資料為準';

// OpenStreetMap
let osm = new ol.layer.Tile({
    source: new ol.source.OSM({attributions: attributions,}),
    visible: false,
    keepAlive: true,
    title: 'openStreetMap'    
});
// 臺灣通用電子地圖(套疊等高線)
let nlscEmap5 = new ol.layer.Tile({
    source: new ol.source.WMTS({
        attributions: attributions,
        url: 'https://wmts.nlsc.gov.tw/wmts',
        name: "EMAP5",
        layer: "EMAP5",
        matrixSet: "EPSG:3857",
        tileGrid: new ol.tilegrid.WMTS({
            origin: [-20037508, 20037508],
            resolutions: resolutions,
            matrixIds: matrixIds,
        }),
        format: "image/png",
        style: "_null"
    }),
    visible: true,
    keepAlive: true,
    title: 'nlscEmap5'
});
// 臺灣通用正射影像圖
let nlscPhoto2 = new ol.layer.Tile({
    source: new ol.source.WMTS({
        attributions: attributions,
        url: 'https://wmts.nlsc.gov.tw/wmts',
        name: "PHOTO2",
        layer: "PHOTO2",
        matrixSet: "EPSG:3857",
        tileGrid: new ol.tilegrid.WMTS({
            origin: [-20037508, 20037508],
            resolutions: resolutions,
            matrixIds: matrixIds,
        }),
        format: "image/png",
        style: "_null"
    }),
    visible: false,
    keepAlive: true,
    title: 'nlscPhoto2'
});
// 臺灣通用電子地圖混合影像
let nlscPhotoMix = new ol.layer.Tile({
    source: new ol.source.WMTS({
        attributions: attributions,
        url: 'https://wmts.nlsc.gov.tw/wmts',
        name: "PHOTO_MIX",
        layer: "PHOTO_MIX",
        matrixSet: "EPSG:3857",
        tileGrid: new ol.tilegrid.WMTS({
            origin: [-20037508, 20037508],
            resolutions: resolutions,
            matrixIds: matrixIds,
        }),
        format: "image/png",
        style: "_null"
    }),
    visible: false,
    keepAlive: true,
    title: 'nlscPhotoMix'
});
// 臺灣通用電子地圖灰階版
let nlscEmap01 = new ol.layer.Tile({
    source: new ol.source.WMTS({
        attributions: attributions,
        url: 'https://wmts.nlsc.gov.tw/wmts',
        name: "EMAP01",
        layer: "EMAP01",
        matrixSet: "EPSG:3857",
        tileGrid: new ol.tilegrid.WMTS({
            origin: [-20037508, 20037508],
            resolutions: resolutions,
            matrixIds: matrixIds,
        }),
        format: "image/png",
        style: "_null"
    }),
    visible: false,
    keepAlive: true,
    title: 'nlscEmap01'
});
// 國土利用現況調查成果圖
let nlscLuiMap = new ol.layer.Tile({
    source: new ol.source.WMTS({
        attributions: attributions,
        url: 'https://wmts.nlsc.gov.tw/wmts',
        name: "LUIMAP",
        layer: "LUIMAP",
        matrixSet: "EPSG:3857",
        tileGrid: new ol.tilegrid.WMTS({
            origin: [-20037508, 20037508],
            resolutions: resolutions,
            matrixIds: matrixIds,
        }),
        format: "image/png",
        style: "_null"
    }),
    visible: false,
    keepAlive: true,
    title: 'nlscLuiMap'
});
// 非都市土地使用分區圖
let nlscNUrban1 = new ol.layer.Tile({
    source: new ol.source.WMTS({
        attributions: attributions,
        url: 'https://wmts.nlsc.gov.tw/wmts',
        name: "nURBAN1",
        layer: "nURBAN1",
        matrixSet: "EPSG:3857",
        tileGrid: new ol.tilegrid.WMTS({
            origin: [-20037508, 20037508],
            resolutions: resolutions,
            matrixIds: matrixIds,
        }),
        format: "image/png",
        style: "_null"
    }),
    visible: false,
    keepAlive: true,
    title: 'nlscNUrban1'
});
// 非都市土地使用地類別圖
let nlscNUrban2 = new ol.layer.Tile({
    source: new ol.source.WMTS({
        attributions: attributions,
        url: 'https://wmts.nlsc.gov.tw/wmts',
        name: "nURBAN2",
        layer: "nURBAN2",
        matrixSet: "EPSG:3857",
        tileGrid: new ol.tilegrid.WMTS({
            origin: [-20037508, 20037508],
            resolutions: resolutions,
            matrixIds: matrixIds,
        }),
        format: "image/png",
        style: "_null"
    }),
    visible: false,
    keepAlive: true,
    title: 'nlscNUrban2'
});
// 渲染圖
let nlscOIShaderMap = new ol.layer.Tile({
    source: new ol.source.WMTS({
        attributions: attributions,
        url: 'https://wmts.nlsc.gov.tw/wmts',
        name: "OI_SHADERMAP",
        layer: "OI_SHADERMAP",
        matrixSet: "EPSG:3857",
        tileGrid: new ol.tilegrid.WMTS({
            origin: [-20037508, 20037508],
            resolutions: resolutions,
            matrixIds: matrixIds,
        }),
        format: "image/png",
        style: "_null"
    }),
    visible: false,
    keepAlive: true,
    title: 'nlscOIShaderMap'
});




export default {
    osm,
    nlscEmap5,
    nlscPhoto2,
    nlscPhotoMix,
    nlscEmap01,
    nlscLuiMap,
    nlscNUrban1,
    nlscNUrban2,
    nlscOIShaderMap,

}