"use strict";
const common_vendor = require("../../common/vendor.js");
const apis_list = require("../../apis/list.js");
require("../../apis/http.js");
require("../../apis/login.js");
if (!Array) {
  const _easycom_uni_segmented_control2 = common_vendor.resolveComponent("uni-segmented-control");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  (_easycom_uni_segmented_control2 + _easycom_uni_list_item2 + _easycom_uni_list2)();
}
const _easycom_uni_segmented_control = () => "../../uni_modules/uni-segmented-control/components/uni-segmented-control/uni-segmented-control.js";
const _easycom_uni_list_item = () => "../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../uni_modules/uni-list/components/uni-list/uni-list.js";
if (!Math) {
  (_easycom_uni_segmented_control + _easycom_uni_list_item + _easycom_uni_list)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "my_application",
  setup(__props) {
    const current = common_vendor.ref(0);
    const statusMap = {
      "等待审批": "待审核",
      "审批通过": "已通过",
      "使用完成": "已过期"
    };
    function showApplication(ID) {
      common_vendor.index.navigateTo({
        url: `/pages/apply/progress?id=${ID}`
      });
    }
    const applications = common_vendor.ref([]);
    common_vendor.onLoad(() => {
      apis_list.myApplications().then((result) => {
        const data = result.data;
        applications.value = data;
      });
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(({
          currentIndex
        }) => current.value = currentIndex),
        b: common_vendor.p({
          values: Object.keys(statusMap),
          current: current.value
        }),
        c: common_vendor.f(applications.value.filter((v) => v.status == Object.values(statusMap)[current.value]), (a, k0, i0) => {
          return {
            a: common_vendor.o(($event) => showApplication(a.id), a.id),
            b: a.id,
            c: "2753d53a-2-" + i0 + ",2753d53a-1",
            d: common_vendor.p({
              title: `${a.date} ${a.start_time}:00-${a.start_time + a.length}:59`,
              ["right-text"]: a.classroom,
              clickable: true
            })
          };
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/shenshichao/Documents/practice/uniapp/smart_class/pages/user/my_application.vue"]]);
wx.createPage(MiniProgramPage);
