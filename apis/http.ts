import { isAccessable } from "./login"

class Http {
	baseURL = "https://wechatminiapp.jludreamworks.com/"
	// baseURL = "http://127.0.0.1:8000/"

	async get(url : string, query ?: string | AnyObject) {
		return await this.request(url, "GET", query)
	}
	async post(url : string, data ?: string | AnyObject) {
		return await this.request(url, "POST", data)
	}
	async delete(url : string) {
		return await this.request(url, "DELETE")
	}
	async put(url : string, data ?: string | AnyObject) {
		return await this.request(url, "PUT", data)
	}
	async request(url : string, method : 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT', data ?: string | AnyObject) {
		if (!(await isAccessable())){
			uni.navigateTo({
				url:"/pages/user/login"
			})
			throw new Error("请重新登录")
		}
		return await uni.request({
			url: url.startsWith(this.baseURL) ? url : this.baseURL + url,
			method,
			data,
			header: {
				Authorization: "JWT " + uni.getStorageSync('access')
			}
		})
	}
}

export const http = new Http()