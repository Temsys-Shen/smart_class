import type { UserInfoData } from "./UserInfoData"

export interface Classroom {
	id : number
	name : string
	building : number
	admins : number[]
	admin_detail : UserInfoData[]
}