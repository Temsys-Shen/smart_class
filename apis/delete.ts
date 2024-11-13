import { Building } from "@/entities/building";
import { Classroom } from "@/entities/classroom";
import { http } from "./http";

export async function deleteBuilding(building:Building){
	return await http.delete("buildings/"+building.id)
}
export async function deleteClassroom(classroom:Classroom){
	return await http.delete("classrooms/"+classroom.id)
}