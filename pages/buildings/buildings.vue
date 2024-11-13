<template>
	<uni-list>
		<uni-list-item v-for="b in buildings" :title="b.name" clickable @click="showClassrooms(b.id)" :key="b.id"/>
	</uni-list>
</template>

<script setup lang="ts">
	import { Building } from "@/entities/building"
	import { ref } from "vue"
	import { onLoad } from "@dcloudio/uni-app"
	import { buildings as getBuildings } from "@/apis/list"
	import { Result } from "@/entities/paginated_response";

	function showClassrooms(buildingId : number) {
		uni.navigateTo({
			url: `/pages/classrooms/classrooms?buildingId=${buildingId}`,
		})
	}

	const buildings = ref<Building[]>([])

	onLoad(() => {
		getBuildings(9999).then((result) => {
			const data = result.data as Result<Building>
			buildings.value = data.results
		})
	})
</script>

<style>
</style>