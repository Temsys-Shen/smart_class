export interface LoginResult {
	access : string
	refresh : string
	expires : Date
	username : string
	user_type : "超级管理员" | "管理员" | "普通用户"
	avatar : string
	name : string
}