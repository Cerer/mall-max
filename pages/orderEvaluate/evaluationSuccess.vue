<!-- 评价成功evaluationSuccess -->
<template>
	<view class="container">
		<view class="con-head">
			<view class="con-head-title">
				<tui-icon name="circle-fill" :size="26" color="#fa436a"></tui-icon>
				<text class="title-tit">评价成功</text>
			</view>
			<view class="con-head-buttom">
				<tui-button @click="navTo('index')" type="gray" plain shape="circle" height="50rpx" width="160rpx"
					:size="26">
					返回首页
				</tui-button>
				<tui-button @click="navTo('myEvaluate')" class="buttom-btn" style="margin-left: 25rpx;" type="gray"
					plain shape="circle" height="50rpx" width="160rpx" :size="26">
					返回订单
				</tui-button>
			</view>
		</view>

		<view class="con-list">
			<view class="con-list-headTitle">这些宝贝也在等待评价哦</view>
			<view class="con-list-content" v-for="(item,index) of evaluateList" :key="index">
				<view class="content-imgBox">
					<image class="content-imgBox-img" :src="item.image"></image>
				</view>
				<view class="content-describe">
					<text class="content-des-title">{{ item.title }}</text>
					<text class="content-des-attr">{{ item.attr }}</text>
				</view>

				<view class="con-list-buttom">
					<button class="list-buttom-btn recom" @click="clickEvaluate(item)">评价</button>
				</view>
			</view>
		</view>

		<tui-nomore text="到底啦"></tui-nomore>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				evaluateList: [{
						image: "../../static/images/fans/1.jpg",
						title: "【狂欢价】短袖t恤男韩短袖t恤男韩短袖t恤男韩短袖t恤男韩",
						attr: "颜色:深灰色；尺码：XL"
					},
					{
						image: "../../static/images/fans/2.jpg",
						title: "【狂欢价】短袖t恤男韩短袖t恤男韩短袖t恤男韩短袖t恤男韩",
						attr: "颜色:深灰色；尺码：XL"
					},
					{
						image: "../../static/images/fans/3.jpg",
						title: "【狂欢价】短袖t恤男韩短袖t恤男韩短袖t恤男韩短袖t恤男韩",
						attr: "颜色:深灰色；尺码：XL"
					},
					{
						image: "../../static/images/fans/4.jpg",
						title: "【狂欢价】短袖t恤男韩短袖t恤男韩短袖t恤男韩短袖t恤男韩",
						attr: "颜色:深灰色；尺码：XL"
					},
					{
						image: "../../static/images/fans/5.jpg",
						title: "【狂欢价】短袖t恤男韩短袖t恤男韩短袖t恤男韩短袖t恤男韩",
						attr: "颜色:深灰色；尺码：XL"
					}
				]
			}
		},

		methods: {
			// 跳转到对应页面
			navTo(state) {
				if (state === "index") {
					uni.switchTab({
						url: "/pages/index/index"
					})
				} else {
					uni.navigateTo({
						url: "/pages/orderEvaluate/myEvaluate",
					})
				}
			},

			// 跳转到评价
			clickEvaluate(item) {
				uni.navigateTo({
					url: "/pages/orderEvaluate/orderEvaluate",
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	page {
		background-color: #F7F7F7;
	}

	.con-head {
		height: 350rpx;
		background: #F7F7F7;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.con-head-title {
		display: flex;
		align-items: center;
	}

	.title-tit {
		margin-left: 10rpx;
		font-size: 36rpx;
		font-weight: bold;
	}

	.con-head-buttom {
		display: flex;
		padding: 20rpx;
	}

	.con-list {
		background-color: #ffffff;
		margin: 20rpx;
		border-radius: 15rpx;
		padding: 10rpx;
	}

	.con-list-headTitle {
		font-weight: bold;
		padding: 20rpx 0;
	}

	.con-list-content {
		display: flex;
		justify-content: space-between;
		padding: 10rpx;
	}

	.content-imgBox {
		height: 150rpx;
		width: 150rpx;
	}

	.content-imgBox-img {
		height: 150rpx;
		width: 150rpx;
	}

	.content-describe {
		display: flex;
		flex-direction: column;
		padding: 10rpx;
	}

	.content-des-title {
		font-weight: bold;
		font-size: 26rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;

	}

	.content-des-attr {
		font-size: 28rpx;
		color: #a8a8a8;
	}

	.con-list-buttom {
		position: relative;
	}

	.list-buttom-btn {
		width: 160rpx;
		height: 60rpx;
		margin: 0;
		padding: 0;
		text-align: center;
		line-height: 60rpx;
		font-size: $font-sm + 2upx;
		color: $font-color-dark;
		background: #fff;
		border-radius: 100px;
		position: absolute;
		bottom: 0;
		right: 20rpx;

		&:after {
			border-radius: 100px;
		}

		&.recom {
			background: #fff9f9;
			color: $base-color;

			&:after {
				border-color: #f7bcc8;
			}
		}
	}
</style>
