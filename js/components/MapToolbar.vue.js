const { ref, reactive, onMounted, computed, inject } = Vue;
const { useRouter, useRoute } = VueRouter;
import getMapToolbarList from '../api/map-toolbar-list.js'
export default {
    name: 'MapToolBar',
    template: `
    <article id="mapToolbar" :class="{'show' : isShowNav}">
    <nav class="toolbar-nav" class="shadow">
        <ul>
            <template 
            v-for="(url, index) in toolbarList" 
            :key="index">
                <li>
                    <router-link 
                    :to="'/map/' + url.path" 
                    :alt="url.name">
                    <i :class="url.icon" class="not-italic"></i>                   
                    </router-link>
                </li>
            </template>

        </ul>
    </nav>
    <button type="button" 
    class="btn-nav-toggle"
    @click="isShowNav = !isShowNav">
    <i :class="isShowNav ? 'icon-arrow-left' : 'icon-arrow-right'"></i>
    </button>
    <div class="toolbar-content">
    <router-view></router-view>
    </div>
</article>
    `,
    setup() {
        let isShowNav = ref(true);
        let toolbarList = reactive(getMapToolbarList());

        onMounted(() => {
            getMapToolbarList().forEach( (router)=>{
                useRouter().addRoute('Map', router)
            })
        })
        return {
            isShowNav,
            toolbarList
        }
    }
};