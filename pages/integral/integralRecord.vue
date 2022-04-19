<!-- 积分记录integralRecord -->
<template>
	<view class="container">
		<view class="con_content">
			<tui-list-view v-for="(item,index) of list" :key="index" >
				<tui-list-cell @click="clickDetails">
					<view class="content_main">
						<view class="main_img">
							<image class="img_size" :src="item.imgSrc"></image>
						</view>
						<view class="main_text">
							<text>{{ item.title }}</text>
							<view class="text_footer">购物送积分 {{ item.footerText }}</view>
						</view>
						<view class="main_num">{{ item.num }}</view>
					</view>
				</tui-list-cell>
			</tui-list-view>
		</view>
		<tui-nomore text="到底啦~"></tui-nomore>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
						imgSrc: "../../static/images/favorite/1.jpg",
						title: "真无线蓝牙耳机 半入耳式耳机 音乐耳机 通用苹果华为小米手机",
						footerText: "2021-05-20 23:25:46",
						num: "+99"
					},
					{
						imgSrc: "../../static/images/favorite/2.jpg",
						title: "真无线蓝牙耳机 半入耳式耳机 音乐耳机 通用苹果华为小米手机",
						footerText: "2021-05-20 23:25:46",
						num: "+599"
					},
					{
						imgSrc: "../../static/images/favorite/3.jpg",
						title: "真无线蓝牙耳机 半入耳式耳机 音乐耳机 通用苹果华为小米手机",
						footerText: "2021-05-20 23:25:46",
						num: "-20"
					},
					{
						imgSrc: "../../static/images/favorite/4.jpg",
						title: "真无线蓝牙耳机 半入耳式耳机 音乐耳机 通用苹果华为小米手机",
						footerText: "2021-05-20 23:25:46",
						num: "+322"
					}
				]
			}
		},

		methods: {
			// 点击进入详情
			clickDetails() {
				uni.navigateTo({
					url: '/pages/order/orderDetails?state=3',
				});
			}
		},
	}
</script>

<style scoped>
	page {
		background-color: #F7F7F7;
	}

	.con_content {
		margin-top: 10rpx;
	}

	.content_main {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.main_img {
		height: 150rpx;
		/* width: 150rpx; */
		width: 35%;
	}

	.img_size {
		height: 100%;
		width: 100%;
	}

	.main_text {
		margin-left: 10rpx;
		margin: 0 10rpx;
		color: #000000;
	}

	.text_footer {
		font-size: 12rpx;
		margin-top: 30rpx;
		color: #adadad;
	}

	.main_num {
		color: #fe712b;
		font-size: 36rpx
	}
</style>
