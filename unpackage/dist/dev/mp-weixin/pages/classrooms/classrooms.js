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
  __name: "classrooms",
  setup(__props) {
    const classrooms = common_vendor.ref([]);
    function applyClassroom(roomId) {
      common_vendor.index.navigateTo({
        url: `/pages/apply/apply?roomId=${roomId}`
      });
    }
    common_vendor.onLoad((e) => {
      apis_list.classroomsByBuilding(e == null ? void 0 : e.buildingId).then((result) => {
        classrooms.value = result.data.results;
      });
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(classrooms.value, (r, k0, i0) => {
          return {
            a: common_vendor.o(($event) => applyClassroom(r.id), r.id),
            b: r.id,
            c: "9e399530-1-" + i0 + ",9e399530-0",
            d: common_vendor.p({
              title: r.name,
              clickable: true
            })
          };
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/shenshichao/Documents/practice/uniapp/smart_class/pages/classrooms/classrooms.vue"]]);
wx.createPage(MiniProgramPage);
