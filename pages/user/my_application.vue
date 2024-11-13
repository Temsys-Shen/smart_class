<template>
	<view style="padding: 1em;">
		<uni-segmented-control :values="Object.keys(statusMap)" :current="current"
			@clickItem="(({currentIndex})=>current=currentIndex)" />
	</view>

	<uni-list>
		<uni-list-item v-for="a in applications.filter((v)=>v.status==Object.values(statusMap)[current])"
			:title="`${a.date} ${a.start_time}:00-${a.start_time+a.length}:59`" :right-text="a.classroom" clickable
			@click="showApplication(a.id)" :key="a.id" />
	</uni-list>
</template>

<script setup lang="ts">
	import { Application } from "@/entities/application"
	import { ref } from "vue"
	import { onLoad } from "@dcloudio/uni-app"
	import { myApplications } from "@/apis/list"

	const current = ref(0)
	const statusMap = {
		"等待审批": "待审核",
		"审批通过": "已通过",
		"使用完成": "已过期"
	}

	function showApplication(ID : number) {
		uni.navigateTo({
			url: `/pages/apply/progress?id=${ID}`,
		})
	}

	const applications = ref<Application[]>([])

	onLoad(() => {
		myApplications().then((result) => {
			const data = result.data as Application[]
			applications.value = data
		})
	})
</script>

<style>
</style>