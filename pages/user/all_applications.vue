<template>
	<uni-list>
		<uni-list-item v-for="a in applications" clickable
			@click="processApplication(a.id,`${a.classroom} ${a.applicant} ${a.date} ${a.start_time}:00-${a.start_time+a.length}:59`,a.status)"
			:key="a.id" :style="`color: ${statusTheColor[a.status]};`">
			<template v-slot:body style="width: 100%;">
				<view style="display: flex;justify-content: space-between;width: 100%;">
					<text>{{`[${a.status}] `}}{{ a.applicant }}</text>
					<text>{{`${a.classroom}`}}</text>
				</view>
				<view>
					<text style="font-size: 12px;width: 100%;">
						{{ String(`${a.date} ${a.start_time}:00-${a.start_time+a.length}:59`) }}
					</text>
				</view>
			</template>
			<template v-slot:footer>

			</template>
		</uni-list-item>
	</uni-list>
	<uni-pagination :current="current" :total="applicationsIterator.currentResult.count" :page-size="pagesize" title="标题文字"
		:show-icon="true" @change="pageChange" />

	<uni-popup ref="popup" background-color="#fff">
		<view style="width: 100; padding: 1em; ">
			<view>对该申请进行操作:</view>
			<view style="width: 100%;margin-top: 1em; margin-bottom: 1em;text-align: center;">
				{{popupMessage}}
			</view>
			<view style="display: flex;justify-content: space-around;">
				<button v-if="popupShowApprove" type="primary" @click="sendApprove">通过</button>
				<button type="warn" @click="deleteApp">删除</button>
				<button type="default" style="background-color: grey;" @click="popup.close()">取消</button>
			</view>
		</view>
	</uni-popup>

	<uni-popup ref="message" type="message">
		<uni-popup-message :message="messageText" :duration="2000"></uni-popup-message>
	</uni-popup>
</template>

<script setup lang="ts">
	import { Application } from "@/entities/application"
	import { onMounted, ref } from "vue"
	import { allApplications, type PageIterator } from "@/apis/list"
	import { approve } from "@/apis/apply"
	import { deleteApplication } from "@/apis/apply";

	const popupMessage = ref<string>()
	const popupID = ref<number>()
	const popupShowApprove = ref<boolean>(true)
	const messageText = ref<string>()
	const message = ref()
	const popup = ref()
	const pagesize = 10
	const statusTheColor = {
		"已过期": "grey",
		"待审核": "blue",
		"已通过": "green"
	}
	const current = ref(0)
	const applications = ref<Application[]>([])
	const applicationsIterator = ref<PageIterator<Application>>()
	function deleteApp() {
		deleteApplication(popupID.value).then(v => {
			popup.value.close()
			if (v) {
				messageText.value = "删除成功"
				applications.value.forEach(v => {
					if (v.id == popupID.value) {
						applications.value.splice(applications.value.indexOf(v), 1);
					}
				})
				message.value.open("success")
			} else {
				messageText.value = "删除失败"
				message.value.open("error")
			}
		})
	}
	function sendApprove() {
		approve(popupID.value).then(result => {
			popup.value.close()
			if (result.statusCode == 200) {
				messageText.value = "审批成功"
				message.value.open("success")
				applications.value.forEach(v => { v.id == popupID.value ? v.status = "已通过" : null })
			}
			else {
				message.value = "审批失败，原因未知"
				message.value.open("error")
			}
		})
	}
	function processApplication(ID : number, info : string, status : "已过期" | "待审核" | "已通过") {
		popup.value.open("bottom")
		popupMessage.value = info
		popupID.value = ID
		status == "待审核" ? popupShowApprove.value = true : popupShowApprove.value = false
	}
	function pageChange(e : { type : "next" | "prev", current : number }) {
		current.value = e.current
		switch (e.type) {
			case "next":
				applicationsIterator.value.next().then((result) => {
					applicationsIterator.value = result
					applications.value = result.currentResult.results
				})
				break
			case "prev":
				applicationsIterator.value.prev().then((result) => {
					applicationsIterator.value = result
					applications.value = result.currentResult.results
				})
				break
		}
	}

	onMounted(() => {
		allApplications(pagesize).then((result) => {
			applicationsIterator.value = result
			applications.value = result.currentResult.results
		})
	})
</script>

<script lang="ts">
	export default {
		onPullDownRefresh(){
			const pages = getCurrentPages()
			const curPage = pages[pages.length - 1]
			curPage.onLoad()
			uni.stopPullDownRefresh()
		},
	}
</script>