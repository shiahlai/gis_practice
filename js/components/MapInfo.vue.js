const { ref, reactive, onMounted, computed, provide, inject } = Vue;
const { useRouter, useRoute } = VueRouter;

export default {
    name: 'MapInfo',
    template: `
    <section id="mapInfo">
    
        <button data-bs-toggle="popover" data-bs-placement="left" data-bs-content="圖資應用說明：本系統提供之圖資，僅可作為查詢地理位置之參考，實際圖形及位置仍應以各公告圖籍與公告地籍資料為準"
        type="button"
        class="bg-slate-800/60 p-1 rounded text-white text-md">
        <i class="icon-info"></i>
        </button>


    
    </section> 
    `,
    setup() {


        return {

        }
    }
};