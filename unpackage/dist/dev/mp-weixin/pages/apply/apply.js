"use strict";
const common_vendor = require("../../common/vendor.js");
const apis_list = require("../../apis/list.js");
require("../../apis/http.js");
require("../../apis/login.js");
if (!Array) {
  const _easycom_uni_segmented_control2 = common_vendor.resolveComponent("uni-segmented-control");
  const _easycom_uni_col2 = common_vendor.resolveComponent("uni-col");
  const _easycom_uni_row2 = common_vendor.resolveComponent("uni-row");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_segmented_control2 + _easycom_uni_col2 + _easycom_uni_row2 + _easycom_uni_section2)();
}
const _easycom_uni_segmented_control = () => "../../uni_modules/uni-segmented-control/components/uni-segmented-control/uni-segmented-control.js";
const _easycom_uni_col = () => "../../uni_modules/uni-row/components/uni-col/uni-col.js";
const _easycom_uni_row = () => "../../uni_modules/uni-row/components/uni-row/uni-row.js";
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_segmented_control + _easycom_uni_col + _easycom_uni_row + _easycom_uni_section)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "apply",
  setup(__props) {
    const occupiedList = common_vendor.ref(["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]);
    const days = Array.from({ length: 7 }, (_, i) => {
      const date = /* @__PURE__ */ new Date();
      date.setDate(date.getDate() + i);
      return { day: date.getDate(), date };
    });
    const selectedDay = common_vendor.ref(0);
    const time = common_vendor.ref([(/* @__PURE__ */ new Date()).getHours(), 0]);
    const disabled = common_vendor.ref(null);
    const roomID = common_vendor.ref();
    function queryOccupancy() {
      apis_list.classroomOccupied(roomID.value, days.map((obj) => obj.date)[selectedDay.value]).then((result) => {
        occupiedList.value = result.data;
      }).finally(timeChanged);
    }
    function dateChanged(e) {
      selectedDay.value = e.currentIndex;
      queryOccupancy();
    }
    function timeChanged(e) {
      if (e)
        time.value = e.detail.value;
      try {
        occupiedList.value.forEach((s, i) => {
          if (s != "" && i >= time.value[0] && i <= time.value[0] + time.value[1]) {
            throw new Error("当前选择时段已被预约");
          } else if (days.map((v) => v.date)[selectedDay.value].getDate() == (/* @__PURE__ */ new Date()).getDate() && time.value[0] < (/* @__PURE__ */ new Date()).getHours()) {
            throw new Error("申请时段已过");
          } else {
            disabled.value = null;
          }
        });
      } catch (e2) {
        disabled.value = e2.message;
      }
    }
    common_vendor.onLoad((e) => {
      roomID.value = e == null ? void 0 : e.roomId;
      queryOccupancy();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(dateChanged),
        b: common_vendor.p({
          values: common_vendor.unref(days).map((dayObj) => dayObj.day),
          ["style-type"]: "text",
          ["active-color"]: "#4cd964"
        }),
        c: common_vendor.f(12, (j, k0, i0) => {
          return {
            a: common_vendor.t(occupiedList.value[j - 1]),
            b: common_vendor.n(`${j == 1 ? "col_start" : j == 12 ? "col_end" : "col_normal"} ${occupiedList.value[j - 1] ? "deep" : "light"} center_text`),
            c: j,
            d: "cc5b2874-3-" + i0 + ",cc5b2874-2"
          };
        }),
        d: common_vendor.p({
          span: 2
        }),
        e: common_vendor.f(12, (i, k0, i0) => {
          return {
            a: common_vendor.t(i - 1),
            b: i + 12,
            c: "cc5b2874-5-" + i0 + ",cc5b2874-4"
          };
        }),
        f: common_vendor.p({
          span: 2
        }),
        g: common_vendor.f(12, (j, k0, i0) => {
          return {
            a: common_vendor.t(occupiedList.value[j + 11]),
            b: common_vendor.n(`${j == 1 ? "col_start" : j == 12 ? "col_end" : "col_normal"} ${occupiedList.value[j + 11] ? "deep" : "light"} center_text`),
            c: j + 24,
            d: "cc5b2874-7-" + i0 + ",cc5b2874-6"
          };
        }),
        h: common_vendor.p({
          span: 2
        }),
        i: common_vendor.p({
          span: 24
        }),
        j: common_vendor.f(12, (i, k0, i0) => {
          return {
            a: common_vendor.t(i + 11),
            b: i + 36,
            c: "cc5b2874-11-" + i0 + ",cc5b2874-10"
          };
        }),
        k: common_vendor.p({
          span: 2
        }),
        l: common_vendor.p({
          title: "预约状态",
          type: "line",
          padding: true
        }),
        m: common_vendor.f(24, (sh, k0, i0) => {
          return {
            a: common_vendor.t(`${sh - 1}:00`),
            b: sh + 48
          };
        }),
        n: common_vendor.f(time.value[0] < 21 ? 4 : 24 - time.value[0], (eh, k0, i0) => {
          return {
            a: common_vendor.t(`${time.value[0] + eh - 1}:59`),
            b: eh + 60
          };
        }),
        o: time.value,
        p: common_vendor.o(timeChanged),
        q: common_vendor.p({
          title: "预约申请",
          type: "line",
          padding: ""
        }),
        r: disabled.value
      }, disabled.value ? {
        s: common_vendor.t(disabled.value)
      } : {}, {
        t: disabled.value,
        v: `/pages/apply/progress?date=${common_vendor.unref(days)[selectedDay.value].date.toDateString()}&start_time=${time.value[0]}&classroom=${roomID.value}&length=${time.value[1]}`
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/shenshichao/Documents/practice/uniapp/smart_class/pages/apply/apply.vue"]]);
wx.createPage(MiniProgramPage);
