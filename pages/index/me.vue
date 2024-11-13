<template>
	<BgImg />
	<uni-card :title="name" :sub-title="position" :thumbnail="avatar">

		<uni-list>
			<view v-if="logged">
				<view v-if="position!='普通用户'">
					<navigator url="/pages/user/lab_mng">
						<uni-list-item title="实验室管理" showArrow clickable></uni-list-item>
					</navigator>
					<navigator url="/pages/user/all_applications">
						<uni-list-item title="申请审批" showArrow clickable></uni-list-item>
					</navigator>
					<navigator url="/pages/user/user_mng">
						<uni-list-item title="用户管理" showArrow clickable></uni-list-item>
					</navigator>
				</view>

				<navigator url="/pages/user/my_application">
					<uni-list-item title="我的申请" showArrow clickable></uni-list-item>
				</navigator>

			</view>
			<uni-list-item v-else title="请先登录"></uni-list-item>
		</uni-list>



		<view slot="actions" class="card-actions no-border">
			<view v-if="logged" class="card-actions-item">
				<uni-icons type="undo" size="18" color="#999"></uni-icons>
				<text class="card-actions-item-text" @click="logout">退出</text>
			</view>
			<view v-else class="card-actions-item">
				<uni-icons type="contact" size="18" color="#999"></uni-icons>
				<text class="card-actions-item-text" @click="http.get('')">登录</text>
			</view>
			<view class="card-actions-item">
				<uni-icons type="list" size="18" color="#999"></uni-icons>
				<text class="card-actions-item-text" @click="userInfo">个人信息</text>
			</view>
		</view>
	</uni-card>
</template>

<script setup lang="ts">
	import { ref } from "vue"
	import { http } from "@/apis/http"
	import BgImg from "@/components/bgimg.vue"

	const logged = ref(false)
	const name = ref("未登录")
	const position = ref("")
	const avatar = ref("/static/logo.png")

	function load() {
		logged.value = true
		name.value = uni.getStorageSync("name")
		position.value = uni.getStorageSync("user_type")
		avatar.value = uni.getStorageSync("avatar")
	}
	function logout() {
		logged.value = false
		uni.setStorageSync("refresh", null)
		name.value = "未登录"
		position.value = ""
		avatar.value = "/static/logo.png"
	}
	function userInfo() {
		uni.navigateTo({
			url: `/pages/user/user_info?username=${uni.getStorageSync('username')}`
		})
	}

	load()
	uni.$on('update', load)
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}


	.card-actions {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		height: 45px;
		border-top: 1px #eee solid;
	}
</style>