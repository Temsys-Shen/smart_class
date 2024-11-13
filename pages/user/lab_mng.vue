<template>
	<uni-popup ref="inputDialog" type="dialog">
		<uni-popup-dialog ref="input" mode="input" title="输入内容" :value="inputDefault" placeholder="请输入名称"
			@confirm="editConfirm"></uni-popup-dialog>
	</uni-popup>

	<uni-popup ref="message" type="message">
		<uni-popup-message :message="messageText" :duration="2000"></uni-popup-message>
	</uni-popup>

	<uni-popup ref="alertDialog" type="dialog">
		<uni-popup-dialog type="warning" cancelText="关闭" confirmText="删除" title="通知" :content="`确认删除${toDelete.name}吗`"
			@confirm="deleteConfirm"></uni-popup-dialog>
	</uni-popup>

	<view style="padding: 1em;" @click="()=>{editType='b';inputDefault='';inputDialog.open()}"><text>+ 添加教学楼</text>
	</view>
	<uni-section v-for="building in buildings" :key="building.id" :title="building.name" type="line" padding>
		<template v-slot:right>
			<uni-icons type="compose" size="32"
				@click="()=>{editType='be';currentBuilding=building;inputDefault=building.name;inputDialog.open()}"></uni-icons>
			<uni-icons type="trash" size="32"
				@click="()=>{editType='bd';toDelete = building,alertDialog.open()}"></uni-icons>
		</template>
		<view style="padding: 1em;"><text
				@click="()=>{editType='c';inputDefault='';currentBuilding=building;inputDialog.open()}">+
				添加实验室</text></view>
		<uni-list>
			<navigator v-for="r in classroomsOfBuilding.get(building.id)" :url="`/pages/user/clsroom_mng?id=${r.id}`">
				<uni-list-item :title="r.name" clickable
					:key="`${r.id} ${building.id}`" />
			</navigator>
		</uni-list>
	</uni-section>

</template>

<script setup lang="ts">
	import { onMounted, ref } from "vue";
	import { Building } from "@/entities/building";
	import { Classroom } from "@/entities/classroom";
	import { buildings as getBuildings, classroomsByBuilding } from "@/apis/list"
	import { Result } from "@/entities/paginated_response";
	import { addBuilding as ab, addClassroom as ac, updateBuilding as ub, updateClassroom as uc } from "@/apis/cu"
	import { deleteBuilding as db, deleteClassroom as dc } from "@/apis/delete"
	import uniPopupVue from "@/uni_modules/uni-popup/components/uni-popup/uni-popup.vue";


	const buildings = ref<Building[]>([])
	const classroomsOfBuilding = ref<Map<number, Classroom[]>>(new Map())
	const editType = ref<"b" | "c" | "be" | "ce" | "bd" | "cd">()
	const currentBuilding = ref<Building>()
	const currentClassroom = ref<Classroom>()
	const inputDialog = ref<InstanceType<typeof uniPopupVue>>()
	const inputDefault = ref<string>()
	const message = ref<InstanceType<typeof uniPopupVue>>()
	const messageText = ref("")
	const alertDialog = ref<InstanceType<typeof uniPopupVue>>()
	const toDelete = ref<{ name : string }>({ name: "" })

	function editConfirm(value : string) {
		switch (editType.value) {
			case "b":
				addBuilding(value)
				break
			case "be":
				currentBuilding.value.name = value
				updateBuilding(currentBuilding.value)
				break
			case "c":
				addClassroom(value, currentBuilding.value)
				break
			case "ce":
				currentClassroom.value.name = value
				updateClassroom(currentClassroom.value)
				break
		}
	}
	function deleteConfirm() {
		switch (editType.value) {
			case "bd":
				deleteBuilding(toDelete.value as Building)
				break
			case "cd":
				deleteClassroom(toDelete.value as Classroom)
				break
		}
	}
	function deleteBuilding(building : Building) {
		db(building).then(popMessage)
	}
	function deleteClassroom(classroom : Classroom) {
		dc(classroom).then(popMessage)
	}
	function addBuilding(name : string) {
		ab(name).then(popMessage)
	}
	function addClassroom(name : string, building : Building) {
		ac(name, building).then(popMessage)
	}
	function updateBuilding(building : Building) {
		ub(building).then(popMessage)
	}
	function updateClassroom(classroom : Classroom) {
		uc(classroom).then(popMessage)
	}
	function popMessage(r : { statusCode : number }) {
		if (r.statusCode == 200) {
			messageText.value = "更新成功"
			message.value.open("success")
		}
		else if (r.statusCode == 201) {
			messageText.value = "更新成功"
			message.value.open("success")
		}
		else if (r.statusCode == 204) {
			messageText.value = "删除成功"
			message.value.open("success")
		}
		else {
			messageText.value = "更新失败，请联系开发者"
			message.value.open("error")
		}
		loadData()
		uni.$emit("update")
	}
	function loadData() {
		getBuildings().then((result) => {
			const data = result.data as Result<Building>
			buildings.value = data.results
			buildings.value.forEach(b => {
				classroomsByBuilding(b.id).then(r => {
					const cdata = r.data as Result<Classroom>
					classroomsOfBuilding.value.set(b.id, cdata.results)
				})
			})
		})
	}
	uni.$on("update",loadData)
	onMounted(loadData)
</script>

<style>
</style>