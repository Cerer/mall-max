<!-- 系统消息systemMessages -->
<template>
	<view class="container">
		<view class="con_message" v-for="(item,index) of list" :key="index" @click="clickShow(item.id)">
			<view class="message_time">
				<text class="time">{{ item.time }}</text>
			</view>

			<view class="message_content">
				<text class="content_title">{{ item.title }}</text>
				<text class="content_introduce">
					{{ item.introduce }}
				</text>
				<view class="content_bot b-t">
					<text>点击查看</text>
					<text class="bot_more yticon icon-you"></text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
					id: 0,
					time: "2021-05-31",
					title: "【美居奢品】61~64指定类目和店铺佣金提升!",
					introduce: "时尚美居狂欢会场!指定商品佣金最高提升至60%!"
				}, {
					id: 1,
					time: "2021-05-31",
					title: "【时尚】61-64日指定店铺佣金最高提升至27%!",
					introduce: "6.1-6.4日“时尚618”，领券每满200-30!指定店铺佣金最高提升至27%!"
				}, {
					id: 2,
					time: "2021-05-31",
					title: "【家电】61-6.17日指定商品每单最高奖励50元!",
					introduce: "厨卫大电、居家小电器618热卖中!6.1-617日推广指定单品，每单最高奖励50元!"
				}, {
					id: 3,
					time: "2021-05-31",
					title: "531-61日推广指定单品，最高奖励50元/单!",
					introduce: "618爆款大家电仅需999元，5.31-6.1日推广指定单品，最高奖励50元/单!"
				}, ],

				// 是否显示查看内容
				showCheck: false
			}
		},

		methods: {
			// 点击查看
			clickShow(id) {
				console.log(id)
				// 先这样处理，后续在传对应的ID
				uni.navigateTo({
					url:"/pages/message/systemDetails"
				})
			}
		}
	}
</script>

<style lang="less">
	page {
		background-color: #f7f7f7;
		padding-bottom: 30rpx;
	}

	.con_message {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.time {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 5rpx 10rpx;
		margin: 20rpx 0;
		font-size: 26rpx;
		color: #eeeeee;
		background-color: rgba(105, 105, 105, 0.5);
		border-radius: 35rpx;
	}

	.message_content {
		width: 710rpx;
		padding: 0 24rpx;
		background-color: #fff;
		border-radius: 4rpx;
	}

	.content_title {
		display: flex;
		align-items: center;
		height: 80rpx;
		font-size: 28rpx;
		color: #232426;
		font-weight: bold;
	}

	.content_introduce {
		display: inline-block;
		padding: 16rpx 0;
		font-size: 28rpx;
		color: #606266;
		line-height: 38rpx;
	}

	.content_bot {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 80rpx;
		font-size: 24rpx;
		color: #707070;
		position: relative;
	}

	.bot_more {
		font-size: 32rpx;
	}
</style>
