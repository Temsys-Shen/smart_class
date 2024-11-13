"use strict";
const common_vendor = require("../../common/vendor.js");
const apis_list = require("../../apis/list.js");
require("../../apis/http.js");
require("../../apis/login.js");
if (!Array) {
  const _easycom_uni_grid_item2 = common_vendor.resolveComponent("uni-grid-item");
  const _easycom_uni_grid2 = common_vendor.resolveComponent("uni-grid");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  (_easycom_uni_grid_item2 + _easycom_uni_grid2 + _easycom_uni_section2 + _easycom_uni_list_item2 + _easycom_uni_list2)();
}
const _easycom_uni_grid_item = () => "../../uni_modules/uni-grid/components/uni-grid-item/uni-grid-item.js";
const _easycom_uni_grid = () => "../../uni_modules/uni-grid/components/uni-grid/uni-grid.js";
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
const _easycom_uni_list_item = () => "../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../uni_modules/uni-list/components/uni-list/uni-list.js";
if (!Math) {
  (_easycom_uni_grid_item + _easycom_uni_grid + _easycom_uni_section + _easycom_uni_list_item + _easycom_uni_list + BgImg)();
}
const BgImg = () => "../../components/bgimg.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const someBuildings = common_vendor.ref([]);
    const history = common_vendor.ref([]);
    function moreBuildings() {
      common_vendor.index.navigateTo({
        url: "/pages/buildings/buildings"
      });
    }
    function applyClassroom(roomId) {
      common_vendor.index.navigateTo({
        url: `/pages/apply/apply?roomId=${roomId}`
      });
    }
    function load() {
      apis_list.buildings(4).then((result) => {
        const data = result.data;
        someBuildings.value = data.results;
      });
      apis_list.myApplicationsSummary().then((result) => {
        const data = result.data;
        history.value = data;
      });
    }
    load();
    common_vendor.index.$on("update", load);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(someBuildings.value, (building, k0, i0) => {
          return {
            a: common_vendor.t(building.name),
            b: `/pages/classrooms/classrooms?buildingId=${building.id}`,
            c: building.id,
            d: "10b810e4-2-" + i0 + ",10b810e4-1"
          };
        }),
        b: common_vendor.p({
          column: 4,
          highlight: true,
          ["show-border"]: false
        }),
        c: common_vendor.o(moreBuildings),
        d: common_vendor.p({
          title: "教学楼",
          type: "line",
          padding: true
        }),
        e: common_vendor.f(history.value, (h, k0, i0) => {
          return {
            a: common_vendor.o(($event) => applyClassroom(h.roomId), h.name),
            b: h.name,
            c: "10b810e4-5-" + i0 + ",10b810e4-4",
            d: common_vendor.p({
              title: h.name,
              ["right-text"]: `预约${h.times}次`,
              clickable: true
            })
          };
        }),
        f: common_vendor.p({
          title: "历史预约",
          type: "line",
          padding: true
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/shenshichao/Documents/practice/uniapp/smart_class/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
