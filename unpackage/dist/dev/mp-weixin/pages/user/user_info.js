"use strict";
const common_vendor = require("../../common/vendor.js");
const apis_user = require("../../apis/user.js");
require("../../apis/http.js");
require("../../apis/login.js");
if (!Array) {
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_list_item2 + _easycom_uni_list2 + _easycom_uni_popup_dialog2 + _easycom_uni_popup2)();
}
const _easycom_uni_list_item = () => "../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../uni_modules/uni-list/components/uni-list/uni-list.js";
const _easycom_uni_popup_dialog = () => "../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_list_item + _easycom_uni_list + _easycom_uni_popup_dialog + _easycom_uni_popup)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "user_info",
  setup(__props) {
    const avatar = common_vendor.ref();
    const uinfo = common_vendor.ref();
    const popupValue = common_vendor.ref();
    const popupTitle = common_vendor.ref("输入内容");
    const inputDialog = common_vendor.ref();
    const currentType = common_vendor.ref();
    function edit(type) {
      currentType.value = type;
      switch (type) {
        case "username":
          popupValue.value = uinfo.value.username;
          break;
        case "name":
          popupValue.value = uinfo.value.name;
          break;
        case "mobile":
          popupValue.value = uinfo.value.mobile;
          break;
        case "email":
          popupValue.value = uinfo.value.email;
          break;
      }
      inputDialog.value.open();
    }
    function dialogInputConfirm(v) {
      if (currentType.value == "password") {
        apis_user.changePwd(v).then(() => {
          common_vendor.index.setStorageSync("refresh", null);
          common_vendor.index.reLaunch({
            url: "/pages/index/index"
          });
        });
      }
      const id = uinfo.value.id;
      switch (currentType.value) {
        case "username":
          uinfo.value.username = v;
          break;
        case "name":
          uinfo.value.name = v;
          break;
        case "mobile":
          uinfo.value.mobile = v;
          break;
        case "email":
          uinfo.value.email = v;
          break;
      }
      delete uinfo.value.avatar;
      apis_user.updateInfo(id, uinfo.value);
    }
    common_vendor.onLoad(() => {
      apis_user.userInfo().then((result) => {
        uinfo.value = result.data;
      });
      common_vendor.index.getStorage({
        key: "avatar",
        success: (result) => {
          avatar.value = result.data;
        }
      });
    });
    return (_ctx, _cache) => {
      return {
        a: avatar.value,
        b: common_vendor.o(($event) => edit("username")),
        c: common_vendor.p({
          title: "用户名",
          showArrow: true,
          clickable: true,
          ["right-text"]: uinfo.value.username
        }),
        d: common_vendor.o(($event) => edit("name")),
        e: common_vendor.p({
          title: "姓名",
          showArrow: true,
          clickable: true,
          ["right-text"]: uinfo.value.name
        }),
        f: common_vendor.o(($event) => edit("email")),
        g: common_vendor.p({
          title: "邮箱",
          showArrow: true,
          clickable: true,
          ["right-text"]: uinfo.value.email
        }),
        h: common_vendor.o(($event) => edit("mobile")),
        i: common_vendor.p({
          title: "手机",
          showArrow: true,
          clickable: true,
          ["right-text"]: uinfo.value.mobile
        }),
        j: common_vendor.p({
          title: "注册时间",
          ["right-text"]: uinfo.value.date_joined
        }),
        k: common_vendor.p({
          title: "上次登录",
          ["right-text"]: uinfo.value.last_login
        }),
        l: common_vendor.o(() => {
          currentType.value = "password";
          inputDialog.value.open();
        }),
        m: common_vendor.sr("inputClose", "386c5535-8,386c5535-7"),
        n: common_vendor.o(dialogInputConfirm),
        o: common_vendor.p({
          mode: "input",
          title: popupTitle.value,
          value: popupValue.value,
          placeholder: "请输入内容"
        }),
        p: common_vendor.sr(inputDialog, "386c5535-7", {
          "k": "inputDialog"
        }),
        q: common_vendor.p({
          type: "dialog"
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/shenshichao/Documents/practice/uniapp/smart_class/pages/user/user_info.vue"]]);
wx.createPage(MiniProgramPage);
