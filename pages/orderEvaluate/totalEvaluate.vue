<!-- 商品评价totalEvaluate -->
<template>
	<view class="container">
		<view class="tui-header">商品好评度 <text>100%</text></view>
		<view class="tui-attr-box">
			<view class="tui-attr-item" :class="navTab == 1 ? 'tui-attr-active' : ''" @click="switchTab(1)">
				全部<text>{{ getNum(1) }}</text>
			</view>
			<view class="tui-attr-item" :class="navTab ==2 ? 'tui-attr-active' : ''" @click="switchTab(2)">
				最新
			</view>
			<view class="tui-attr-item" :class="navTab == 3 ? 'tui-attr-active' : ''" @click="switchTab(3)">
				好评<text>{{ getNum(3) }}</text>
			</view>
			<view class="tui-attr-item" :class="navTab == 4 ? 'tui-attr-active' : ''" @click="switchTab(4)">
				差评<text>{{ getNum(4) }}</text>
			</view>
			<view class="tui-attr-item" :class="navTab ==5 ? 'tui-attr-active' : ''" @click="switchTab(5)">
				有图<text>{{ getNum(5) }}</text>
			</view>
			<view class="tui-attr-item" :class="navTab == 6 ? 'tui-attr-active' : ''" @click="switchTab(6)">
				追加评价<text>{{ getNum(6) }}</text>
			</view>
		</view>

		<view class="tui-evaluate__box" v-for="(item,index) in evaluateList" :key="index">
			<view class="tui-flex__center">
				<image src="/static/images/fans/2.jpg" class="tui-avatar"></image>
				<view class="tui-nickname">{{ item.nickname }}</view>
			</view>

			<view class="tui-content__box">
				<view class="tui-rate__box">
					<tui-rate :current="item.star" :size="14" active="#fa436a"></tui-rate>
					<text>{{ item.time }}</text>
				</view>

				<view class="tui-desc">
					{{ item.remark }}
				</view>

				<view class="tui-img__box" v-if="item.imgs && item.imgs.length>0">
					<block v-for="(src,subIndex) in item.imgs" :key="subIndex">
						<image @tap.stop="previewImage(index,subIndex)" :class="{'tui-image':item.imgs.length===1}"
							:src="src" :mode="item.imgs.length===1?'widthFix':'aspectFill'"></image>
					</block>
				</view>

				<view class="tui-op__box tui-flex__center">
					<view class="tui-specs">{{ item.specs }}</view>
					<view class="tui-flex__center">
						<view class="tui-op-item" @click="likeTap(item)">
							<text :class="{'tui-color-red':item.zan}">{{item.num}}</text>
							<tui-icon :name="item.zan?'agree-fill':'agree'" :size="34" unit="rpx"
								:color="item.zan?'#fa436a':'#333'"></tui-icon>
						</view>
						<view class="tui-op-item" @tap="totalEvaDetail">
							<text>1</text>
							<tui-icon name="message" :size="40" unit="rpx" color="#333"></tui-icon>
						</view>
					</view>
				</view>
			</view>
		</view>

		<tui-divider gradual width="50%">没有更多了</tui-divider>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				navTab: 1,

				evaluateList: [{
					nickname: 'zmh1111',
					time: '2020-06-21',
					remark: '收到很喜欢，很喜欢，香味很好闻',
					specs: "500ml",
					star: 5,
					imgs: [
						'/static/images/favorite/2.jpg',
						'/static/images/favorite/2.jpg',
						'/static/images/favorite/2.jpg',
						'/static/images/favorite/2.jpg',
						'/static/images/favorite/2.jpg'
					],
					zan: false,
					num: 2,
					isPraise: true,
					isAddReview: false
				}, {
					nickname: 'zmh2222',
					time: '2020-07-21',
					remark: '不错，很好，好喝不错，很好，好喝不错，很好，好喝不错，很好，好喝不错，很好，好喝不错，很好，好喝',
					specs: "100g/袋",
					star: 4,
					imgs: ['/static/images/favorite/1.jpg'],
					zan: true,
					num: 12,
					isPraise: true,
					isAddReview: true
				}, {
					nickname: 'zmh3333',
					time: '2020-08-21',
					remark: '收到很喜欢，很喜欢收到很喜欢，很喜欢收到很喜欢，很喜欢收到很喜欢，很喜欢收到很喜欢，很喜欢收到很喜欢，很喜欢',
					specs: "",
					star: 5,
					imgs: [],
					zan: false,
					num: 15,
					isPraise: false,
					isAddReview: true
				}, {
					nickname: 'zmh4444',
					time: '2020-09-21',
					remark: '收到很喜欢，很喜欢收到很喜欢，很喜欢收到很喜欢，很喜欢收到很喜欢，很喜欢收到很喜欢，很喜欢',
					specs: "12瓶/箱",
					star: 5,
					imgs: [
						'/static/images/favorite/3.jpg',
						'/static/images/favorite/3.jpg',
						'/static/images/favorite/3.jpg',
					],
					zan: false,
					num: 19,
					isPraise: false,
					isAddReview: false
				}, {
					nickname: 'zmh5555',
					time: '2020-10-21',
					remark: '收到很喜欢，很喜欢收到很喜欢，很喜欢收到很喜欢，很喜欢收到很喜欢，很喜欢收到很喜欢，很喜欢',
					specs: "500g/箱",
					star: 5,
					imgs: [
						'/static/images/favorite/4.jpg',
						'/static/images/favorite/4.jpg',
					],
					zan: false,
					num: 1,
					isPraise: true,
					isAddReview: false
				}],

				// 过滤数据
				filterList: []

			}
		},

		onLoad() {
			this.filterList = JSON.parse(JSON.stringify(this.evaluateList));
		},

		methods: {
			// 处理数据
			loadData() {

			},

			// 计算数据
			getNum(type) {
				let num = 0;
				if (type === 1) {
					num = this.filterList.length > 0 && this.filterList.length < 99 ? this.filterList.length : '99+';
				} else if (type === 3) {
					let praiseNum = this.filterList.filter(i => i.isPraise == true).length;
					num = praiseNum > 0 && praiseNum < 99 ? praiseNum : '99+';
				} else if (type === 4) {
					let poorRatingNum = this.filterList.filter(i => i.isPraise == false).length;
					num = poorRatingNum > 0 && poorRatingNum < 99 ? poorRatingNum : '99+';
				} else if (type === 5) {
					let imgNum = this.filterList.filter(i => i.imgs && i.imgs.length > 0).length;
					num = imgNum > 0 && imgNum < 99 ? imgNum : '99+';
				} else if (type === 6) {
					let addReviewNum = this.filterList.filter(i => i.isAddReview == true).length;
					num = addReviewNum > 0 && addReviewNum < 99 ? addReviewNum : '99+';
				}

				return num;
			},

			// tab切换
			switchTab(ctype) {
				if (this.navTab != ctype) {
					this.navTab = ctype
				}

				let arr = this.filterList.filter(i => {
					if (ctype === 1) {
						return i;
					} else if (ctype === 2) {

					} else if (ctype === 3) {
						if (i.isPraise) {
							return i;
						}
					} else if (ctype === 4) {
						if (!i.isPraise) {
							return i;
						}
					} else if (ctype === 5) {
						if (i.imgs && i.imgs.length > 0) {
							return i;
						}
					} else if (ctype === 6) {
						if (i.isAddReview) {
							return i;
						}
					}
				});

				this.evaluateList = arr;

			},

			// 预览图片
			previewImage(index, current) {
				let imgs = this.evaluateList[index].imgs
				let urls = imgs.map(item => {
					return item
				})
				uni.previewImage({
					current: current,
					urls: urls
				})
			},

			//点赞
			likeTap(item) {
				item.zan = !item.zan
				if (item.zan == true) {
					item.num++
				} else if (item.zan == false) {
					item.num--
				}
				this.$forceUpdate()
			},
			
			// 商品评价详情
			totalEvaDetail(){
				uni.navigateTo({
					url: '/pages/orderEvaluate/totalEvaDetail',
				});
			},
		},
	}
</script>

<style scoped lang="scss">
	page {
		background-color: $page-bg-color;
	}

	.tui-header {
		font-size: 24rpx;
		color: #999;
		padding: 16rpx 30rpx;
	}

	.tui-header text {
		font-weight: bold;
		padding-left: 12rpx;
		color: #333;
	}

	.tui-attr-box {
		width: 100%;
		padding: 24rpx 25rpx 0;
		box-sizing: border-box;
		font-size: 0;
		background-color: #fff;
		border-radius: 24rpx;
	}

	.tui-attr-item {
		max-width: 100%;
		min-width: 128rpx;
		height: 64rpx;
		display: -webkit-inline-flex;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		background: #fcedea;
		padding: 0 26rpx;
		box-sizing: border-box;
		border-radius: 32rpx;
		margin-right: 20rpx;
		margin-bottom: 20rpx;
		font-size: 26rpx;
		border: 1rpx solid #fcedea;
	}

	.tui-attr-active {
		color: #fa436a;
		border: 1rpx solid #fa436a;
	}

	.tui-attr-item text {
		font-weight: bold;
		padding-left: 12rpx;
	}

	.tui-evaluate__box {
		width: 100%;
		padding: 25rpx;
		box-sizing: border-box;
		background-color: #ffffff;
		box-shadow: 0 3rpx 20rpx rgba(183, 183, 183, 0.1);
		overflow: hidden;
		margin-top: 20rpx;
		border-radius: 24rpx;
	}

	.tui-flex__center {
		display: flex;
		align-items: center;
	}

	.tui-avatar {
		width: 64rpx;
		height: 64rpx;
		border-radius: 50%;
	}

	.tui-nickname {
		font-size: 28rpx;
		padding-left: 12rpx;
	}

	.tui-content__box {
		width: 100%;
		padding: 0 30rpx;
		box-sizing: border-box;
	}

	.tui-rate__box {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 24rpx;
		color: #999;
		padding: 24rpx 0;
	}

	.tui-desc {
		font-size: 28rpx;
		word-break: break-all;
		text-align: justify;
	}

	.tui-img__box {
		width: 100%;
		font-size: 0;
		padding-top: 4rpx;
	}

	.tui-img__box image {
		width: 200rpx;
		height: 200rpx;
		margin-right: 12rpx;
		margin-top: 12rpx;
	}

	.tui-image {
		width: 400rpx !important;
		height: auto;
	}

	.tui-op__box {
		width: 100%;
		padding-top: 24rpx;
		font-size: 24rpx;
		font-weight: 500;
		justify-content: space-between;
	}

	.tui-specs {
		font-size: 24rpx;
		color: #999;
		font-weight: 400;
		word-break: break-all;
	}

	.tui-op-item {
		display: flex;
		align-items: center;
		margin-left: 40rpx;
	}

	.tui-op-item text {
		padding-right: 6rpx;
	}

	.tui-color-red {
		color: #fa436a;
	}
</style>
