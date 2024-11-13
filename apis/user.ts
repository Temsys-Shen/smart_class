import { UserInfoData } from "../entities/UserInfoData";
import { http } from "./http";

export async function userInfo() {
	const { data } = await uni.getStorage({ key: "username" })
	return await userInfoByUsername(data)
}

export async function userInfoByUsername(username : string) {
	const id = await getID(username)
	return await http.get("users/" + id.data["id"])
}

export async function getID(username : string) {
	return await http.post("get_id/", { username })
}

export async function updateInfo(id : number, data : AnyObject) {
	return await http.put("users/" + id, data)
}

export async function changePwd(pwd : string) {
	return await http.post("change_pwd/", { password: pwd })
}

export async function indexedUserInfo() {
	return await http.get("indexed_users/")
}

export async function resetPassword(username : string) {
	return await http.post("reset_pwd/", { username })
}

export async function updateUser(user : UserInfoData) {
	return await http.put("users/" + user.id, user)
}