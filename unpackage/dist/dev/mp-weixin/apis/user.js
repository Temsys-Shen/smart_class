"use strict";
const common_vendor = require("../common/vendor.js");
const apis_http = require("./http.js");
async function userInfo() {
  const { data } = await common_vendor.index.getStorage({ key: "username" });
  return await userInfoByUsername(data);
}
async function userInfoByUsername(username) {
  const id = await getID(username);
  return await apis_http.http.get("users/" + id.data["id"]);
}
async function getID(username) {
  return await apis_http.http.post("get_id/", { username });
}
async function updateInfo(id, data) {
  return await apis_http.http.put("users/" + id, data);
}
async function changePwd(pwd) {
  return await apis_http.http.post("change_pwd/", { password: pwd });
}
async function indexedUserInfo() {
  return await apis_http.http.get("indexed_users/");
}
async function resetPassword(username) {
  return await apis_http.http.post("reset_pwd/", { username });
}
async function updateUser(user) {
  return await apis_http.http.put("users/" + user.id, user);
}
exports.changePwd = changePwd;
exports.indexedUserInfo = indexedUserInfo;
exports.resetPassword = resetPassword;
exports.updateInfo = updateInfo;
exports.updateUser = updateUser;
exports.userInfo = userInfo;
exports.userInfoByUsername = userInfoByUsername;
