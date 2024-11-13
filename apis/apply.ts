import { http } from "./http";
import dayjs from "dayjs"

export async function apply(date : Date, start_time : number, classroom : number, length : number) {
	return await http.post("apply/", { date: dayjs(date).format("YYYY-MM-DD"), start_time, classroom, length })
}

export async function approve(id:number){
	return await http.post("approve/",{id})
}

export async function deleteApplication(id:number){
	const rsp = await http.delete(`all_applications/${id}`)
	if(rsp.statusCode==204){
		return true;
	}
	else{
		return false
	}
}