"use strict";
const common_vendor = require("../../common/vendor.js");
const apis_list = require("../../apis/list.js");
const apis_cu = require("../../apis/cu.js");
const apis_delete = require("../../apis/delete.js");
require("../../apis/http.js");
require("../../apis/login.js");
if (!Array) {
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _easycom_uni_popup_message2 = common_vendor.resolveComponent("uni-popup-message");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_list_item2 = common_vendor.resolveComponent("uni-list-item");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_popup_dialog2 + _easycom_uni_popup2 + _easycom_uni_popup_message2 + _easycom_uni_icons2 + _easycom_uni_list_item2 + _easycom_uni_list2 + _easycom_uni_section2)();
}
const _easycom_uni_popup_dialog = () => "../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const _easycom_uni_popup_message = () => "../../uni_modules/uni-popup/components/uni-popup-message/uni-popup-message.js";
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_list_item = () => "../../uni_modules/uni-list/components/uni-list-item/uni-list-item.js";
const _easycom_uni_list = () => "../../uni_modules/uni-list/components/uni-list/uni-list.js";
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_popup_dialog + _easycom_uni_popup + _easycom_uni_popup_message + _easycom_uni_icons + _easycom_uni_list_item + _easycom_uni_list + _easycom_uni_section)();
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "lab_mng",
  setup(__props) {
    const buildings = common_vendor.ref([]);
    const classroomsOfBuilding = common_vendor.ref(/* @__PURE__ */ new Map());
    const editType = common_vendor.ref();
    const currentBuilding = common_vendor.ref();
    const currentClassroom = common_vendor.ref();
    const inputDialog = common_vendor.ref();
    const inputDefault = common_vendor.ref();
    const message = common_vendor.ref();
    const messageText = common_vendor.ref("");
    const alertDialog = common_vendor.ref();
    const toDelete = common_vendor.ref({ name: "" });
    function editConfirm(value) {
      switch (editType.value) {
        case "b":
          addBuilding(value);
          break;
        case "be":
          currentBuilding.value.name = value;
          updateBuilding(currentBuilding.value);
          break;
        case "c":
          addClassroom(value, currentBuilding.value);
          break;
        case "ce":
          currentClassroom.value.name = value;
          updateClassroom(currentClassroom.value);
          break;
      }
    }
    function deleteConfirm() {
      switch (editType.value) {
        case "bd":
          deleteBuilding(toDelete.value);
          break;
        case "cd":
          deleteClassroom(toDelete.value);
          break;
      }
    }
    function deleteBuilding(building) {
      apis_delete.deleteBuilding(building).then(popMessage);
    }
    function deleteClassroom(classroom) {
      apis_delete.deleteClassroom(classroom).then(popMessage);
    }
    function addBuilding(name) {
      apis_cu.addBuilding(name).then(popMessage);
    }
    function addClassroom(name, building) {
      apis_cu.addClassroom(name, building).then(popMessage);
    }
    function updateBuilding(building) {
      apis_cu.updateBuilding(building).then(popMessage);
    }
    function updateClassroom(classroom) {
      apis_cu.updateClassroom(classroom).then(popMessage);
    }
    function popMessage(r) {
      if (r.statusCode == 200) {
        messageText.value = "更新成功";
        message.value.open("success");
      } else if (r.statusCode == 201) {
        messageText.value = "更新成功";
        message.value.open("success");
      } else if (r.statusCode == 204) {
        messageText.value = "删除成功";
        message.value.open("success");
      } else {
        messageText.value = "更新失败，请联系开发者";
        message.value.open("error");
      }
      loadData();
      common_vendor.index.$emit("update");
    }
    function loadData() {
      apis_list.buildings().then((result) => {
        const data = result.data;
        buildings.value = data.results;
        buildings.value.forEach((b) => {
          apis_list.classroomsByBuilding(b.id).then((r) => {
            const cdata = r.data;
            classroomsOfBuilding.value.set(b.id, cdata.results);
          });
        });
      });
    }
    common_vendor.index.$on("update", loadData);
    common_vendor.onMounted(loadData);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.sr("input", "d6d960f2-1,d6d960f2-0"),
        b: common_vendor.o(editConfirm),
        c: common_vendor.p({
          mode: "input",
          title: "输入内容",
          value: inputDefault.value,
          placeholder: "请输入名称"
        }),
        d: common_vendor.sr(inputDialog, "d6d960f2-0", {
          "k": "inputDialog"
        }),
        e: common_vendor.p({
          type: "dialog"
        }),
        f: common_vendor.p({
          message: messageText.value,
          duration: 2e3
        }),
        g: common_vendor.sr(message, "d6d960f2-2", {
          "k": "message"
        }),
        h: common_vendor.p({
          type: "message"
        }),
        i: common_vendor.o(deleteConfirm),
        j: common_vendor.p({
          type: "warning",
          cancelText: "关闭",
          confirmText: "删除",
          title: "通知",
          content: `确认删除${toDelete.value.name}吗`
        }),
        k: common_vendor.sr(alertDialog, "d6d960f2-4", {
          "k": "alertDialog"
        }),
        l: common_vendor.p({
          type: "dialog"
        }),
        m: common_vendor.o(() => {
          editType.value = "b";
          inputDefault.value = "";
          inputDialog.value.open();
        }),
        n: common_vendor.f(buildings.value, (building, k0, i0) => {
          return {
            a: common_vendor.o(() => {
              editType.value = "be";
              currentBuilding.value = building;
              inputDefault.value = building.name;
              inputDialog.value.open();
            }, building.id),
            b: "d6d960f2-7-" + i0 + "," + ("d6d960f2-6-" + i0),
            c: common_vendor.o(() => {
              editType.value = "bd";
              toDelete.value = building, alertDialog.value.open();
            }, building.id),
            d: "d6d960f2-8-" + i0 + "," + ("d6d960f2-6-" + i0),
            e: common_vendor.o(() => {
              editType.value = "c";
              inputDefault.value = "";
              currentBuilding.value = building;
              inputDialog.value.open();
            }, building.id),
            f: common_vendor.f(classroomsOfBuilding.value.get(building.id), (r, k1, i1) => {
              return {
                a: `${r.id} ${building.id}`,
                b: "d6d960f2-10-" + i0 + "-" + i1 + "," + ("d6d960f2-9-" + i0),
                c: common_vendor.p({
                  title: r.name,
                  clickable: true
                }),
                d: `/pages/user/clsroom_mng?id=${r.id}`
              };
            }),
            g: "d6d960f2-9-" + i0 + "," + ("d6d960f2-6-" + i0),
            h: building.id,
            i: "d6d960f2-6-" + i0,
            j: common_vendor.p({
              title: building.name,
              type: "line",
              padding: true
            })
          };
        }),
        o: common_vendor.p({
          type: "compose",
          size: "32"
        }),
        p: common_vendor.p({
          type: "trash",
          size: "32"
        })
      };
    };
  }
});
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/shenshichao/Documents/practice/uniapp/smart_class/pages/user/lab_mng.vue"]]);
wx.createPage(MiniProgramPage);
