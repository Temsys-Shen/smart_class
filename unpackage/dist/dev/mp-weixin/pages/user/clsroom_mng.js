"use strict";
const common_vendor = require("../../common/vendor.js");
const apis_cu = require("../../apis/cu.js");
const apis_user = require("../../apis/user.js");
const apis_delete = require("../../apis/delete.js");
require("../../apis/http.js");
require("../../apis/login.js");
if (!Array) {
  const _easycom_uni_indexed_list2 = common_vendor.resolveComponent("uni-indexed-list");
  const _easycom_uni_tag2 = common_vendor.resolveComponent("uni-tag");
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_indexed_list2 + _easycom_uni_tag2 + _easycom_uni_popup_dialog2 + _easycom_uni_popup2)();
}
const _easycom_uni_indexed_list = () => "../../uni_modules/uni-indexed-list/components/uni-indexed-list/uni-indexed-list.js";
const _easycom_uni_tag = () => "../../uni_modules/uni-tag/components/uni-tag/uni-tag.js";
const _easycom_uni_popup_dialog = () => "../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_indexed_list + _easycom_uni_tag + _easycom_uni_popup_dialog + _easycom_uni_popup)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "clsroom_mng",
  setup(__props) {
    const roomInfo = common_vendor.ref();
    const list = common_vendor.ref([]);
    const inputDialog = common_vendor.ref();
    const alertDialog = common_vendor.ref();
    function listClicked(e) {
      apis_user.userInfoByUsername(e.item.name.split(" ")[0]).then((r) => {
        const clickedUser = r.data;
        addAdmin(clickedUser);
      });
    }
    function editConfirm(value) {
      roomInfo.value.name = value;
      update();
    }
    function addAdmin(user) {
      if (roomInfo.value.admins.includes(user.id))
        return;
      roomInfo.value.admins.push(user.id);
      roomInfo.value.admin_detail.push(user);
      update();
    }
    function deleteAdmin(user) {
      roomInfo.value.admins = roomInfo.value.admins.filter((v) => {
        return v != user.id;
      });
      roomInfo.value.admin_detail = roomInfo.value.admin_detail.filter((v) => {
        return v.id != user.id;
      });
      update();
    }
    function delClassroom() {
      apis_delete.deleteClassroom(roomInfo.value).then(() => {
        common_vendor.index.$emit("update");
        common_vendor.index.navigateBack({ delta: 1 });
      });
    }
    function update() {
      apis_cu.updateClassroom(roomInfo.value).then((result) => {
        roomInfo.value = result.data;
      });
    }
    common_vendor.onLoad((e) => {
      apis_cu.getClassroom(e == null ? void 0 : e.id).then((result) => {
        roomInfo.value = result.data;
      });
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
        a: common_vendor.t(roomInfo.value.name),
        b: common_vendor.o(($event) => inputDialog.value.open()),
        c: common_vendor.o(listClicked),
        d: common_vendor.p({
          options: list.value,
          showSelect: false
        }),
        e: common_vendor.f(roomInfo.value.admin_detail, (user, k0, i0) => {
          return {
            a: user.id,
            b: common_vendor.o(($event) => deleteAdmin(user), user.id),
            c: "0b348502-1-" + i0,
            d: common_vendor.p({
              text: user.name + " x",
              type: "primary"
            })
          };
        }),
        f: common_vendor.o(($event) => alertDialog.value.open()),
        g: common_vendor.o(editConfirm),
        h: common_vendor.p({
          mode: "input",
          title: "输入内容",
          value: roomInfo.value.name,
          placeholder: "请输入名称"
        }),
        i: common_vendor.sr(inputDialog, "0b348502-2", {
          "k": "inputDialog"
        }),
        j: common_vendor.p({
          type: "dialog"
        }),
        k: common_vendor.o(delClassroom),
        l: common_vendor.p({
          type: "warn",
          cancelText: "关闭",
          confirmText: "确定",
          title: "警告",
          content: "确定删除该教室?"
        }),
        m: common_vendor.sr(alertDialog, "0b348502-4", {
          "k": "alertDialog"
        }),
        n: common_vendor.p({
          type: "dialog"
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/shenshichao/Documents/practice/uniapp/smart_class/pages/user/clsroom_mng.vue"]]);
wx.createPage(MiniProgramPage);
