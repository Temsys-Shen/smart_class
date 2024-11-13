<template>
	<view>
		<uni-section title="教学楼" type="line" padding @click="moreBuildings">
			<template v-slot:right>
				<text>更多&nbsp></text>
			</template>
			<uni-grid :column="4" :highlight="true" :show-border="false">
				<uni-grid-item v-for="building in someBuildings" :key="building.id">
					<navigator class="grid-item-box" :url="`/pages/classrooms/classrooms?buildingId=${building.id}`"
						hover-class="navigator-hover">
						<text>{{building.name}}</text>
					</navigator>
				</uni-grid-item>
			</uni-grid>
		</uni-section>

		<uni-section title="历史预约" type="line" padding>
			<uni-list>
				<uni-list-item v-for="h in history" :title="h.name" :right-text="`预约${h.times}次`" clickable
					@click="applyClassroom(h.roomId)" :key="h.name"/>
			</uni-list>
		</uni-section>
	</view>
	<BgImg />
</template>


<script setup lang="ts">
	import { ref } from "vue"

	import { History } from "@/entities/history"
	import { Building } from "@/entities/building";

	import { buildings, myApplicationsSummary } from "@/apis/list"
	import { Result } from "@/entities/paginated_response";
	import BgImg from "@/components/bgimg.vue"

	const someBuildings = ref<Building[]>([])
	const history = ref<History[]>([])
	function moreBuildings() {
		uni.navigateTo({
			url: "/pages/buildings/buildings"
		})
	}
	function applyClassroom(roomId : string) {
		uni.navigateTo({
			url: `/pages/apply/apply?roomId=${roomId}`,
		})
	}

	function load() {
		buildings(4).then((result) => {
			const data = result.data as Result<Building>
			someBuildings.value = data.results
		})
		myApplicationsSummary().then((result) => {
			const data = result.data as History[]
			history.value = data
		})
	}
	load()
	uni.$on('update', load)
</script>

<style lang="scss">
	.text {
		font-size: 14px;
		margin-top: 5px;
	}

	.grid-dynamic-box {
		margin-bottom: 15px;
	}

	.grid-item-box {
		flex: 1;
		display: flex;
		// position: relative;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-right: 0.125em;
		margin-left: 0.125em;
		// padding: 15px 0;
		text-align: center;
		border-radius: 8px;
		// background-color: green;
		box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
	}

	.grid-item-box-row {
		flex: 1;
		// position: relative;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
		padding: 15px 0;
	}

	.grid-dot {
		position: absolute;
		top: 5px;
		right: 15px;
	}
</style>