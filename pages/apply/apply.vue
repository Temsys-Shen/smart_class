<template>
	<uni-segmented-control @clickItem="dateChanged" :values="days.map(dayObj => dayObj.day)" style-type="text"
		active-color="#4cd964" />
	<uni-section title="预约状态" type="line" padding>
		<!-- 0~12 -->
		<uni-row>
			<uni-col v-for="j in 12" :span="2" :key="j">
				<view :class="
				`${j==1?'col_start':j==12?'col_end':'col_normal'} ${occupiedList[j-1]?'deep':'light'} center_text`
				">{{occupiedList[j-1]}}</view>
			</uni-col>
		</uni-row>
		<uni-row>
			<uni-col v-for="i in 12" :span="2" :key="i+12">
				<view>{{i-1}}</view>
			</uni-col>
		</uni-row>
		<!-- 12~24 -->
		<uni-row>
			<uni-col v-for="j in 12" :span="2" :key="j+24">
				<view :class="
				`${j==1?'col_start':j==12?'col_end':'col_normal'} ${occupiedList[j+11]?'deep':'light'} center_text`
				">{{occupiedList[j+11]}}</view>
			</uni-col>
		</uni-row>
		<uni-row><!-- 这块不要删，用于保护布局 -->
			<uni-col :span="24"><!-- 这块不要删，用于保护布局 -->
			</uni-col><!-- 这块不要删，用于保护布局 -->
		</uni-row><!-- 这块不要删，用于保护布局 -->
		<uni-row>
			<uni-col v-for="i in 12" :span="2" :key="i+36">
				<view>{{i+11}}</view>
			</uni-col>
		</uni-row>
		<view style="display: flex;justify-content:space-around;">
			<text class="light" style="padding: 0.125em;border-radius: 4px;">可用</text>
			<text class="deep" style="padding: 0.125em;border-radius: 4px;">已占用</text>
		</view>
	</uni-section>
	<uni-section title="预约申请" type="line" padding="">
		<picker-view style="width: 100%; height: 600rpx;" :value="time" @change="timeChanged" immediate-change>
			<picker-view-column>
				<view v-for="sh in 24" :key="sh+48">{{`${sh-1}:00`}}</view>
			</picker-view-column>
			<picker-view-column>
				<view v-for="eh in time[0]<21?4:24-time[0]" :key="eh+60">{{`${time[0]+eh-1}:59`}}</view>
			</picker-view-column>
		</picker-view>
	</uni-section>
	<view v-if="disabled" style="color: red; margin-left: 2%;">{{disabled}}</view>

	<navigator
		:url="`/pages/apply/progress?date=${days[selectedDay].date.toDateString()}&start_time=${time[0]}&classroom=${roomID}&length=${time[1]}`"
		hover-class="navigator-hover">
		<button type="primary" style="position: fixed; bottom: 4%;left: 2%;right: 2%;" :disabled="disabled">提交</button>
	</navigator>
</template>

<script setup lang="ts">
	import { onLoad } from "@dcloudio/uni-app"
	import { ref } from "vue"
	import { classroomOccupied } from "@/apis/list";
	//被占用的时段
	const occupiedList = ref<(string | null | undefined)[]>(["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""])
	// 获取包括当日的接下来七天的列表
	const days : { day : number, date : Date }[] = Array.from({ length: 7 }, (_, i) => {
		const date = new Date();
		date.setDate(date.getDate() + i);
		return { day: date.getDate(), date };
	});
	//顶部被选中的日期
	const selectedDay = ref<number>(0)
	//预约申请时间段
	const time = ref<number[]>([new Date().getHours(), 0])
	//禁止提交
	const disabled = ref<string>(null)
	//教室ID
	const roomID = ref<number>()

	function queryOccupancy() {
		classroomOccupied(roomID.value, days.map(obj => obj.date)[selectedDay.value])
			.then(result => {
				occupiedList.value = result.data as string[]
			})
			.finally(timeChanged)
	}
	function dateChanged(e : { currentIndex : number }) {
		selectedDay.value = e.currentIndex
		queryOccupancy()
	}
	function timeChanged() : void
	function timeChanged(e : any) : void
	function timeChanged(e ?: any) : void {
		if (e)
			time.value = e.detail.value
		//判断是否有已被申请的时段
		try {
			occupiedList.value.forEach((s, i) => {
				if (s != "" && i >= time.value[0] && i <= time.value[0] + time.value[1]) {
					throw new Error("当前选择时段已被预约")
				}
				else if (days.map((v) => v.date)[selectedDay.value].getDate() == new Date().getDate() &&
					time.value[0] < new Date().getHours()) {
					throw new Error("申请时段已过")
				}
				else {
					disabled.value = null
				}
			})
		}
		catch (e) {
			disabled.value = e.message
		}
	}


	onLoad((e) => {
		roomID.value = e?.roomId
		queryOccupancy()
	})
</script>


<style>
	.center_text {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 70%;
	}

	.col_start {
		height: 36px;
		border-radius: 10px 0px 0px 10px;
	}

	.col_normal {
		height: 36px;
	}

	.col_end {
		height: 36px;
		border-radius: 0px 10px 10px 0px;
	}

	.deep {
		background-color: #99a9bf;
	}

	.light {
		background-color: #4bc562;
	}
</style>