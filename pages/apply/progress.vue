<template>
	<view v-if="success">
		<view class="center-container">
			<image src="@/static/success.png" mode="aspectFit"></image>
		</view>
		<uni-steps :options="options" direction="column" :active="step"></uni-steps>
	</view>
	<view class="bottom-buttons">
		<button type="warn" @click="deleteApp">删除</button>
		<button type="primary" @click="back">返回</button>
	</view>
	
	<uni-popup ref="message" type="message">
		<uni-popup-message :duration="2000">删除失败</uni-popup-message>
	</uni-popup>
</template>

<script setup lang="ts">
	import { onLoad } from "@dcloudio/uni-app"
	import { computed, ref } from "vue"
	import { apply, deleteApplication } from "@/apis/apply";
	import { Application } from "@/entities/application"
	import dayjs from "dayjs";
	import { myApplications } from "../../apis/list";
	
	const message = ref()

	const date = ref<Date>()
	const success = ref(false)
	const startTime = ref<number>()
	const classroom = ref<number>()
	const length = ref<number>()
	const application = ref<Application>()
	const id = ref<null | undefined | number>(0)
	const options = computed<{ title : string, desc : string }[]>(() => {
		const formatTemplate = "YYYY-MM-DD HH:mm:ss"
		return [{ title: "申请成功", desc: dayjs(application.value.apply_time).format(formatTemplate) },
		{
			title: "审批通过",
			desc: application.value.approve_time
				? dayjs(application.value.approve_time).format(formatTemplate)
				: "未审批"
		},
		{
			title: "使用完成",
			desc: dayjs(application.value.date)
				.add(application.value.start_time + application.value.length, "hours")
				.add(59, "minutes")
				.add(59, "seconds")
				.format(formatTemplate)
		},
		]
	})

	const step = computed(() => {
		application.value
		switch (application.value.status) {
			case "待审核":
				return 0
			case "已通过":
				return 1
			case "已过期":
				return 2
		}
	})
	const back = () => uni.navigateBack({ delta: 1 + (id.value ? 0 : 1) })
	function deleteApp() {
		deleteApplication(id.value).then(v=>{
			v?back():message.value.open("error")
		})
	}
	onLoad((e) => {
		if (e?.id) {
			id.value = e.id
			myApplications(e!.id)
				.then(result => {
					if (result.statusCode == 200) {
						success.value = true
						application.value = result.data[0] as Application
					}
					else {
						success.value = false
					}
				})
		}
		else {
			date.value = new Date(e!.date)
			startTime.value = e!.start_time
			classroom.value = e!.classroom
			length.value = e!.length
			apply(date.value, startTime.value, classroom.value, length.value)
				.then(result => {
					if (result.statusCode == 200) {
						success.value = true
						application.value = result.data as Application
					}
					else {
						success.value = false
					}
				})
		}
	})
</script>

<style>
	.center-container {
		display: flex;
		justify-content: center;
	}

	.center-container image {
		max-width: 50%;
		max-height: 50%;
		object-fit: contain;
	}

	.bottom-buttons {
		position: fixed;
		bottom: 4%;
		left: 2%;
		right: 2%;
	}

	.bottom-buttons button {
		margin-bottom: 2%;
	}
</style>