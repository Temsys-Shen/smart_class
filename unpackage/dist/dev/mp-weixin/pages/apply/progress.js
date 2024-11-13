"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const apis_apply = require("../../apis/apply.js");
const apis_list = require("../../apis/list.js");
require("../../apis/http.js");
require("../../apis/login.js");
if (!Array) {
  const _easycom_uni_steps2 = common_vendor.resolveComponent("uni-steps");
  const _easycom_uni_popup_message2 = common_vendor.resolveComponent("uni-popup-message");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_steps2 + _easycom_uni_popup_message2 + _easycom_uni_popup2)();
}
const _easycom_uni_steps = () => "../../uni_modules/uni-steps/components/uni-steps/uni-steps.js";
const _easycom_uni_popup_message = () => "../../uni_modules/uni-popup/components/uni-popup-message/uni-popup-message.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_steps + _easycom_uni_popup_message + _easycom_uni_popup)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "progress",
  setup(__props) {
    const message = common_vendor.ref();
    const date = common_vendor.ref();
    const success = common_vendor.ref(false);
    const startTime = common_vendor.ref();
    const classroom = common_vendor.ref();
    const length = common_vendor.ref();
    const application = common_vendor.ref();
    const id = common_vendor.ref(0);
    const options = common_vendor.computed(() => {
      const formatTemplate = "YYYY-MM-DD HH:mm:ss";
      return [
        { title: "申请成功", desc: common_vendor.dayjs(application.value.apply_time).format(formatTemplate) },
        {
          title: "审批通过",
          desc: application.value.approve_time ? common_vendor.dayjs(application.value.approve_time).format(formatTemplate) : "未审批"
        },
        {
          title: "使用完成",
          desc: common_vendor.dayjs(application.value.date).add(application.value.start_time + application.value.length, "hours").add(59, "minutes").add(59, "seconds").format(formatTemplate)
        }
      ];
    });
    const step = common_vendor.computed(() => {
      application.value;
      switch (application.value.status) {
        case "待审核":
          return 0;
        case "已通过":
          return 1;
        case "已过期":
          return 2;
      }
    });
    const back = () => common_vendor.index.navigateBack({ delta: 1 + (id.value ? 0 : 1) });
    function deleteApp() {
      apis_apply.deleteApplication(id.value).then((v) => {
        v ? back() : message.value.open("error");
      });
    }
    common_vendor.onLoad((e) => {
      if (e == null ? void 0 : e.id) {
        id.value = e.id;
        apis_list.myApplications(e.id).then((result) => {
          if (result.statusCode == 200) {
            success.value = true;
            application.value = result.data[0];
          } else {
            success.value = false;
          }
        });
      } else {
        date.value = new Date(e.date);
        startTime.value = e.start_time;
        classroom.value = e.classroom;
        length.value = e.length;
        apis_apply.apply(date.value, startTime.value, classroom.value, length.value).then((result) => {
          if (result.statusCode == 200) {
            success.value = true;
            application.value = result.data;
          } else {
            success.value = false;
          }
        });
      }
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: success.value
      }, success.value ? {
        b: common_assets._imports_0,
        c: common_vendor.p({
          options: common_vendor.unref(options),
          direction: "column",
          active: common_vendor.unref(step)
        })
      } : {}, {
        d: common_vendor.o(deleteApp),
        e: common_vendor.o(back),
        f: common_vendor.p({
          duration: 2e3
        }),
        g: common_vendor.sr(message, "9b0a7cf6-1", {
          "k": "message"
        }),
        h: common_vendor.p({
          type: "message"
        })
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/shenshichao/Documents/practice/uniapp/smart_class/pages/apply/progress.vue"]]);
wx.createPage(MiniProgramPage);
