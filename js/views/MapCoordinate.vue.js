const { ref, reactive, onMounted, computed, provide, inject } = Vue;
const { useRouter, useRoute } = VueRouter;


export default {
  name: 'coordinate',
  template: `
  <div id="coordinate" class="block p-6 rounded-lg shadow-lg bg-white w-96">
    <h5 class="text-gray-900 text-xl leading-tight font-medium font-semibold mb-2 pt-2 pb-2 border-b-4 border-amber-500">
        坐標定位</h5>
    <ul class="
      nav nav-tabs nav-justified
      flex flex-col
      md:flex-row
      flex-wrap
      list-none
      border-b-0
      pl-0
      mb-4
      " id="tabs-coordinate" role="tablist">
  
        <li class="nav-item flex-grow text-center" role="presentation">
            <a href="#tabs-twd97" class="
              nav-link
              w-full
              block
              font-medium
              text-base
              leading-tight
              uppercase
              border-x-0 border-t-0 border-b-2 border-transparent
              px-6
              py-3
              my-2
              hover:border-transparent hover:bg-gray-100
              focus:border-transparent
              active
            " id="tabs-twd97-coordinate" data-bs-toggle="pill" data-bs-target="#tabs-twd97" role="tab"
                        aria-controls="tabs-twd97" aria-selected="true">TWD97</a>
        </li>
  
        <li class="nav-item flex-grow text-center" role="presentation">
            <a href="#tabs-wgs84" class="
              nav-link
              w-full
              block
              font-medium
              text-base
              leading-tight
              uppercase
              border-x-0 border-t-0 border-b-2 border-transparent
              px-6
              py-3
              my-2
              hover:border-transparent hover:bg-gray-100
              focus:border-transparent
            " id="tabs-wgs84-coordinate" data-bs-toggle="pill" data-bs-target="#tabs-wgs84" role="tab"
                        aria-controls="tabs-wgs84" aria-selected="false">WGS84</a>
        </li>
  
        <li class="nav-item flex-grow text-center" role="presentation">
            <a href="#tabs-twd67" class="
              nav-link
              w-full
              block
              font-medium
              text-base
              leading-tight
              uppercase
              border-x-0 border-t-0 border-b-2 border-transparent
              px-6
              py-3
              my-2
              hover:border-transparent hover:bg-gray-100
              focus:border-transparent
            " id="tabs-twd67-coordinate" data-bs-toggle="pill" data-bs-target="#tabs-twd67" role="tab"
                        aria-controls="tabs-twd67" aria-selected="false">TWD67</a>
        </li>
    </ul>
    <div class="tab-content" id="tabs-tabContentCoordinate">
        <div class="tab-pane fade show active" id="tabs-twd97" role="tabpanel"
            aria-labelledby="tabs-twd97-coordinate">
            請輸入 <span class="text-amber-600">TWD97</span> 坐標
            <textarea class="
                form-control
                block
                w-full
                px-3
                py-1.5
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
            " id="textarea-twd97" rows="3" :placeholder="placeholder.twd97"></textarea>
            <div class="text-sm text-gray-400">
            注意事項 <br />
            *以 逗號 分隔經緯度, 以 分號 分隔多筆坐標 <br />
            *下方可切換不同坐標換算資訊 <br />
            <button type="button" class="inline-block my-2 px-6 py-2.5 bg-yellow-500 text-white font-medium text-base leading-tight uppercase rounded shadow-md hover:bg-yellow-600 hover:shadow-lg focus:bg-yellow-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-yellow-700 active:shadow-lg transition duration-150 ease-in-out">
                查 詢
            </button>
            </div>
        </div>
        <div class="tab-pane fade" id="tabs-wgs84" role="tabpanel" aria-labelledby="tabs-wgs84-coordinate">
            請輸入 <span class="text-amber-600">WGS84</span> 坐標
            <textarea class="
                form-control
                block
                w-full
                px-3
                py-1.5
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
            " id="textarea-wgs84" rows="3" :placeholder="placeholder.wgs84"></textarea>
            <div class="text-sm text-gray-400">
            注意事項 <br />
            *以 逗號 分隔經緯度, 以 分號 分隔多筆坐標 <br />
            *下方可切換不同坐標換算資訊 <br />
            <button type="button" class="inline-block my-2 px-6 py-2.5 bg-yellow-500 text-white font-medium text-base leading-tight uppercase rounded shadow-md hover:bg-yellow-600 hover:shadow-lg focus:bg-yellow-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-yellow-700 active:shadow-lg transition duration-150 ease-in-out">
                查 詢
            </button>
            </div>
        </div>
        <div class="tab-pane fade" id="tabs-twd67" role="tabpanel" aria-labelledby="tabs-wgs84-coordinate">
          請輸入 <span class="text-amber-600">TWD67</span> 坐標
          <textarea class="
              form-control
              block
              w-full
              px-3
              py-1.5
              text-base
              font-normal
              text-gray-700
              bg-white bg-clip-padding
              border border-solid border-gray-300
              rounded
              transition
              ease-in-out
              m-0
              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
          " id="textarea-twd67" rows="3" :placeholder="placeholder.twd67"></textarea>
          <div class="text-sm text-gray-400">
          注意事項 <br />
          *以 逗號 分隔經緯度, 以 分號 分隔多筆坐標 <br />
          *下方可切換不同坐標換算資訊 <br />
          <button type="button" class="inline-block my-2 px-6 py-2.5 bg-yellow-500 text-white font-medium text-base leading-tight uppercase rounded shadow-md hover:bg-yellow-600 hover:shadow-lg focus:bg-yellow-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-yellow-700 active:shadow-lg transition duration-150 ease-in-out">
            查 詢
        </button>
          </div>
        </div>
    </div>
  </div>
  `,

  setup() {

    const placeholder = reactive({
      twd97: "表示方式如：250000.000,2677172.843",
      wgs84: "十進位表示方式如：121.0,23.0;121,24.2   度分秒表示方式如：121°00'35\",23°33'35\"",
      twd67: "表示方式如：218134.945,2674745.799",
    })
    


    return {
      placeholder,
      
    }
  }
};