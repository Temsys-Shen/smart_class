import { Building } from "../entities/building";
import { Classroom } from "../entities/classroom";
import { http } from "./http";

export async function getClassroomName(id : number) {
	const classroomResponse = await http.get("classrooms/" + id)
	const classroomInfo = classroomResponse.data as Classroom
	const buildingResponse = await http.get("building/" + classroomInfo.building)
	return (buildingResponse.data as Building).name + classroomInfo.name
}