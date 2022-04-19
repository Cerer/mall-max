<!-- 详情 -->
<template>
	<view class="container">
		<view class="con-head">
			<view class="con-head-left">
				<view class="ch-left-imgBox">
					<image src="/static/images/fans/3.jpg" mode=""></image>
				</view>
				<text>关关雎鸠</text>
			</view>
			<tui-button type="gray" plain height="45rpx" width="130rpx" shape="circle" :size="26">已关注</tui-button>
		</view>

		<!-- 轮播图 -->
		<view class="con-banner">
			<swiper class="con-banner-swiper" :circular="true" @change="bannerList">
				<swiper-item v-for="(item, index) in banner" :key="index">
					<image :src="item" class="con-banner-image" mode="scaleToFill" />
				</swiper-item>
			</swiper>
			<tui-swiper-dot :count="count" :current="current" :left="left" :right="right" :bottom="bottom"
				activeBgColor="#fa436a">
			</tui-swiper-dot>
		</view>

		<tui-list-view>
			<tui-list-cell class="con-evaluate" :hover="false" :arrow="false">
				<text>不错很好不错很好不错很好不错很好不错很好</text>
				<text style="font-size: 24rpx;color: #909399;">2019-08-21</text>
			</tui-list-cell>

			<tui-list-cell :hover="false" :arrow="false">
				<text style="font-weight: bold;">评论<text>（18）</text></text>
			</tui-list-cell>
		</tui-list-view>

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

		<view class="tui-pullup__box">
			<tui-divider gradual width="50%">没有更多了</tui-divider>
		</view>

		<!-- 底部tool -->
		<view class="tui-tabbar">
			<view class="tui-tabbar__box">
				<view class="tui-input tui-flex__center" @tap="reply(1)">说点什么呗~</view>
				<view class="tui-tabbar__right">
					<view class="tui-op-item" @click="buttonTap">
						<text :class="{'tui-color-red':buttomZan}">{{sum}}</text>
						<tui-icon :name="buttomZan?'agree-fill':'agree'" :size="34" unit="rpx"
							:color="buttomZan?'#EB0909':'#333'"></tui-icon>
					</view>
					<view class="tui-op-item" @tap="scrollToReply">
						<text>42</text>
						<tui-icon name="message" :size="40" unit="rpx" color="#333"></tui-icon>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				banner: [
					'/static/images/product/pic1.jpg',
					'/static/images/product/pic2.jpg',
					'/static/images/product/pic3.jpg',
					'/static/images/product/pic1.jpg',
					'/static/images/product/pic2.jpg'
				],
				count: 0,
				current: 0,
				left: "0",
				right: "auto",
				bottom: "68%",

				list: [{
					nickname: '关关',
					reply2: '618要来了618要来了618要来了',
					pul: '/static/images/fans/1.jpg',
					content: {
						name: '',
						reply: '',
					},
					num: 12,
					zan: false
				}, {
					nickname: '珍妮',
					content: {
						name: '',
						reply: '',
					},
					reply2: '是吗，还要多久',
					pul: '/static/images/fans/2.jpg',
					num: 33,
					zan: true
				}, {
					nickname: '窈窕淑女',
					content: {
						name: '珍妮',
						reply: '开心开心开心开心开心开心开心开心开心开心',
					},
					reply2: '开心开心开心开心开心开心开心开心开心开心',
					pul: '/static/images/fans/1.jpg',
					num: 17,
					zan: false
				}, {
					nickname: '窈窕淑女',
					content: {
						name: '珍妮',
						reply: 'happy happy happy happy happy',
					},
					reply2: 'happy happy happy happy happy',
					pul: '/static/images/fans/1.jpg',
					num: 52,
					zan: false
				}],
				top: 100,
				sum: 22,
				buttomZan: false,
			}
		},
		
		onShow() {
			if (uni.getStorageSync('list')) {
				this.list = uni.getStorageSync('list')
			}
		},
		onLoad() {
			this.count = this.banner.length;
			
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
			// 轮播滑动
			bannerList(e) {
				this.current = e.detail.current;
			},

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

			// 点击回复往上划100
			scrollToReply() {
				uni.pageScrollTo({
					scrollTop: this.top,
					duration: 100
				})
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
			}
		},
	}
</script>

<style scoped>
	.con-head {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 20rpx;
	}

	.con-head-left {
		display: flex;
		align-items: center;
	}

	.ch-left-imgBox {
		height: 80rpx;
		width: 80rpx;
		margin-right: 5rpx;
	}

	.ch-left-imgBox image {
		height: 80rpx;
		width: 80rpx;
		border-radius: 50%;
	}

	.con-banner {
		height: 350rpx;
		margin: 20rpx;
	}

	.con-banner-swiper {
		height: 350rpx;
	}

	.con-banner-image {
		width: 100%;
		height: 350rpx;
	}

	.con-evaluate {
		display: flex;
		flex-direction: column;
		line-height: 50rpx;
	}

	.tui-flex__center {
		display: flex;
		align-items: center;
	}

	.tui-pr__30 {
		padding-right: 30rpx;
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

	.tui-content__box {
		width: 100%;
		padding: 0 30rpx 0 76rpx;
		box-sizing: border-box;
	}

	.tui-reply__box {
		padding-top: 20rpx;
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

	.tui-desc {
		font-size: 28rpx;
		word-break: break-all;
		text-align: justify;
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
