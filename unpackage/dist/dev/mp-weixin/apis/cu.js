"use strict";
const apis_http = require("./http.js");
async function addBuilding(name) {
  return await apis_http.http.post("buildings/", { name });
}
async function addClassroom(name, building) {
  return await apis_http.http.post("classrooms/", { name, building: building.id });
}
async function updateBuilding(building) {
  return await apis_http.http.put("buildings/" + building.id, building);
}
async function updateClassroom(classroom) {
  return await apis_http.http.put("classrooms/" + classroom.id, classroom);
}
async function getClassroom(id) {
  return await apis_http.http.get("classrooms/" + id);
}
exports.addBuilding = addBuilding;
exports.addClassroom = addClassroom;
exports.getClassroom = getClassroom;
exports.updateBuilding = updateBuilding;
exports.updateClassroom = updateClassroom;
