<template>
	<view style="width: 100%;height: 5em;margin-bottom: 1em;margin-top: 1em;">
		<image :src="avatar" mode="aspectFit" style="height: 100%;width: 100%;"></image>
	</view>
	<uni-list>
		<uni-list-item title="用户名" showArrow clickable :right-text="uinfo.username"
			@click="edit('username')"></uni-list-item>
		<uni-list-item title="姓名" showArrow clickable :right-text="uinfo.name" @click="edit('name')"></uni-list-item>
		<uni-list-item title="邮箱" showArrow clickable :right-text="uinfo.email" @click="edit('email')"></uni-list-item>
		<uni-list-item title="手机" showArrow clickable :right-text="uinfo.mobile"
			@click="edit('mobile')"></uni-list-item>
		<uni-list-item title="注册时间" :right-text="uinfo.date_joined"></uni-list-item>
		<uni-list-item title="上次登录" :right-text="uinfo.last_login"></uni-list-item>
	</uni-list>
	<view style="margin: 1.25em;"><button type="warn"
			@click="()=>{currentType='password';inputDialog.open()}">修改密码</button></view>
	<!-- <text>用户名{{username}}</text> -->
	<uni-popup ref="inputDialog" type="dialog">
		<uni-popup-dialog ref="inputClose" mode="input" :title="popupTitle" :value="popupValue!" placeholder="请输入内容"
			@confirm="dialogInputConfirm"></uni-popup-dialog>
	</uni-popup>

</template>
<script setup lang="ts">
	import { onLoad } from "@dcloudio/uni-app"
	import { ref } from "vue"
	import { userInfo, updateInfo, changePwd } from "@/apis/user"
	import { UserInfoData } from "@/entities/UserInfoData"
	// const username = ref("")

	const avatar = ref<string>()
	const uinfo = ref<UserInfoData>()
	const popupValue = ref<string>()
	const popupTitle = ref<string>("输入内容")
	const inputDialog = ref()
	const currentType = ref<editType>()

	type editType = "username" | "name" | "email" | "mobile" | "password"

	function edit(type : editType) {
		currentType.value = type
		switch (type) {
			case "username":
				popupValue.value = uinfo.value.username
				break
			case "name":
				popupValue.value = uinfo.value.name
				break
			case "mobile":
				popupValue.value = uinfo.value.mobile
				break
			case "email":
				popupValue.value = uinfo.value.email
				break
		}
		inputDialog.value.open()
	}

	function dialogInputConfirm(v : string) {
		if (currentType.value == "password") {
			changePwd(v).then(()=>{
				uni.setStorageSync("refresh", null)
				uni.reLaunch({
					url:"/pages/index/index"
				})
			})
		}
		const id = uinfo.value.id
		switch (currentType.value) {
			case "username":
				uinfo.value.username = v
				break
			case "name":
				uinfo.value.name = v
				break
			case "mobile":
				uinfo.value.mobile = v
				break
			case "email":
				uinfo.value.email = v
				break
		}
		delete uinfo.value.avatar
		updateInfo(id, uinfo.value)
	}

	onLoad(() => {
		userInfo().then(result => {
			uinfo.value = result.data as UserInfoData
		})

		uni.getStorage({
			key: "avatar",
			success: result => {
				avatar.value = result.data
			}
		})
		// username.value = e.username
	})
</script>

<style>
</style>