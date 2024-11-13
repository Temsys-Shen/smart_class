import { http } from "./http";
import dayjs from "dayjs"
import { Result } from "@/entities/paginated_response";
import { Application } from "../entities/application";

const baseUrl = "http://127.0.0.1:8002"

export class PageIterator<T>{
	currentResult : Result<T>
	private _failed : boolean = false
	get failed() {
		return this._failed
	}
	get complished() {
		return !Boolean(this.currentResult.next)
	}
	get hasPrev() {
		return Boolean(this.currentResult.previous)
	}

	constructor(result : Result<T>) {
		this.currentResult = result
	}

	async next() {
		if (this._failed || this.complished)
			return new PageIterator<T>(null)
		const response = await http.get(this.currentResult.next.substring(baseUrl.length+1))
		if (response.statusCode == 200) {
			return new PageIterator(response.data as Result<T>)
		}
		else {
			this._failed = true
			return new PageIterator<T>(null)
		}
	}
	async prev() {
		if (this._failed || !this.hasPrev)
			return new PageIterator<T>(null)
		const response = await http.get(this.currentResult.previous.substring(baseUrl.length+1))
		if (response.statusCode == 200) {
			return new PageIterator(response.data as Result<T>)
		}
		else {
			this._failed = true
			return new PageIterator<T>(null)
		}
	}
}

export async function buildings(max ?: number) {
	return await http.get("buildings", { limit: max ?? 1000 })
}

export async function classroomsByBuilding(buildingID : number) {
	return await http.get("classrooms_by_building", { building: buildingID, limit: 99999 })
}

export async function myApplications(id ?: number) {
	if (id) {
		return await http.get("my_applications", { id, })
	}
	else {
		return await http.get("my_applications", { ordering: "-id" })
	}
}

export async function myApplicationsSummary() {
	return await http.get("my_applications_summary", { limit: 99999 })
}

export async function classroomOccupied(classroomID : number, date : Date) {
	return await http.get("classroom_occupied", { id: classroomID, date: dayjs(date).format("YYYY-MM-DD") })
}

export async function allApplications(limit ?: number) {
	const data = await http.get("all_applications", { ordering: "-id", limit })
	return new PageIterator(data.data as Result<Application>)
}