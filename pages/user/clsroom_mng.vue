<template>
	<view style="padding: 2em;display: flex;justify-content: center;align-items: center;gap: 0.5em;"
		@click="inputDialog.open()">
		<text>{{roomInfo.name}}</text>
		<text>✏️</text>
	</view>
	<view style="margin: 1em;max-height: 70vh;
		background-color: whitesmoke;border-radius: 0.5rem;">
		<scroll-view scroll-y="true" style="height: 50vh;padding: 0.5em;background-color: white;border-radius: 0.5rem;">
			<uni-indexed-list :options="list" :showSelect="false" @click="listClicked"></uni-indexed-list>
		</scroll-view>

		<view style="margin: 0.75em;">
			<view style="font-weight: 300;margin-bottom: 0.25em;">
				管理员列表:
			</view>
			<view style="min-height: 2em;display: flex;flex-wrap: wrap;gap:0.5em">
				<uni-tag v-for="user in roomInfo.admin_detail" :key="user.id" :text="user.name+' x'" type="primary"
					@click="deleteAdmin(user)" />
			</view>
		</view>
	</view>
	<button type="warn" style="margin: 1em;" @click="alertDialog.open()">删除教室</button>


	<uni-popup ref="inputDialog" type="dialog">
		<uni-popup-dialog mode="input" title="输入内容" :value="roomInfo.name" placeholder="请输入名称"
			@confirm="editConfirm"></uni-popup-dialog>
	</uni-popup>

	<uni-popup ref="alertDialog" type="dialog">
		<uni-popup-dialog type="warn" cancelText="关闭" confirmText="确定" title="警告" content="确定删除该教室?"
			@confirm="delClassroom"></uni-popup-dialog>
	</uni-popup>
</template>
<script setup lang="ts">
	import { onLoad } from "@dcloudio/uni-app"
	import { ref } from "vue"
	import { getClassroom, updateClassroom } from "@/apis/cu";
	import { indexedUserInfo, userInfoByUsername } from "@/apis/user";
	import { deleteClassroom } from "@/apis/delete";
	import type { Classroom } from "@/entities/classroom";
	import type { IndexedUserInfoData, UserInfoData } from "@/entities/UserInfoData";
	import type uniPopupVue from "@/uni_modules/uni-popup/components/uni-popup/uni-popup.vue";

	const roomInfo = ref<Classroom>()
	const list = ref([])
	const inputDialog = ref<InstanceType<typeof uniPopupVue>>()
	const alertDialog = ref<InstanceType<typeof uniPopupVue>>()

	function listClicked(e : { item : { name : string } }) {
		userInfoByUsername(e.item.name.split(" ")[0]).then(r => {
			const clickedUser = r.data as UserInfoData
			addAdmin(clickedUser)
		})
	}
	function editConfirm(value : string) {
		roomInfo.value.name = value
		update()
	}

	function addAdmin(user : UserInfoData) {
		if (roomInfo.value.admins.includes(user.id))
			return
		roomInfo.value.admins.push(user.id)
		roomInfo.value.admin_detail.push(user)
		update()
	}
	function deleteAdmin(user : UserInfoData) {
		roomInfo.value.admins = roomInfo.value.admins.filter(v => {
			return v != user.id
		})
		roomInfo.value.admin_detail = roomInfo.value.admin_detail.filter(v => {
			return v.id != user.id
		})
		update()
	}
	function delClassroom(){
		deleteClassroom(roomInfo.value).then(()=>{
			uni.$emit("update")
			uni.navigateBack({ delta: 1 })
		})
	}
	function update() {
		updateClassroom(roomInfo.value).then(result => {
			roomInfo.value = result.data as Classroom
		})
	}


	onLoad((e) => {
		getClassroom(e?.id).then(result => {
			roomInfo.value = result.data as Classroom
		})
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
	/* .gradient-border{
	  border: 1px;
	  border-image-source: linear-gradient(to bottom, #8f41e9, #578aef);
	  border-image-slice: 1;
} */
</style>