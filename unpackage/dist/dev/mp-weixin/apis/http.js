"use strict";
const common_vendor = require("../common/vendor.js");
const apis_login = require("./login.js");
class Http {
  constructor() {
    this.baseURL = "https://wechatminiapp.jludreamworks.com/";
  }
  // baseURL = "http://127.0.0.1:8000/"
  async get(url, query) {
    return await this.request(url, "GET", query);
  }
  async post(url, data) {
    return await this.request(url, "POST", data);
  }
  async delete(url) {
    return await this.request(url, "DELETE");
  }
  async put(url, data) {
    return await this.request(url, "PUT", data);
  }
  async request(url, method, data) {
    if (!await apis_login.isAccessable()) {
      common_vendor.index.navigateTo({
        url: "/pages/user/login"
      });
      throw new Error("请重新登录");
    }
    return await common_vendor.index.request({
      url: url.startsWith(this.baseURL) ? url : this.baseURL + url,
      method,
      data,
      header: {
        Authorization: "JWT " + common_vendor.index.getStorageSync("access")
      }
    });
  }
}
const http = new Http();
exports.http = http;
