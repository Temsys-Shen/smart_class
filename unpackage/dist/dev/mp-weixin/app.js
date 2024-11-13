"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/index/me.js";
  "./pages/buildings/buildings.js";
  "./pages/classrooms/classrooms.js";
  "./pages/apply/apply.js";
  "./pages/apply/progress.js";
  "./pages/user/login.js";
  "./pages/user/my_application.js";
  "./pages/user/user_info.js";
  "./pages/user/all_applications.js";
  "./pages/user/lab_mng.js";
  "./pages/user/user_mng.js";
  "./pages/user/clsroom_mng.js";
}
const _sfc_main = {
  onLaunch: function() {
    common_vendor.index.navigateTo({
      url: "/pages/user/login"
    });
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {};
}
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/Users/shenshichao/Documents/practice/uniapp/smart_class/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
