<!-- 互动消息interactMessages -->
<template>
	<view class="container">
		<tui-list-view>
			<tui-list-cell v-for="(item,index) of listData" :key="index" @click="clickChat(item)">
				<view style="display: flex;justify-content: space-between;">
					<view class="con-left">
						<view class="con-left-imgBox">
							<image class="cl-imgBox-imag" :src="item.imag" mode=""></image>
						</view>
						<view class="con-left-centent">
							<text class="cl-centent-shopName">{{ item.shopName }}</text>
							<text class="cl-centent-text" v-if="item.badge > 0">你有一条店铺消息</text>
						</view>
					</view>
					<view class="con-right">
						<text class="con-right-time">{{ item.time }}</text>
						<view class="con-right-badge" v-if="item.badge > 0">{{ item.badge > 99 ? '99+' : item.badge }}</view>
					</view>
				</view>

			</tui-list-cell>
		</tui-list-view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				listData: [{
						imag: "/static/images/fans/1.jpg",
						shopName: "窈窕淑女",
						time: "昨天",
						badge: 2
					},
					{
						imag: "/static/images/fans/2.jpg",
						shopName: "君子好逑",
						time: "星期六",
						badge: 5
					},
					{
						imag: "/static/images/fans/3.jpg",
						shopName: "桃之夭夭 宜其适家",
						time: "21/06/06",
						badge: 300
					},
					{
						imag: "/static/images/fans/4.jpg",
						shopName: "茶颜悦色",
						time: "21/05/06",
						badge: 60
					},
					{
						imag: "/static/images/fans/5.jpg",
						shopName: "suboer",
						time: "21/03/06",
						badge: 0
					}
				]
			}
		},
		
		methods: {
			// 点击进去聊天
			clickChat(item){
				uni.navigateTo({
					url: '/pages/chat/chat',
				});
			}
		},
	}
</script>

<style scoped lang="scss">
	page {
		background-color: $page-bg-color;
	}

	.container {
		margin-top: 20rpx;
	}

	.con-left {
		display: flex;
	}

	.con-left-imgBox {
		height: 80rpx;
		width: 80rpx;
	}

	.cl-imgBox-imag {
		height: 80rpx;
		width: 80rpx;
		border-radius: 50%;
	}

	.con-left-centent {
		display: flex;
		flex-direction: column;
		margin-left: 20rpx;
	}

	.cl-centent-shopName {
		font-size: 28rpx;
		color: #303133;
	}

	.cl-centent-text {
		color: #909399;
		font-size: 24rpx;
	}

	.con-right {
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
	}

	.con-right-time {
		color: #909399;
		font-size: 24rpx;
		margin-bottom: 5rpx;
	}

	.con-right-badge {
		min-height: 35rpx;
		min-width: 35rpx;
		text-align: center;
		line-height: 35rpx;
		border-radius: 50%;
		color: #FFFFFF;
		font-size: 22rpx;
		background-color: #fa436a;
		transform: scale(0.8);
		padding: 0 5rpx;
		position: absolute;
		right: 0;
		top: 40%;
	}
</style>
