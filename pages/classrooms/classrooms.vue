<script setup lang="ts">
	import { onLoad } from "@dcloudio/uni-app"
	import { ref } from "vue"
	import { Classroom } from "@/entities/classroom"
	import { classroomsByBuilding } from "@/apis/list"
	import { Result } from "../../entities/paginated_response";
	const classrooms = ref<Classroom[]>([])

	function applyClassroom(roomId : number) {
		uni.navigateTo({
			url: `/pages/apply/apply?roomId=${roomId}`,
		})
	}

	onLoad((e) => {
		classroomsByBuilding(e?.buildingId).then((result) => {
			classrooms.value = (result.data as Result<Classroom>).results
		})
	})
</script>

<template>
	<uni-list>
		<uni-list-item v-for="r in classrooms" :title="r.name" clickable @click="applyClassroom(r.id)" :key="r.id" />
	</uni-list>
</template>

<style>
</style>