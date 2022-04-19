<!-- 关于我们about -->
<template>
	<view class="container">
		<tui-list-view>
			<tui-list-cell arrow v-for="(item,index) of aboutList" :key="index">
				{{ item.name }}
			</tui-list-cell>
		</tui-list-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				aboutList: [{
					name: "服务内容"
				}, {
					name: "服务规则"
				}, {
					name: "联系信息"
				}]
			}
		}
	}
</script>

<style>
</style>
