<template>
	<view class="bgimg">
		<image src="@/static/building_image.png" mode="aspectFit"></image>
	</view>
</template>

<script lang="ts" setup>
</script>

<style>
	.bgimg {
		width: 100%;
		position: absolute;
		bottom: 0;
		padding: 2em;
		/* background-size: 100% 100%; */
		z-index: -1;
	}
</style>