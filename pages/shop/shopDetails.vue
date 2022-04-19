<!-- 店铺信息shopDetails -->
<template>
	<view class="container">
		<!-- 头部 -->
		<view class="tui-shop__box">
			<view class="tui-shop__info tui-common__box">
				<image src="../../static/images/follow/2.jpg" class="tui-logo"></image>
				<view class="tui-shop__desc">
					<view class="tui-shop__name">
						枚苏旗舰店
					</view>
					<view class="tui-shop__rate">
						<view class="tui-shop__follow">3.4万人关注</view>
					</view>
				</view>
				<view class="tui-btn__follow" @click="clickFollow">
					<tui-form-button background="#fa436a" radius="50rpx" :size="24" width="116rpx" height="48rpx">
						<tui-icon v-if="isFollow" name="like" color="#fff" :size="24" unit="rpx"></tui-icon>
						<text class="tui-follow__text">{{ isFollow ? '关注' : '已关注'}}</text>
					</tui-form-button>
				</view>
			</view>
		</view>

		<view class="tui-score__bg"></view>

		<view class="tui-info__box">
			<view class="tui-score__box tui-common__box">
				<view class="tui-flex__center">
					<text>店铺星级</text>
					<view class="tui-rate__box">
						<tui-rate :current="5" :score="0.6" disabled :size="12" active="#fa436a"></tui-rate>
					</view>
				</view>

				<view class="tui-flex__center">
					<text>用户评价</text>
					<view class="tui-score tui-color__red">
						<text>9.90分</text>
						<text>高</text>
					</view>
				</view>

				<view class="tui-flex__center">
					<text>物流履约</text>
					<view class="tui-score tui-color__red">
						<text>9.99分</text>
						<text>高</text>
					</view>
				</view>

				<view class="tui-flex__center">
					<text>售后服务</text>
					<view class="tui-score tui-color__green">
						<text>8.95分</text>
						<text>低</text>
					</view>
				</view>
			</view>

			<!-- 店铺二维码 -->
			<view class="tui-common__box tui-top__20">
				<tui-list-cell arrow unlined @click="qrcode">店铺二维码</tui-list-cell>
			</view>

			<view class="tui-common__box tui-top__20">
				<tui-list-cell :hover="false">
					<view class="tui-flex">
						<text class="tui-text__shrink">店铺简介</text>
						<text class="tui-sub__info">化妆品旗舰店！</text>
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false">
					<view class="tui-flex">
						<text class="tui-text__shrink">所在地区</text>
						<text class="tui-sub__info">广东广州市</text>
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false" unlined>
					<view class="tui-flex">
						<text class="tui-text__shrink">开店时间</text>
						<text class="tui-sub__info">2019-08-20</text>
					</view>
				</tui-list-cell>
			</view>
			
			<view class="tui-common__box tui-top__20">
				<tui-list-cell :hover="false" unlined>
					<view class="tui-flex">
						<text class="tui-text__shrink">销售品牌</text>
						<text class="tui-sub__info">VAKADA</text>
					</view>
				</tui-list-cell>
			</view>
			
			<view class="tui-common__box tui-top__20" @tap="product">
				<tui-list-cell color="#fa436a" unlined arrow>
					去看看全部商品
				</tui-list-cell>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isFollow: true
			}
		},

		methods: {
			// 关注
			clickFollow() {
				this.isFollow = !this.isFollow;
				let title = '';
				if (this.isFollow) {
					title = '取消关注'
				} else {
					title = '已关注'
				}
				uni.showToast({
					title: title,
					icon: 'none'
				});
			},

			// 店铺二维码
			qrcode() {
				uni.previewImage({
					urls: ['/static/images/shop/qrcode.jpg']
				});
			},
			
			// 进入商品列表
			product(){
				uni.navigateTo({
					url: '/pages/product/list',
				});
			}
		},
	}
</script>

<style scoped>
	page {
		background-color: #f8f8f8;
	}

	.tui-shop__box {
		width: 100%;
		background-color: #18293d;
		padding: 20rpx 25rpx;
		box-sizing: border-box;
	}

	.tui-shop__info {
		width: 100%;
		display: flex;
		align-items: center;
		padding: 30rpx;
	}

	.tui-common__box {
		background-color: #FFFFFF;
		border-radius: 12rpx;
		box-sizing: border-box;
		box-shadow: 0 3rpx 20rpx rgba(183, 183, 183, 0.1);
		overflow: hidden;
	}

	.tui-logo {
		width: 80rpx;
		height: 80rpx;
		border-radius: 6rpx;
		display: block;
		margin-right: 20rpx;
		flex-shrink: 0;
		border-radius: 50%;
	}

	.tui-shop__name {
		width: 420rpx;
		font-size: 30rpx;
		font-weight: 500;
		padding-bottom: 6rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.tui-shop__rate {
		display: flex;
		align-items: center;
	}

	.tui-shop__follow {
		font-size: 25rpx;
		transform: scale(0.8);
		transform-origin: 0 center;
	}

	.tui-btn__follow {
		margin-left: auto;
	}

	.tui-follow__text {
		padding-left: 6rpx;
	}

	.tui-score__bg {
		width: 100%;
		height: 100rpx;
		background: linear-gradient(to bottom, #18293d, #fafafa);
	}

	.tui-info__box {
		width: 100%;
		padding: 0 25rpx 100rpx;
		box-sizing: border-box;
		margin-top: -100rpx;
	}

	.tui-score__box {
		width: 100%;
		padding: 10rpx 30rpx 30rpx;
	}

	.tui-flex__center {
		display: flex;
		align-items: center;
		margin-top: 20rpx;
	}

	.tui-rate__box {
		display: flex;
		align-items: center;
		border-radius: 20px;
		padding: 0 6rpx;
		margin-right: 12rpx;
		background-color: rgba(83, 83, 83, .1);
		line-height: 13px;
	}

	.tui-flex__center text {
		font-size: 24rpx;
		color: #999;
		padding-right: 50rpx;
	}

	.tui-score text {
		padding-right: 25rpx;
	}

	.tui-color__red text {
		color: #fa436a;
	}

	.tui-color__green text {
		color: #19be6b;
	}

	.tui-top__20 {
		margin-top: 20rpx;
	}

	.tui-flex {
		display: flex;
	}

	.tui-text__shrink {
		flex-shrink: 0;
	}

	.tui-sub__info {
		color: #999;
		padding-left: 40rpx;
		word-break: break-all;

	}
</style>
