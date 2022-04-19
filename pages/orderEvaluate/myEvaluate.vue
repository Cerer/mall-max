<!-- 我的评价myEvaluate -->
<template>
	<view class="container">

		<!-- 头部名称 -->
		<view class="con-head">
			<view class="con-head-left">
				<image class="ch-left-imag" src="/static/images/fans/3.jpg"></image>
				<view class="ch-left-text">蒹葭苍苍,白露为霜</view>
			</view>
			<view class="con-head-right">
				<tui-form-button background="#fa436a" color="#fa436a" :size="28" radius="50rpx" plain width="150rpx"
					height="52rpx" @click="clickEvaluate">写评价</tui-form-button>
			</view>
		</view>

		<!-- tab页 -->
		<tui-tabs :tabs="tabsList" :currentTab="currentTab" itemWidth="50%" sliderBgColor="#fa436a"
			selectedColor="#fa436a" @change="change"></tui-tabs>

		<!-- 具体评价信息 -->
		<view class="con-centent" v-for="(item,index) of totalList" :key="index">
			<view class="con-centent-head">
				<image class="ch-left-imag" src="/static/images/fans/3.jpg"></image>
				<!-- 分为匿名(蒹**霜)和实名(蒹葭苍苍,白露为霜) -->
				<view class="ch-left-text">{{ item.name }}</view>
			</view>
			<view class="con-centent-center">
				<view @click="clickEvaDetails(item)">
					<view class="cc-center-time">{{ item.time }}</view>
					<view class="cc-center-evaluate">{{ item.evaluate ? item.evaluate : '此用户没有填写评价。' }}</view>
					<view class="cc-center-evaImg" v-if="item.imgList && item.imgList.length > 0">
						<image v-for="(imag,i) of item.imgList" :key="i" :src="imag.imagSrc"></image>
					</view>
				</view>
				<view class="cc-center-product" @click="clickProDetails(item)">
					<image class="cc-cp-imag" :src="item.productImg"></image>
					<view class="cc-cp-attrCentent">
						<text class="cc-cp-attr">{{ item.productAttr }}</text>
						<text class="cc-cp-price">￥{{ item.productPrice }}</text>
					</view>
				</view>
			</view>
			<view class="con-centent-foot cc-center-time">
				点赞{{ item.like }}次 评论{{ item.review }}次
			</view>
		</view>

		<tui-nomore text="到底啦"></tui-nomore>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentTab: 0,
				tabsList: [{
						name: "全部"
					},
					{
						name: "有图"
					}
				],

				totalList: [{
						isAnonymity: true,
						name: "蒹葭苍苍,白露为霜",
						time: "03-11 饮品净含量:12瓶",
						evaluate: "",
						imgList: [],
						productImg: "/static/images/favorite/3.jpg",
						productAttr: "啤酒啤酒啤酒啤酒啤酒啤酒啤酒啤酒啤酒啤酒啤酒啤酒",
						productPrice: "228.00",
						like: 200,
						review: 1
					},
					{
						isAnonymity: false,
						name: "蒹**霜",
						time: "06-15 化妆品净含量:120g/mg",
						evaluate: "不错很好,很喜欢",
						imgList: [{
								imagSrc: "/static/images/favorite/2.jpg",
							},
							{
								imagSrc: "/static/images/favorite/2.jpg",
							},
							{
								imagSrc: "/static/images/favorite/2.jpg",
							}
						],
						productImg: "/static/images/favorite/2.jpg",
						productAttr: "1瓶|香水香水香水香水香水香水香水香水香水香水香水",
						productPrice: "1308.00",
						like: 333,
						review: 0
					},
					{
						isAnonymity: true,
						name: "蒹葭苍苍,白露为霜",
						time: "06-18 零食:500g/袋",
						evaluate: "很好吃很好吃非常好吃....",
						imgList: [],
						productImg: "/static/images/favorite/4.jpg",
						productAttr: "饼干饼干饼干饼干饼干饼干饼干饼干饼干饼干饼干饼干",
						productPrice: "28.00",
						like: 111,
						review: 0
					},
					{
						isAnonymity: false,
						name: "蒹**霜",
						time: "06-20 零食:500g/箱",
						evaluate: "不错很好,很喜欢",
						imgList: [{
								imagSrc: "/static/images/favorite/4.jpg",
							},
							{
								imagSrc: "/static/images/favorite/4.jpg",
							},
							{
								imagSrc: "/static/images/favorite/4.jpg",
							}
						],
						productImg: "/static/images/favorite/4.jpg",
						productAttr: "甜饼干甜饼干甜饼干甜饼干甜饼干甜饼干甜饼干甜饼干",
						productPrice: "1308.00",
						like: 666,
						review: 0
					},
				],

				// 过滤数据
				filterList: []
			}
		},

		onLoad() {
			this.loadData();
		},

		methods: {
			// 初始化数据
			loadData() {
				let self = this;
				self.filterList = JSON.parse(JSON.stringify(this.totalList));
			},

			// 切换tab
			change(e) {
				let self = this;
				self.currentTab = e.index;
				if (e.index === 1) {
					this.totalList = self.filterList.filter(i => i.imgList.length > 0);
				} else {
					this.totalList = self.filterList;
				}
			},

			// 点击进入待评价界面
			clickEvaluate() {
				uni.navigateTo({
					url: '/pages/order/order?state=3',
				});
			},

			// 点击进入商品详情
			clickProDetails(item) {
				uni.navigateTo({
					url: '/pages/product/product',
				});
			},

			// 点击进入评价详情
			clickEvaDetails(item) {
				uni.navigateTo({
					url: '/pages/orderEvaluate/myEvaDetails',
				});
			}
		},
	}
</script>

<style scoped lang="scss">
	page {
		background-color: $page-bg-color;
	}

	.con-head {
		background-color: #FFFFFF;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 30rpx;
		margin-bottom: 20rpx;
	}

	.con-head-left {
		display: flex;
		align-items: center;
	}

	.ch-left-imag {
		height: 60rpx;
		width: 60rpx;
		border-radius: 50%;
	}

	.ch-left-text {
		letter-spacing: 3rpx;
		margin-left: 10rpx;
	}

	.con-centent {
		background-color: #FFFFFF;
	}

	.con-centent-head {
		display: flex;
		align-items: center;
		padding: 20rpx;
	}

	.con-centent-center {
		display: flex;
		flex-direction: column;
	}

	.cc-center-time {
		margin: 20rpx;
		font-size: 26rpx;
		color: #909399;
		letter-spacing: 3rpx;
	}

	.cc-center-evaluate {
		margin: 0 20rpx 20rpx;
		font-size: 28rpx;
	}

	.cc-center-evaImg {
		height: 200rpx;
		width: 100%;
		margin: 20rpx;
		display: flex;

		image {
			height: 200rpx;
			width: 30%;
			margin-left: 10rpx;
		}
	}

	.cc-center-product {
		width: 94%;
		height: 160rpx;
		margin-left: 3%;
		display: flex;
		justify-content: space-between;
		background-color: $page-bg-color;
	}

	.cc-cp-imag {
		margin: 3px;
		height: 150rpx;
		width: 200rpx;
	}

	.cc-cp-attrCentent {
		font-size: 28rpx;
		color: #303133;
		margin: 15rpx 10rpx;
		line-height: 65rpx;
	}

	.cc-cp-attr {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
	}

	.cc-cp-price {
		color: #f0550e;
	}

	.con-centent-foot {
		margin: 20rpx;
		padding-bottom: 20rpx;
	}
</style>
