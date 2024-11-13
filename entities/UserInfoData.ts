export interface UserInfoData{
	avatar: string
	date_joined: Date
	email: string
	groups: string[]
	id: number
	is_active: boolean
	is_staff: boolean
	is_superuser: boolean
	last_login: Date
	mobile: string
	name: string
	user_permissions: string[]
	username: string
}

export type IndexedUserInfoData = Record<string,Array<UserInfoData>>