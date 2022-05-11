const { ref, reactive, onMounted, computed, provide, inject } = Vue;
const { useRouter, useRoute } = VueRouter;
const https = axios.create({
  baseURL: '/rural_regeneration/FuncModule/NLSCAPI/api/',
  headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' },
});
const table_name = reactive({
  city: "縣市名稱",
  OTOWN: "鄉鎮市區",
  // town:"鄉鎮市區代碼",
  OSEC: "地段",
  // scNo:"段代碼",
  ldcode: "地所名稱",
  // scNoExt:"段延伸碼", 
  //svway:"測量方法",
  //svType:"測量類別",
  //mYear:"成圖年度",
  //mMonth:"成圖月份",
  //coor:"坐標系統",
  //wornst:"破損情形",
  //errst:"誤謬情形",
  //scale:"比例尺",
  //dDate:"數化日期",
  //rYear:"預計重測年度",
  //slprt:"山坡地比例", 
  //urbnrt:"都市計畫區比例",
  //rplrt:"重劃保留地比例",
  AA10: "面積(平方公尺)",
  AA11: "使用分區",
  AA12: "使用地類別",
  // AA16:"公告現值",
  // AA17:"公告地",
})

export default {
  name: 'cadastral',
  template: `
  <div id="cadastral" v-cloak>
  <div class="flex justify-center">
      <div class="block p-6 rounded-lg shadow-lg bg-white w-96">
          <h5
              class="text-gray-900 text-xl leading-tight font-medium font-semibold mb-2 pt-2 pb-2 border-b-4 border-amber-500">
              地籍定位</h5>
          <div>
              <ul>
                  <li class="py-2">
                      <label for="select1">縣市</label>
                      <select id="select1" v-model="apis.COUNTY" @change="clearselect(0);getapi()" class="form-select appearance-none
              block
              w-full
              px-3 py-1.5 m-0
              text-base font-normal text-gray-700
              bg-white bg-clip-padding bg-no-repeat
              border border-solid border-gray-300
              rounded
              transition
              ease-in-out               
              focus:text-gray-700 focus:bg-white focus:border-gray-300 focus:outline-none focus:shadow-none">
                          <option disabled selected>縣市</option>
                          <option v-for="option in apis.RULES_COUNTY" :value="option.countycode"
                              :key="option.countycode">
                              {{ option.countyname }} </option>
                      </select>
                  </li>
                  <li class="py-2">
                      鄉鎮市區
                      <select v-model="apis.TOWN" @change="clearselect(1);gettextTOWN($event);getapi()" class="form-select appearance-none
              block
              w-full
              px-3 py-1.5 m-0
              text-base font-normal text-gray-700
              bg-white bg-clip-padding bg-no-repeat
              border border-solid border-gray-300
              rounded
              transition
              ease-in-out 
              focus:text-gray-700 focus:bg-white focus:border-gray-300 focus:outline-none focus:shadow-none">
                          <option disabled selected>鄉鎮市區</option>
                          <option v-for="option in apis.RULES_TOWN" :value="option.towncode" :key="option.towncode">
                              {{ option.townname }} </option>
                      </select>
                  </li>
                  <li class="py-2">
                      地段
                      <select v-model="apis.SEC" @change="clearselect(2);gettextSEC($event)" class="form-select appearance-none
              block
              w-full
              px-3 py-1.5 m-0
              text-base font-normal text-gray-700
              bg-white bg-clip-padding bg-no-repeat
              border border-solid border-gray-300
              rounded
              transition
              ease-in-out 
              focus:text-gray-700 focus:bg-white focus:border-gray-300 focus:outline-none focus:shadow-none">
                          <option disabled selected>地段</option>
                          <option v-for="option in apis.RULES_SEC" :value="option.sectcode" :key="option.sectcode">
                              {{ option.sectstr }} </option>
                      </select>
                  </li>
                  <li class="py-2">
                      地號
                      <input v-model.trim="apis.NO" v-on:keyup.enter="search()" placeholder="請輸入地號" type="text" class="form-control
              block
              w-full
              px-3 py-1.5 m-0
              text-base font-normal text-gray-700
              bg-white bg-clip-padding bg-no-repeat
              border border-solid border-gray-300
              rounded
              transition
              ease-in-out 
              focus:text-gray-700 focus:bg-white focus:border-gray-300 focus:outline-none focus:shadow-none">
                      </input>
                  </li>

                  <li class="py-4">
                      <button v-on:click.prevent="search()" type="button"
                          class="inline-block px-6 py-2.5 bg-yellow-500 text-white font-medium text-md leading-tight uppercase rounded shadow-md hover:bg-yellow-600 hover:shadow-lg focus:bg-yellow-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-yellow-700 active:shadow-lg transition duration-150 ease-in-out">查
                          詢</button>
                  </li>
              </ul>

              <div class="mt-3" v-cloak v-if="info" v-show="info.length > 0">
                  <div class="">點選下方列表以定位</div>
                  <table class="">
                      <thead>
                          <tr>
                              <th>查詢結果</th>
                              <th>屬性查詢</th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr class="pointer" v-for="(item, key) in info" :item="item">
                              <td class="">
                                  <div class="" @click.prevent="location(item ,key)" title="點擊以定位">
                                      {{ item.No8 }}
                                  </div>
                              </td>
                              <td @click.prevent="identify(item)" title="點擊進階查詢
                              "><i class="fas fa-map-marker-alt pointer text-success"></i></td>
                          </tr>
                      </tbody>
                  </table>
              </div>

          </div>
      </div>
  </div>
</div>
    `,

  setup() {
    //data
    const apis = reactive({
      COUNTY: '',
      TOWN: '',
      OTOWN: '',
      SEC: '',
      OSEC: '',
      NO: '',
      NO8: [],
      RULES_COUNTY: [],
      RULES_TOWN: [],
      RULES_SEC: []
    })

    let info = ref(null)

    //method

    // const back = () => {
    //   location.href = 'location.html';
    // }

    const getapi = () => {
      let parm = 'ListCounty/' + apis.COUNTY + ((apis.TOWN !== '') ? '/' + vm.apis.TOWN : '');
      https.get(parm)
        .then(function (res) {
          if (res.data.data.townItem) {
            apis.RULES_TOWN = (res.data.data.townItem);
          } else if (res.data.data.sectItem) {
            apis.RULES_SEC = (res.data.data.sectItem);
          }
          loader.hide();
        })
        .catch(function (err) {
          console.log(err);
          loader.hide();
        });
    }

    const clearselect = (value) => {
      if (value == 0) {
        apis.TOWN = '';
        apis.SEC = '';
        clear()
      } else if (value == 1) {
        apis.SEC = '';
        clear()
      } else if (value == 2) {
        clear()
      }
    }

    const gettextTOWN = (event) => {
      apis.OTOWN = event.target.options[event.target.options.selectedIndex].text;
    }

    const gettextSEC = (event) => {
      apis.OSEC = event.target.options[event.target.options.selectedIndex].text;
    }

    const parseNo8 = (v) => {
      let values = [],
        items = v.replace(/、/g, ",").split(","),
        zero = '0',
        len = items.length,
        i, item;
      for (i = 0; i < len; i++) {
        item = items[i];
        if (item.indexOf('-') < 0) {
          if (item.length == 8)
            values.push(item);
          else if (item.length <= 4)
            values.push(zero.repeat(4 - item.length) + item + '0000');
        } else {
          var a = item.substr(0, item.indexOf('-')),
            b = item.substr(item.indexOf('-') + 1);
          values.push(zero.repeat(4 - a.length) + a + zero.repeat(4 - b.length) + b);
        }
      }
      return values;
    }

    const search = () => {
      if (apis.NO !== '') {
        apis.NO8 = parseNo8(apis.NO);
        let tmpArr = [], l = apis.NO8.length - 1;
        apis.NO8.map(function (e, i) {
          let parm = 'CadasMapPosition/' + apis.COUNTY + '/' + apis.SEC + '/' + e
          https.get(parm)
            .then(function (res) {
              if (res.data) {
                res.data.data.NO = apis.NO.replace(/、/g, ",").split(",")[i];
                res.data.data.No8 = e;
                tmpArr.push(res.data.data);
              }
              if (i == l) {
                info = tmpArr;
              }
              if (i == 0) {
                location(info[0]);
              }
              loader.hide();
            }).catch(function (err) {
              console.log(err);
              loader.hide();
            });
        });
      } else {
        alert('請填地號');
        loader.hide();
      }
    }

    const location = (data) => {
      /**面 */
      if (parent.cad_layers.length) {
        clearlayer();
      }
      var obj = data.mapimage;
      var ext = [obj.lx, obj.ly, obj.rx, obj.ry],
        layer = new _root.ol.layer.Image({
          source: new _root.ol.source.ImageStatic({ imageExtent: ext, imageSize: [256, 256], url: 'data:image/png;base64,' + obj.image, projection: 'EPSG:4326' })
        });
      layer.setZIndex(0);
      if (!_map)
        _map = _gis._instance;
      _map.addLayer(layer);
      parent.cad_layers.push(layer);
      if (ext) {
        _gis.flyTo(ext);
      }
      /**點 */
      var item = {};
      item.location = [(obj.lx + obj.rx) / 2, (obj.ly + obj.ry) / 2];
      item.content = apis.OSEC + data.NO;
      getcd(data, item);
    }

    const identify = (item) => {
      let obj = item.mapimage;
      item.location = [(obj.lx + obj.rx) / 2, (obj.ly + obj.ry) / 2];
      let pos = {};
      pos.coordinate = [parseFloat(item.location[0]), parseFloat(item.location[1])];
      parent.openIdentify(pos);
    }
    /**查屬性 */
    const getcd = (obj, item) => {
      // var loader = Vue.$loading.show({ color: 'green' }); 
      var o1 = {};
      var o2 = {};
      var o3 = {};
      var parm1 = 'GetLandSecInfoNlsc/' + apis.COUNTY + '/' + apis.SEC
      var parm2 = 'CadasAttrQuery/' + apis.COUNTY + '/' + apis.SEC + '/' + obj.NO
      axios.all([
        https.get(parm1),
        https.get(parm2)
      ])
        .then(axios.spread(function (res1, res2) {
          if (res1.data.data && res2.data.data) {
            o3 = {
              OTOWN: apis.OTOWN,
              OSEC: apis.OSEC,
            }
            var res1_Obj = Object.assign({}, res1.data.data, o3);

            Object.keys(res1_Obj).map(function (e, i) {
              if (table_name[e] !== undefined)
                o1[table_name[e]] = res1_Obj[e];
            });
            Object.keys(res2.data.data).map(function (e, i) {
              if (table_name[e.toUpperCase()] !== undefined) {
                if (typeof (res2.data.data[e]) == 'string')
                  o2[table_name[e.toUpperCase()]] = res2.data.data[e] != '' ? res2.data.data[e] + '(' + c[res2.data.data[e]] + ')' : res2.data.data[e];
                else
                  o2[table_name[e.toUpperCase()]] = res2.data.data[e];
              }
            });
            var nObj = Object.assign(o1, o2);
            //return nObj;

            item.jsondata = nObj;
            ols.addlayers(item, obj.NO);
            // loader.hide();
          }
        }))
        .catch(function (err) {
          console.log(err);
          // loader.hide();
        });
    }

    const clear = () => {
      apis.OSEC = '';
      apis.NO = '';
      apis.NO8 = [];
      info = null;

      ols.layer = parent.gis.vectorLayers.layer(ols.ln);
      if (ols.layer !== undefined) {
        ols.remove_layer(ols.layer);
      }

      var l;
      while ((l = parent.cad_layers.pop()))
        _map.removeLayer(l);
    }

    const clearlayer = () => {
      var l;
      while ((l = parent.cad_layers.pop())) {
        _map.removeLayer(l);
      }
      ols.layer = parent.gis.vectorLayers.layer(ols.ln);
      if (ols.layer !== undefined) {
        ols.remove_layer(ols.layer);
      }
    }

    //mounted
    onMounted(() => {
      https.get('ListCounty')
        .then(function (res) {
          apis.RULES_COUNTY = (res.data.data.countyItem);
          loader.hide();
        })
        .catch(function (err) { })
    })

    var ols = {
      img:'image/map-marker-y.png', 
      ln:'temp_cadatral',
      layer:undefined,
      addlayers:function(item ,key){ 
          var gcoordinates = item.location;
          var imgurl = ols.img;
          ols.layer = parent.gis.vectorLayers.layer(ols.ln);
          if(ols.layer!==undefined){
            ols.remove_layer(ols.layer);
          }else{
          ols.layer = new parent.Layer({
              name: ols.ln,
              gis: this,
              type: 'vec',
              zIndex:2,
              style: { 
                color: '#23CDFC',
                bgcolor: '#FFFFFF', 
                alpha: 0,
                type: parent.DrawType.General, 
                lnWidth: 3 ,
                icon:imgurl, 
                iconScale:.5,
                fontOutColor:'#0c3c5b',
                fontColor:'#fff',
                weight:'bold',
                fontSize:'16',
              }
          });
          parent.gis.vectorLayers.add(ols.layer);
          ols.layer.show = true; 
          }
          if(parent.oldkey!=''){
            ols.remove_entity(parent.oldkey); 
          }
          
          var jsondata =  item.jsondata;
          var entity = new parent.Entity({ id: key, label: item.content ,type: 'Feature', geometry: { type:'Point',coordinates: gcoordinates }, properties:jsondata}); 
          ols.layer.add(entity);
          ols.layer.show = true; 
          parent.oldkey = key;
      },
      remove_entity:function(key){
        var o_entity =  parent.gis.vectorLayers.layer(ols.ln).getById(key);
        if(o_entity!==undefined){
          ols.layer.removeById(key);
        }
      },
      remove_layer:function(layer){
        parent.gis.vectorLayers.remove(layer);
      },
      flyTo:function(x,y){
        parent.gis.flyTo([y, x, 20]);
        parent.case_app.CheckPanelClose();
      }
    }
    
    function receiveMessage(e) {
      // 來源網址（e.origin）不是指定的網域時
      if(e.origin !== location.protocol+'//'+location.hostname) { 
        alert('資料來源錯誤');
        return false;
      }
      // 來源網址是指定的網域時
      else {
        // 拿傳來的參數（e.data）
        console.log(e.data); 
    
       
        app.apis.COUNTY = e.data.city; 
        app.getapi(); 
        app.apis.TOWN =e.data.townCode;
        app.getapi(); 
        app.apis.OTOWN =e.data.townName;
        app.apis.OSEC =e.data.sectName;
        app.apis.SEC = e.data.sec; 
        app.apis.NO = e.data.no;
        app.apis.NO8 = e.data.no;
        app.getapi(); 
        app.search();
        // e.data.mdata.NO = e.data.qdata.no;
        // e.data.mdata.No8 = e.data.qdata.no; 
        // app.location(e.data.mdata)
    
      }
    }
    // 監聽 message 事件
    window.addEventListener('message', receiveMessage, false);


    return {
      apis,
      info,
      getapi,
      clearselect,
      gettextTOWN,
      gettextSEC,
      parseNo8,
      search,
      location,
      identify,
      getcd,
      clear,
      clearlayer,
    }
  }
};