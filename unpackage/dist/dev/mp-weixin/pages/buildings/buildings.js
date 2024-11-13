"use strict";
const common_vendor = require("../../common/vendor.js");
const apis_list = require("../../apis/list.js");
require("../../apis/http.js");
require("../../apis/login.js");
if (!Array) {
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  (_easycom_uni_list_item2 + _easycom_uni_list2)();
}
const _easycom_uni_list_item = () => "../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../uni_modules/uni-list/components/uni-list/uni-list.js";
if (!Math) {
  (_easycom_uni_list_item + _easycom_uni_list)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "buildings",
  setup(__props) {
    function showClassrooms(buildingId) {
      common_vendor.index.navigateTo({
        url: `/pages/classrooms/classrooms?buildingId=${buildingId}`
      });
    }
    const buildings = common_vendor.ref([]);
    common_vendor.onLoad(() => {
      apis_list.buildings(9999).then((result) => {
        const data = result.data;
        buildings.value = data.results;
      });
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(buildings.value, (b, k0, i0) => {
          return {
            a: common_vendor.o(($event) => showClassrooms(b.id), b.id),
            b: b.id,
            c: "cede7ab0-1-" + i0 + ",cede7ab0-0",
            d: common_vendor.p({
              title: b.name,
              clickable: true
            })
          };
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/shenshichao/Documents/practice/uniapp/smart_class/pages/buildings/buildings.vue"]]);
wx.createPage(MiniProgramPage);
