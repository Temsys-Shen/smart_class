"use strict";
const common_vendor = require("../../common/vendor.js");
const apis_list = require("../../apis/list.js");
const apis_apply = require("../../apis/apply.js");
require("../../apis/http.js");
require("../../apis/login.js");
if (!Array) {
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _easycom_uni_pagination2 = common_vendor.resolveComponent("uni-pagination");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _easycom_uni_popup_message2 = common_vendor.resolveComponent("uni-popup-message");
  (_easycom_uni_list_item2 + _easycom_uni_list2 + _easycom_uni_pagination2 + _easycom_uni_popup2 + _easycom_uni_popup_message2)();
}
const _easycom_uni_list_item = () => "../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../uni_modules/uni-list/components/uni-list/uni-list.js";
const _easycom_uni_pagination = () => "../../uni_modules/uni-pagination/components/uni-pagination/uni-pagination.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const _easycom_uni_popup_message = () => "../../uni_modules/uni-popup/components/uni-popup-message/uni-popup-message.js";
if (!Math) {
  (_easycom_uni_list_item + _easycom_uni_list + _easycom_uni_pagination + _easycom_uni_popup + _easycom_uni_popup_message)();
}
const __default__ = {
  onPullDownRefresh() {
    const pages = getCurrentPages();
    const curPage = pages[pages.length - 1];
    curPage.onLoad();
    common_vendor.index.stopPullDownRefresh();
  }
};
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  ...__default__,
  __name: "all_applications",
  setup(__props) {
    const popupMessage = common_vendor.ref();
    const popupID = common_vendor.ref();
    const popupShowApprove = common_vendor.ref(true);
    const messageText = common_vendor.ref();
    const message = common_vendor.ref();
    const popup = common_vendor.ref();
    const pagesize = 10;
    const statusTheColor = {
      "已过期": "grey",
      "待审核": "blue",
      "已通过": "green"
    };
    const current = common_vendor.ref(0);
    const applications = common_vendor.ref([]);
    const applicationsIterator = common_vendor.ref();
    function deleteApp() {
      apis_apply.deleteApplication(popupID.value).then((v) => {
        popup.value.close();
        if (v) {
          messageText.value = "删除成功";
          applications.value.forEach((v2) => {
            if (v2.id == popupID.value) {
              applications.value.splice(applications.value.indexOf(v2), 1);
            }
          });
          message.value.open("success");
        } else {
          messageText.value = "删除失败";
          message.value.open("error");
        }
      });
    }
    function sendApprove() {
      apis_apply.approve(popupID.value).then((result) => {
        popup.value.close();
        if (result.statusCode == 200) {
          messageText.value = "审批成功";
          message.value.open("success");
          applications.value.forEach((v) => {
            v.id == popupID.value ? v.status = "已通过" : null;
          });
        } else {
          message.value = "审批失败，原因未知";
          message.value.open("error");
        }
      });
    }
    function processApplication(ID, info, status) {
      popup.value.open("bottom");
      popupMessage.value = info;
      popupID.value = ID;
      status == "待审核" ? popupShowApprove.value = true : popupShowApprove.value = false;
    }
    function pageChange(e) {
      current.value = e.current;
      switch (e.type) {
        case "next":
          applicationsIterator.value.next().then((result) => {
            applicationsIterator.value = result;
            applications.value = result.currentResult.results;
          });
          break;
        case "prev":
          applicationsIterator.value.prev().then((result) => {
            applicationsIterator.value = result;
            applications.value = result.currentResult.results;
          });
          break;
      }
    }
    common_vendor.onMounted(() => {
      apis_list.allApplications(pagesize).then((result) => {
        applicationsIterator.value = result;
        applications.value = result.currentResult.results;
      });
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(applications.value, (a, k0, i0) => {
          return {
            a: common_vendor.t(`[${a.status}] `),
            b: common_vendor.t(a.applicant),
            c: common_vendor.t(`${a.classroom}`),
            d: common_vendor.t(String(`${a.date} ${a.start_time}:00-${a.start_time + a.length}:59`)),
            e: common_vendor.o(($event) => processApplication(a.id, `${a.classroom} ${a.applicant} ${a.date} ${a.start_time}:00-${a.start_time + a.length}:59`, a.status), a.id),
            f: a.id,
            g: common_vendor.s(`color: ${statusTheColor[a.status]};`),
            h: "dc09bc84-1-" + i0 + ",dc09bc84-0"
          };
        }),
        b: common_vendor.p({
          clickable: true
        }),
        c: common_vendor.o(pageChange),
        d: common_vendor.p({
          current: current.value,
          total: applicationsIterator.value.currentResult.count,
          ["page-size"]: pagesize,
          title: "标题文字",
          ["show-icon"]: true
        }),
        e: common_vendor.t(popupMessage.value),
        f: popupShowApprove.value
      }, popupShowApprove.value ? {
        g: common_vendor.o(sendApprove)
      } : {}, {
        h: common_vendor.o(deleteApp),
        i: common_vendor.o(($event) => popup.value.close()),
        j: common_vendor.sr(popup, "dc09bc84-3", {
          "k": "popup"
        }),
        k: common_vendor.p({
          ["background-color"]: "#fff"
        }),
        l: common_vendor.p({
          message: messageText.value,
          duration: 2e3
        }),
        m: common_vendor.sr(message, "dc09bc84-4", {
          "k": "message"
        }),
        n: common_vendor.p({
          type: "message"
        })
      });
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/shenshichao/Documents/practice/uniapp/smart_class/pages/user/all_applications.vue"]]);
wx.createPage(MiniProgramPage);
