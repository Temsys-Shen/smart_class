<script>
	export default {
		onLaunch: function() {
			uni.navigateTo({
				url: "/pages/user/login"
			})
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>


<template>
</template>