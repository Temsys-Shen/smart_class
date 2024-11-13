"use strict";
const common_vendor = require("../../common/vendor.js");
const apis_http = require("../../apis/http.js");
require("../../apis/login.js");
if (!Array) {
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_card2 = common_vendor.resolveComponent("uni-card");
  (_easycom_uni_list_item2 + _easycom_uni_list2 + _easycom_uni_icons2 + _easycom_uni_card2)();
}
const _easycom_uni_list_item = () => "../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../uni_modules/uni-list/components/uni-list/uni-list.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_card = () => "../../uni_modules/uni-card/components/uni-card/uni-card.js";
if (!Math) {
  (BgImg + _easycom_uni_list_item + _easycom_uni_list + _easycom_uni_icons + _easycom_uni_card)();
}
const BgImg = () => "../../components/bgimg.js";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "me",
  setup(__props) {
    const logged = common_vendor.ref(false);
    const name = common_vendor.ref("未登录");
    const position = common_vendor.ref("");
    const avatar = common_vendor.ref("/static/logo.png");
    function load() {
      logged.value = true;
      name.value = common_vendor.index.getStorageSync("name");
      position.value = common_vendor.index.getStorageSync("user_type");
      avatar.value = common_vendor.index.getStorageSync("avatar");
    }
    function logout() {
      logged.value = false;
      common_vendor.index.setStorageSync("refresh", null);
      name.value = "未登录";
      position.value = "";
      avatar.value = "/static/logo.png";
    }
    function userInfo() {
      common_vendor.index.navigateTo({
        url: `/pages/user/user_info?username=${common_vendor.index.getStorageSync("username")}`
      });
    }
    load();
    common_vendor.index.$on("update", load);
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: logged.value
      }, logged.value ? common_vendor.e({
        b: position.value != "普通用户"
      }, position.value != "普通用户" ? {
        c: common_vendor.p({
          title: "实验室管理",
          showArrow: true,
          clickable: true
        }),
        d: common_vendor.p({
          title: "申请审批",
          showArrow: true,
          clickable: true
        }),
        e: common_vendor.p({
          title: "用户管理",
          showArrow: true,
          clickable: true
        })
      } : {}, {
        f: common_vendor.p({
          title: "我的申请",
          showArrow: true,
          clickable: true
        })
      }) : {
        g: common_vendor.p({
          title: "请先登录"
        })
      }, {
        h: logged.value
      }, logged.value ? {
        i: common_vendor.p({
          type: "undo",
          size: "18",
          color: "#999"
        }),
        j: common_vendor.o(logout)
      } : {
        k: common_vendor.p({
          type: "contact",
          size: "18",
          color: "#999"
        }),
        l: common_vendor.o(($event) => common_vendor.unref(apis_http.http).get(""))
      }, {
        m: common_vendor.p({
          type: "list",
          size: "18",
          color: "#999"
        }),
        n: common_vendor.o(userInfo),
        o: common_vendor.p({
          title: name.value,
          ["sub-title"]: position.value,
          thumbnail: avatar.value
        })
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/shenshichao/Documents/practice/uniapp/smart_class/pages/index/me.vue"]]);
wx.createPage(MiniProgramPage);
