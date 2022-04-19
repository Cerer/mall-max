<!-- 商品评价详情totalevaDetail -->
<template>
	<view class="container">
		<view class="tui-evaluate__box">
			<!-- 我的评价信息start -->
			<view class="tui-flex__center">
				<image src="/static/images/fans/2.jpg" class="tui-avatar"></image>
				<view class="tui-nickname">关关雎鸠 在河之洲</view>
			</view>

			<view class="tui-content__box">
				<view class="tui-rate__box">
					<tui-rate :current="5" :size="14" active="#fa436a"></tui-rate>
					<text>2020-06-21</text>
				</view>
				<view class="tui-desc">
					收到大大惊喜了下，真的好可爱，很温顺，给兽医检查了下，猫很正常，店家打好了防疫针，这点很赞，很满意！
				</view>
				<view class="tui-img__box">
					<image src="/static/images/favorite/2.jpg" mode="aspectFill"></image>
					<image src="/static/images/favorite/2.jpg" mode="aspectFill"></image>
					<image src="/static/images/favorite/2.jpg" mode="aspectFill"></image>
				</view>
				<view class="tui-op__box tui-flex__center">
					<view class="tui-specs">双血统；公母随机</view>
				</view>
			</view>
		</view>
		<!-- 我的评价信息end -->

		<!-- 全部评论start -->
		<view class="tui-reply__box tui-scroll__box">
			<tui-list-cell padding="25rpx" :hover="false" :lineLeft="false">
				<view class="tui-reply__title tui-flex__center">
					全部评论<text>（18）</text>
				</view>
			</tui-list-cell>

			<block v-for="(item,index) in list" :key="index">
				<tui-list-cell padding="25rpx" :hover="false">
					<view class="tui-flex__center tui-pr__30">
						<image :src="item.pul" class="tui-avatar"></image>
						<view class="tui-nickname">{{item.nickname}}</view>
						<view class="tui-op-item" @click="likeTap(item)">
							<text :class="{'tui-color-red':item.zan}">{{item.num}}</text>
							<tui-icon :name="item.zan?'agree-fill':'agree'" :size="34" unit="rpx"
								:color="item.zan?'#fa436a':'#333'"></tui-icon>
						</view>
					</view>
					<view class="tui-content__box tui-reply__box">
						<view class="tui-quote__box" v-if="item.content.name">
							<text class="tui-color__link">{{item.content.name}}：</text>
							<text>{{item.content.reply}}</text>
						</view>
						<view class="tui-desc" @tap="reply(0,item)">
							{{item.reply2}}
						</view>
					</view>
				</tui-list-cell>
			</block>
		</view>
		<!-- 全部评论end -->

		<view class="tui-pullup__box">
			<tui-divider gradual width="50%">没有更多了</tui-divider>
		</view>

		<!-- 底部tool start -->
		<view class="tui-tabbar">
			<view class="tui-tabbar__box">
				<view class="tui-input tui-flex__center" @tap="reply(1)">说点什么呗~</view>
				<view class="tui-tabbar__right">
					<view class="tui-op-item" @click="buttonTap">
						<text :class="{'tui-color-red':buttomZan}">{{sum}}</text>
						<tui-icon :name="buttomZan?'agree-fill':'agree'" :size="34" unit="rpx"
							:color="buttomZan?'#fa436a':'#333'"></tui-icon>
					</view>
					<view class="tui-op-item" @tap="scrollToReply">
						<text>42</text>
						<tui-icon name="message" :size="40" unit="rpx" color="#333"></tui-icon>
					</view>
				</view>
			</view>
		</view>
		<!-- 底部tool end -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
					nickname: '卖家店小二',
					reply2: '感谢您的评价，祝您购猫愉快！如果觉得好可以推荐给身边的朋友哦！。',
					pul: '/static/images/fans/3.jpg',
					content: {
						name: '',
						reply: '',
					},
					num: 12,
					zan: false
				}, {
					nickname: 'AS***2',
					content: {
						name: '',
						reply: '',
					},
					reply2: '猫咪很活泼可爱，刚开始回来有点怕人，不知道是否健康!',
					pul: '/static/images/fans/1.jpg',
					num: 33,
					zan: true
				}, {
					nickname: 'Mocha',
					content: {
						name: 'AS***2',
						reply: '猫咪很活泼可爱，刚开始回来有点怕人，不知道是否健康！',
					},
					reply2: '发货非常快，猫咪很可爱，健康，服务非常好。',
					pul: '/static/images/fans/2.jpg',
					num: 17,
					zan: false
				}, {
					nickname: 'Mocha',
					content: {
						name: 'AS***2',
						reply: '猫咪很活泼可爱，刚开始回来有点怕人，不知道是否健康！',
					},
					reply2: '发货非常快，猫咪很可爱，健康，服务非常好。',
					pul: '/static/images/fans/2.jpg',
					num: 52,
					zan: false
				}],

				top: 100,
				sum: 66,
				buttomZan: false
			}
		},

		onShow() {
			if (uni.getStorageSync('list')) {
				this.list = uni.getStorageSync('list')
			}
		},

		onLoad() {
			//请求数据成功之后执行
			setTimeout(() => {
				const query = uni.createSelectorQuery().in(this);
				query.select('.tui-scroll__box').boundingClientRect((res) => {
					if (res) {
						this.top = res.top;
					}
				}).exec()
			}, 1000)
		},

		methods: {
			//列表点赞
			likeTap(item) {
				item.zan = !item.zan
				if (item.zan == true) {
					item.num++
				} else if (item.zan == false) {
					item.num--
				}
				this.$forceUpdate()
			},

			// 点击回复
			reply(e, item) {
				if (e == 0) {
					this.tui.href('/pages/evaluateReply/evaluateReply?nickname=' + item.nickname + '&reply2=' + item
						.reply2)
				} else {
					this.tui.href('/pages/evaluateReply/evaluateReply')
				}

				uni.setStorageSync('list', this.list)
			},

			//底部点赞
			buttonTap() {
				this.buttomZan = !this.buttomZan
				if (this.buttomZan == true) {
					this.sum++
				} else if (this.buttomZan == false) {
					this.sum--
				}
				this.$forceUpdate()
			},

			// 点击滑倒底部
			scrollToReply() {
				uni.pageScrollTo({
					scrollTop: this.top,
					duration: 100
				})
			},
		},
	}
</script>

<style scoped lang="scss">
	page {
		background-color: $page-bg-color;
	}

	.container {
		padding-bottom: 100rpx;
	}

	.tui-evaluate__box {
		width: 100%;
		padding: 25rpx;
		box-sizing: border-box;
		background-color: #ffffff;
		box-shadow: 0 3rpx 20rpx rgba(183, 183, 183, 0.1);
		overflow: hidden;
		margin-top: 20rpx;
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
		padding: 0 30rpx 0 76rpx;
		box-sizing: border-box;
	}

	.tui-rate__box {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 24rpx;
		color: #999;
		padding: 12rpx 0 20rpx;
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
		width: 180rpx;
		height: 180rpx;
		margin-right: 12rpx;
		margin-top: 12rpx;
	}

	.tui-op__box {
		width: 100%;
		padding-top: 24rpx;
	}

	.tui-specs {
		font-size: 24rpx;
		color: #999;
		font-weight: 400;
		word-break: break-all;
	}

	.tui-reply__box {
		padding-top: 20rpx;
	}

	.tui-reply__title {
		font-size: 30rpx;
		font-weight: bold;
	}

	.tui-reply__title text {
		font-size: 26rpx;
		font-weight: 400;
		color: #999;
	}

	.tui-pr__30 {
		padding-right: 30rpx;
	}

	.tui-op-item {
		display: flex;
		align-items: center;
		margin-left: auto;
		flex-shrink: 0;
		font-size: 24rpx;
	}

	.tui-op-item text {
		padding-right: 6rpx;
	}

	.tui-color-red {
		color: #fa436a;
	}

	.tui-quote__box {
		background-color: #F8F8F8;
		color: #999;
		font-size: 24rpx;
		padding: 16rpx;
		box-sizing: border-box;
		border-radius: 4rpx;
		margin-bottom: 20rpx;
	}

	.tui-color__link {
		color: #586c94;
	}

	.tui-pullup__box {
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
	}

	.tui-tabbar {
		width: 100%;
		height: 100rpx;
		position: fixed;
		z-index: 996;
		left: 0;
		bottom: 0;
		background-color: #fff;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
		box-sizing: content-box;
	}

	.tui-tabbar::before {
		content: ' ';
		width: 100%;
		border-top: 1px solid #b2b2b2;
		position: absolute;
		top: 0;
		left: 0;
		transform: scaleY(0.5) translateZ(0);
		transform-origin: 0 0;
		z-index: 3;
	}

	.tui-tabbar__box {
		width: 100%;
		height: 100rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.tui-input {
		width: 60%;
		height: 70rpx;
		background-color: #F8F8F8;
		color: #999;
		font-size: 24rpx;
		border-radius: 70px;
		padding: 0 20rpx;
		box-sizing: border-box;
	}

	.tui-tabbar__right {
		width: 40%;
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.tui-tabbar__right .tui-op-item {
		width: 50%;
		justify-content: flex-end;
	}
</style>
