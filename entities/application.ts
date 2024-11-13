export interface Application {
	applicant : number
	apply_time : Date
	approve_time ?: Date
	approver ?: string
	classroom : number
	date : Date
	id : number
	length : number
	start_time : number
	status : "已过期" | "待审核" | "已通过"
}