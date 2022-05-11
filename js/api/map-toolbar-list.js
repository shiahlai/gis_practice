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
        
    ]
    return toolbarList
}