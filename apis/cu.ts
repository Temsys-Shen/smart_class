import { Building } from "@/entities/building";
import { Classroom } from "@/entities/classroom";
import { http } from "./http";

export async function addBuilding(name:string){
	return await http.post("buildings/",{name})
}
export async function addClassroom(name:string,building:Building){
	return await http.post("classrooms/",{name,building:building.id})
}
export async function updateBuilding(building:Building){
	return await http.put("buildings/"+building.id,building)
}
export async function updateClassroom(classroom:Classroom){
	return await http.put("classrooms/"+classroom.id,classroom)
}
export async function getClassroom(id:number){
	return await http.get("classrooms/"+id)
}