import { LoginResult } from "../entities/loginResult"
import { http } from "./http"

function asyncToSync<T>(asyncFunction : () => Promise<T>, timeoutMilliseconds : number) : T {
	let result : T | undefined;
	let error : Error | null = null;
	let isCompleted = false;
	asyncFunction()
		.then((asyncResult) => {
			result = asyncResult;
			isCompleted = true;
		})
		.catch((err) => {
			error = err;
			isCompleted = true;
		});

	const startTimestamp = Date.now();
	// 同步等待，设置最大超时时间
	while (!isCompleted && Date.now() - startTimestamp < timeoutMilliseconds) {
		console.log(!isCompleted && Date.now() - startTimestamp < timeoutMilliseconds);
	}
	if (!isCompleted) {
		throw new Error("Timeout exceeded");
	}
	if (error) {
		throw error;
	}
	return result!;
}


export async function login(username : string, password : string) {
	try {
		const { data, statusCode } = await uni.request({
			url: http.baseURL + "api/login/", method: "POST", data: { username, password }
		})
		if (statusCode != 200) {
			throw new Error("登录失败")
		}
		const loginResult = data as LoginResult
		uni.setStorageSync("access", loginResult.access)
		uni.setStorageSync("refresh", loginResult.refresh)
		uni.setStorageSync("expires", loginResult.expires)
		uni.setStorageSync("username", loginResult.username)
		uni.setStorageSync("user_type", loginResult.user_type)
		uni.setStorageSync("name", loginResult.name)
		uni.setStorageSync("avatar", loginResult.avatar)
		uni.reLaunch({
			url: "/pages/index/index"
		})
	}
	catch (e) {
		console.log(e);
		throw (e)
	}
}

async function getState() {
	const { data, statusCode } = await uni.request({
		url: http.baseURL + "api/refresh_token/",
		method: "POST",
		data: { refresh: uni.getStorageSync("refresh") }
	})
	if (statusCode != 200) {
		throw new Error(data.toString())
	} else if (statusCode == 200) {
		return data
	} else {
		throw new Error("未知错误")
	}
}

export async function isAccessable() {
	try {
		const data = await getState()
		uni.setStorageSync("access", data["access"])
		uni.setStorageSync("refresh", data["refresh"])
	} catch (e) {
		return false
	}
	return true
}