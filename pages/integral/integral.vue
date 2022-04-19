<!-- 积分 integral-->
<template>
	<view class="container">
		<view class="con_head">
			<text class="head_Num">1000</text>
			<text class="head_title">积分</text>
		</view>

		<view class="con_tool">
			<view class="tool_content" v-for="(item,index) of toolList" :key="index" @click="navTo(item.url)">
				<tui-icon class="content_icon" :name="item.iconName" :size="20" color="#fa436a"></tui-icon>
				<text class="content_title">{{ item.title }}</text>
			</view>
		</view>
		
		<text class="con_integralMall">积分兑换商品</text>
		<view>
			<integral-mall></integral-mall>
		</view>
	</view>
</template>

<script>
	import integralMall from './integralMall'
	export default {
		components:{
			integralMall
		},
		data() {
			return {
				toolList: [{
						iconName: "home",
						title: "积分商城",
						url: "integralMall"
					},
					{
						iconName: "calendar",
						title: "积分记录",
						url: "integralRecord"
					},
					{
						iconName: "about",
						title: "积分规则",
						url: "integralRule"
					}
				]
			}
		},


		methods: {
			// 跳转到对应页面
			navTo(url) {
				uni.navigateTo({
					url: "/pages/integral/" + url
				})
			}
		}
	}
</script>

<style scoped>
	page {
		background-color: #F7F7F7;
	}

	.con_head {
		height: 300rpx;
		background: linear-gradient(90deg, rgb(248, 139, 42), rgb(252, 113, 5));
		box-shadow: 0 3rpx 20rpx rgba(255, 71, 10, 0.2);
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		color: #ffffff;
	}

	.head_Num {
		font-size: 42rpx;
		font-weight: bold;
	}

	.head_title {
		font-size: 28rpx;
	}

	.con_tool {
		height: 110rpx;
		background-color: #ffffff;
		width: 94%;
		margin: -5% 0 20rpx 3%;
		border-radius: 10rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx;
	}

	.content_title {
		margin-left: 5rpx;
		font-size: 28rpx;
	}
	
	.con_integralMall{
		margin: 20rpx;
		font-weight: bold;
	}
</style>
