export default function () {
    let toolbarList = [
        // {
        //     path:'layer-switcher',
        //     name:'layerSwitcher',
        //     component:()=>import('../views/MapLayerSwitcher.vue.js')
        // },
        {
            path:'cadastral',
            name:'cadastral',
            label:'地籍定位',
            icon:'icon-location',
            component:()=>import('../views/MapCadastral.vue.js')
        },
        {
            path:'coordinate',
            name:'coordinate',
            label:'坐標定位',
            icon:'icon-direction',
            component:()=>import('../views/MapCoordinate.vue.js')
        },
        
    ]
    return toolbarList
}