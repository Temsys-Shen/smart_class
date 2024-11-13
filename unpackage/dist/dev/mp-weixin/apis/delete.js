"use strict";
const apis_http = require("./http.js");
async function deleteBuilding(building) {
  return await apis_http.http.delete("buildings/" + building.id);
}
async function deleteClassroom(classroom) {
  return await apis_http.http.delete("classrooms/" + classroom.id);
}
exports.deleteBuilding = deleteBuilding;
exports.deleteClassroom = deleteClassroom;
