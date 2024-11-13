"use strict";
const apis_http = require("./http.js");
const common_vendor = require("../common/vendor.js");
async function apply(date, start_time, classroom, length) {
  return await apis_http.http.post("apply/", { date: common_vendor.dayjs(date).format("YYYY-MM-DD"), start_time, classroom, length });
}
async function approve(id) {
  return await apis_http.http.post("approve/", { id });
}
async function deleteApplication(id) {
  const rsp = await apis_http.http.delete(`all_applications/${id}`);
  if (rsp.statusCode == 204) {
    return true;
  } else {
    return false;
  }
}
exports.apply = apply;
exports.approve = approve;
exports.deleteApplication = deleteApplication;
