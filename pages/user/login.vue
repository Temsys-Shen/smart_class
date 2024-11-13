<template>
	<view class="login">
		<view class="top_item">
			<image src="@/static/building_image.png"></image>
		</view>
		<view class="input-item" style="margin-top: 80rpx;">
			<view class="title-content">
				<uni-icons type="auth" size="16"></uni-icons>
				<text class="title">账号</text>
			</view>
			<input v-model="username" class="input" placeholder="请输入用户名" style="margin-left: 40rpx;" />
		</view>
		<view class="input-item">
			<view class="title-content">
				<uni-icons type="locked" size="16"></uni-icons>
				<text class="title">密码</text>
			</view>
			<input class="input" v-model="pwd" placeholder="请输入密码" style="margin-left: 40rpx;" password />
		</view>
		<view v-if="failed">
			<text style="color: red;">登录失败</text>
		</view>
		<view class="button" @click="frontLogin">登录</view>
	</view>
</template>

<script setup lang="ts">
	import { ref } from "vue"
	import { isAccessable, login } from "@/apis/login"
	const username = ref("")
	const pwd = ref("")
	const failed = ref(false)

	function frontLogin() {
		login(username.value, pwd.value)
			// .then(() => uni.reLaunch({
			// 	url:"/pages/index/index"
			// }))
			.catch(() => failed.value = true)
	}

	isAccessable().then(result => {
		if (result) {
			console.log("自动登录");
			uni.$emit('update', { msg: '页面更新' })
			uni.navigateBack({ delta: 1 })
		}
	})
</script>

<style>
	.top_item {
		display: flex;
		margin-top: 40rpx;
		margin-left: 32rpx;
		margin-right: 32rpx;
		justify-content: center;
	}

	.input-item {
		display: flex;
		margin-left: 32rpx;
		margin-right: 32rpx;
		height: 50px;
		align-items: center;
		border-bottom: 1px solid #efeff4;
		margin-bottom: 20rpx;
	}

	.button {
		height: 50px;
		line-height: 50px;
		margin-top: 60rpx;
		margin-left: 32rpx;
		margin-right: 32rpx;
		border-radius: 50rpx;
		font-size: 20px;
		background-color: #008AFE;
		color: #FFFFFF;
		text-align: center;
	}
</style>