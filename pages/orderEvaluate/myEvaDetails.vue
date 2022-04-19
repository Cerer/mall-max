<!-- 评价详情evaluateDetails -->
<template>
	<view class="container">

		<!-- 头部名称 -->
		<view class="con-head">
			<view class="con-head-left">
				<image class="ch-left-imag" src="/static/images/fans/3.jpg"></image>
				<view class="ch-left-text">蒹**霜</view>
			</view>
			<text class="con-head-right">已好评</text>
		</view>

		<!-- 评价信息 -->
		<view class="con-center">
			<view class="con-center-time">03-11 200人点赞</view>
			<view class="con-center-evaluate">不错很好,很喜欢</view>
			<view class="con-center-imgBox">
				<image class="cc-imgBox-imag" src="../../static/images/favorite/2.jpg"></image>
				<image class="cc-imgBox-imag" src="../../static/images/favorite/2.jpg"></image>
				<image class="cc-imgBox-imag" src="../../static/images/favorite/2.jpg"></image>
				<image class="cc-imgBox-imag" src="../../static/images/favorite/2.jpg"></image>
			</view>

			<tui-list-view style="margin-top: 40rpx;">
				<tui-list-cell>
					<view class="cc-tui-text">购买了 颜色分类:粉色</view>
					<view class="cc-tui-centent" @click="clickProDetails">
						<view style="width: 180rpx;height: 180rpx;">
							<image class="cc-tc-imag" src="/static/images/favorite/2.jpg"></image>
						</view>

						<view class="cc-tc-attr">
							<text class="cc-tc-attr-title">1瓶|香水香水香水香水香水香水香水香水香水香水香水</text>
							<text class="cc-tc-attr-price">￥1308.00</text>
						</view>
					</view>
				</tui-list-cell>
			</tui-list-view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},

		methods: {
			// 点击进入商品详情
			clickProDetails() {
				uni.navigateTo({
					url: '/pages/product/product',
				});
			},
		},
	}
</script>

<style scoped lang="scss">
	page {
		background-color: $page-bg-color;
	}

	.con-head {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx;
		background-color: #FFFFFF;
	}

	.con-head-left {
		display: flex;
		align-items: center;
	}

	.ch-left-imag {
		height: 80rpx;
		width: 80rpx;
		border-radius: 50%;
	}

	.ch-left-text {
		margin-left: 10rpx;
	}

	.con-head-right {
		font-size: 26rpx;
		color: #fa436a;
	}

	.con-center {
		background-color: #FFFFFF;
	}

	.con-center-time {
		font-size: 26rpx;
		color: #909399;
		padding: 20rpx;
	}

	.con-center-evaluate {
		padding: 0 20rpx 20rpx;
		font-size: 28rpx;
	}

	.con-center-imgBox {
		// height: 500rpx;
		width: 94%;
		margin-top: 20rpx;
	}

	.cc-imgBox-imag {
		height: 500rpx;
		width: 100%;
		margin-left: 3%;
	}

	.cc-tui-text {
		letter-spacing: 3rpx;
		color: #909399;
	}

	.cc-tui-centent {
		background-color: $page-bg-color;
		display: flex;
		justify-content: space-between;
		margin-top: 20rpx;
	}

	.cc-tc-imag {
		width: 180rpx;
		height: 180rpx;
	}

	.cc-tc-attr {
		display: flex;
		flex-direction: column;
		padding: 10rpx;
		line-height: 45rpx;

	}

	.cc-tc-attr-title {
		letter-spacing: 3rpx;
	}

	.cc-tc-attr-price {
		margin-top: 30rpx;
		color: #f0550e;
	}
</style>
