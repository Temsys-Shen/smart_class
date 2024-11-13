"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const apis_login = require("../../apis/login.js");
require("../../apis/http.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "login",
  setup(__props) {
    const username = common_vendor.ref("");
    const pwd = common_vendor.ref("");
    const failed = common_vendor.ref(false);
    function frontLogin() {
      apis_login.login(username.value, pwd.value).catch(() => failed.value = true);
    }
    apis_login.isAccessable().then((result) => {
      if (result) {
        console.log("自动登录");
        common_vendor.index.$emit("update", { msg: "页面更新" });
        common_vendor.index.navigateBack({ delta: 1 });
      }
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_assets._imports_0$1,
        b: common_vendor.p({
          type: "auth",
          size: "16"
        }),
        c: username.value,
        d: common_vendor.o(($event) => username.value = $event.detail.value),
        e: common_vendor.p({
          type: "locked",
          size: "16"
        }),
        f: pwd.value,
        g: common_vendor.o(($event) => pwd.value = $event.detail.value),
        h: failed.value
      }, failed.value ? {} : {}, {
        i: common_vendor.o(frontLogin)
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/shenshichao/Documents/practice/uniapp/smart_class/pages/user/login.vue"]]);
wx.createPage(MiniProgramPage);
