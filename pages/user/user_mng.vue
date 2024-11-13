<template>
	<uni-indexed-list :options="list" :showSelect="false" @click="bindClick"></uni-indexed-list>
	<uni-popup ref="popup" background-color="#fff">
		<view style="padding: 1em;display: grid;grid-template-columns: repeat(2, minmax(0, 1fr));row-gap: 0.5rem;">
			<text>账号：{{popupInfo.username}}</text>
			<text>姓名: {{popupInfo.name}}</text>
			<text>电话: {{popupInfo.mobile}}</text>
			<text style="grid-column: span 2 / span 2;">邮箱: {{popupInfo.email}}</text>
			<text style="grid-column: span 2 / span 2;">上次登录: {{popupInfo.last_login??'暂未登录'}}</text>
			<view style="grid-column: span 2 / span 2;display: flex;gap: 0.5rem;">
				<uni-tag circle text="管理员" :type="popupInfo.is_staff|popupInfo.is_superuser?'success':''" />
				<uni-tag circle text="启用" :type="popupInfo.is_active?'success':''" />
			</view>
			<view style="height: 2em;"></view>
			<view style="grid-column: span 2 / span 2;display: flex;justify-content: space-around;">
				<button type="primary" @click="toggleAdministration">{{popupInfo.is_staff|popupInfo.is_superuser?"取消管理员":"设为管理员"}}</button>
				<button type="warn" @click="toggleActivation">{{popupInfo.is_active?"禁用":"启用"}}</button>
				<button type="default" @click="resetPwd(popupInfo.username)">重置密码</button>
			</view>
		</view>
	</uni-popup>
	<uni-popup ref="message" type="message">
		<uni-popup-message :message="messageText" :duration="2000"></uni-popup-message>
	</uni-popup>
</template>

<script setup lang="ts">
	import { onMounted, ref, reactive } from "vue";
	import { IndexedUserInfoData, UserInfoData } from "@/entities/UserInfoData";
	import { indexedUserInfo, resetPassword, updateUser, userInfoByUsername } from "@/apis/user";
	import uniPopupVue from "@/uni_modules/uni-popup/components/uni-popup/uni-popup.vue";

	const popup = ref<InstanceType<typeof uniPopupVue>>()
	const message = ref<InstanceType<typeof uniPopupVue>>()
	const popupInfo = reactive<Partial<UserInfoData>>({})
	const messageText = ref("")
	const list = ref([])
	function toggleAdministration(){
		popupInfo.is_staff = !popupInfo.is_staff
		updateUser(popupInfo as UserInfoData).then(r=>{
			if (r.statusCode == 200) {
				messageText.value = "更新成功"
				message.value.open("success")
			}
			else {
				messageText.value = "更新失败，请联系开发者"
				message.value.open("error")
			}
		})
		popup.value.close()
	}
	function toggleActivation(){
		popupInfo.is_active = !popupInfo.is_active
		updateUser(popupInfo as UserInfoData).then(r=>{
			if (r.statusCode == 200) {
				messageText.value = "更新成功"
				message.value.open("success")
			}
			else {
				messageText.value = "更新失败，请联系开发者"
				message.value.open("error")
			}
		})
		popup.value.close()
	}
	function resetPwd(username : string) {
		resetPassword(username).then(r => {
			if (r.statusCode == 200) {
				messageText.value = "重置成功，密码为000000"
				message.value.open("success")
			}
			else {
				messageText.value = "重置失败，请联系开发者"
				message.value.open("error")
			}
			
		})
		popup.value.close()
	}
	function bindClick(e : { item : { name : string } }) {
		userInfoByUsername(e.item.name.split(" ")[0]).then(r => {
			Object.keys(r.data).forEach((key) => {
				popupInfo[key] = r.data[key]
			})
			delete popupInfo.avatar
		})
		popup.value.open("bottom")
	}
	onMounted(() => {
		indexedUserInfo().then(v => {
			const data = v.data as IndexedUserInfoData
			list.value = Object.keys(data).map(k => {
				return {

					"letter": k, "data": data[k].map(v => {
						return `${v.username} ${v.name}`
					})

				}
			})
		})
	})
</script>

<style>

</style>