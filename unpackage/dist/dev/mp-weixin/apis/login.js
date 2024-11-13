"use strict";
const common_vendor = require("../common/vendor.js");
const apis_http = require("./http.js");
async function login(username, password) {
  try {
    const { data, statusCode } = await common_vendor.index.request({
      url: apis_http.http.baseURL + "api/login/",
      method: "POST",
      data: { username, password }
    });
    if (statusCode != 200) {
      throw new Error("登录失败");
    }
    const loginResult = data;
    common_vendor.index.setStorageSync("access", loginResult.access);
    common_vendor.index.setStorageSync("refresh", loginResult.refresh);
    common_vendor.index.setStorageSync("expires", loginResult.expires);
    common_vendor.index.setStorageSync("username", loginResult.username);
    common_vendor.index.setStorageSync("user_type", loginResult.user_type);
    common_vendor.index.setStorageSync("name", loginResult.name);
    common_vendor.index.setStorageSync("avatar", loginResult.avatar);
    common_vendor.index.reLaunch({
      url: "/pages/index/index"
    });
  } catch (e) {
    console.log(e);
    throw e;
  }
}
async function getState() {
  const { data, statusCode } = await common_vendor.index.request({
    url: apis_http.http.baseURL + "api/refresh_token/",
    method: "POST",
    data: { refresh: common_vendor.index.getStorageSync("refresh") }
  });
  if (statusCode != 200) {
    throw new Error(data.toString());
  } else if (statusCode == 200) {
    return data;
  } else {
    throw new Error("未知错误");
  }
}
async function isAccessable() {
  try {
    const data = await getState();
    common_vendor.index.setStorageSync("access", data["access"]);
    common_vendor.index.setStorageSync("refresh", data["refresh"]);
  } catch (e) {
    return false;
  }
  return true;
}
exports.isAccessable = isAccessable;
exports.login = login;
