"use strict";
const apis_http = require("./http.js");
const common_vendor = require("../common/vendor.js");
const baseUrl = "http://127.0.0.1:8002";
class PageIterator {
  constructor(result) {
    this._failed = false;
    this.currentResult = result;
  }
  get failed() {
    return this._failed;
  }
  get complished() {
    return !Boolean(this.currentResult.next);
  }
  get hasPrev() {
    return Boolean(this.currentResult.previous);
  }
  async next() {
    if (this._failed || this.complished)
      return new PageIterator(null);
    const response = await apis_http.http.get(this.currentResult.next.substring(baseUrl.length + 1));
    if (response.statusCode == 200) {
      return new PageIterator(response.data);
    } else {
      this._failed = true;
      return new PageIterator(null);
    }
  }
  async prev() {
    if (this._failed || !this.hasPrev)
      return new PageIterator(null);
    const response = await apis_http.http.get(this.currentResult.previous.substring(baseUrl.length + 1));
    if (response.statusCode == 200) {
      return new PageIterator(response.data);
    } else {
      this._failed = true;
      return new PageIterator(null);
    }
  }
}
async function buildings(max) {
  return await apis_http.http.get("buildings", { limit: max ?? 1e3 });
}
async function classroomsByBuilding(buildingID) {
  return await apis_http.http.get("classrooms_by_building", { building: buildingID, limit: 99999 });
}
async function myApplications(id) {
  if (id) {
    return await apis_http.http.get("my_applications", { id });
  } else {
    return await apis_http.http.get("my_applications", { ordering: "-id" });
  }
}
async function myApplicationsSummary() {
  return await apis_http.http.get("my_applications_summary", { limit: 99999 });
}
async function classroomOccupied(classroomID, date) {
  return await apis_http.http.get("classroom_occupied", { id: classroomID, date: common_vendor.dayjs(date).format("YYYY-MM-DD") });
}
async function allApplications(limit) {
  const data = await apis_http.http.get("all_applications", { ordering: "-id", limit });
  return new PageIterator(data.data);
}
exports.allApplications = allApplications;
exports.buildings = buildings;
exports.classroomOccupied = classroomOccupied;
exports.classroomsByBuilding = classroomsByBuilding;
exports.myApplications = myApplications;
exports.myApplicationsSummary = myApplicationsSummary;
