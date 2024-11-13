"use strict";
const common_vendor = require("../../common/vendor.js");
const apis_user = require("../../apis/user.js");
require("../../apis/http.js");
require("../../apis/login.js");
if (!Array) {
  const _easycom_uni_indexed_list2 = common_vendor.resolveComponent("uni-indexed-list");
  const _easycom_uni_tag2 = common_vendor.resolveComponent("uni-tag");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _easycom_uni_popup_message2 = common_vendor.resolveComponent("uni-popup-message");
  (_easycom_uni_indexed_list2 + _easycom_uni_tag2 + _easycom_uni_popup2 + _easycom_uni_popup_message2)();
}
const _easycom_uni_indexed_list = () => "../../uni_modules/uni-indexed-list/components/uni-indexed-list/uni-indexed-list.js";
const _easycom_uni_tag = () => "../../uni_modules/uni-tag/components/uni-tag/uni-tag.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const _easycom_uni_popup_message = () => "../../uni_modules/uni-popup/components/uni-popup-message/uni-popup-message.js";
if (!Math) {
  (_easycom_uni_indexed_list + _easycom_uni_tag + _easycom_uni_popup + _easycom_uni_popup_message)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "user_mng",
  setup(__props) {
    const popup = common_vendor.ref();
    const message = common_vendor.ref();
    const popupInfo = common_vendor.reactive({});
    const messageText = common_vendor.ref("");
    const list = common_vendor.ref([]);
    function toggleAdministration() {
      popupInfo.is_staff = !popupInfo.is_staff;
      apis_user.updateUser(popupInfo).then((r) => {
        if (r.statusCode == 200) {
          messageText.value = "更新成功";
          message.value.open("success");
        } else {
          messageText.value = "更新失败，请联系开发者";
          message.value.open("error");
        }
      });
      popup.value.close();
    }
    function toggleActivation() {
      popupInfo.is_active = !popupInfo.is_active;
      apis_user.updateUser(popupInfo).then((r) => {
        if (r.statusCode == 200) {
          messageText.value = "更新成功";
          message.value.open("success");
        } else {
          messageText.value = "更新失败，请联系开发者";
          message.value.open("error");
        }
      });
      popup.value.close();
    }
    function resetPwd(username) {
      apis_user.resetPassword(username).then((r) => {
        if (r.statusCode == 200) {
          messageText.value = "重置成功，密码为000000";
          message.value.open("success");
        } else {
          messageText.value = "重置失败，请联系开发者";
          message.value.open("error");
        }
      });
      popup.value.close();
    }
    function bindClick(e) {
      apis_user.userInfoByUsername(e.item.name.split(" ")[0]).then((r) => {
        Object.keys(r.data).forEach((key) => {
          popupInfo[key] = r.data[key];
        });
        delete popupInfo.avatar;
      });
      popup.value.open("bottom");
    }
    common_vendor.onMounted(() => {
      apis_user.indexedUserInfo().then((v) => {
        const data = v.data;
        list.value = Object.keys(data).map((k) => {
          return {
            "letter": k,
            "data": data[k].map((v2) => {
              return `${v2.username} ${v2.name}`;
            })
          };
        });
      });
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(bindClick),
        b: common_vendor.p({
          options: list.value,
          showSelect: false
        }),
        c: common_vendor.t(popupInfo.username),
        d: common_vendor.t(popupInfo.name),
        e: common_vendor.t(popupInfo.mobile),
        f: common_vendor.t(popupInfo.email),
        g: common_vendor.t(popupInfo.last_login ?? "暂未登录"),
        h: common_vendor.p({
          circle: true,
          text: "管理员",
          type: popupInfo.is_staff | popupInfo.is_superuser ? "success" : ""
        }),
        i: common_vendor.p({
          circle: true,
          text: "启用",
          type: popupInfo.is_active ? "success" : ""
        }),
        j: common_vendor.t(popupInfo.is_staff | popupInfo.is_superuser ? "取消管理员" : "设为管理员"),
        k: common_vendor.o(toggleAdministration),
        l: common_vendor.t(popupInfo.is_active ? "禁用" : "启用"),
        m: common_vendor.o(toggleActivation),
        n: common_vendor.o(($event) => resetPwd(popupInfo.username)),
        o: common_vendor.sr(popup, "764f50a2-1", {
          "k": "popup"
        }),
        p: common_vendor.p({
          ["background-color"]: "#fff"
        }),
        q: common_vendor.p({
          message: messageText.value,
          duration: 2e3
        }),
        r: common_vendor.sr(message, "764f50a2-4", {
          "k": "message"
        }),
        s: common_vendor.p({
          type: "message"
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/shenshichao/Documents/practice/uniapp/smart_class/pages/user/user_mng.vue"]]);
wx.createPage(MiniProgramPage);
