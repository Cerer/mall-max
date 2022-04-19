<!-- 粉丝详情页fansDetails -->
<template>
	<view class="container">
		<view class="con-head">
			<view class="con-head-top">
				<view class="con-head-top-img">
					<image src="../../static/images/fans/1.jpg" class="con-head-top-img-size"></image>
				</view>

				<view class="con-head-top-title">你的心头肉</view>
			</view>

			<view class="con-head-bottom">
				<view class="con-head-bottom-tool">
					<view class="tool-follow" @click="nvaTo('/pages/follow/follow')">
						<view>4</view>
						<view style="font-size: 28rpx;">关注</view>
					</view>
					<view class="tool-fans" @click="nvaTo('/pages/fans/fans')">
						<view>1</view>
						<view style="font-size: 28rpx;">粉丝</view>
					</view>
				</view>

				<view class="con-head-bottom-button" @click="clickFollow">
					<tui-form-button plain :background="bcColor" :color="fsColor" width="130rpx" height="50rpx"
						radius="50rpx" :size="28">
						{{ isFollow ? '已关注' : '+ 关注' }}
					</tui-form-button>
				</view>
			</view>
		</view>

		<view class="con-list">
			<uni-row class="demo-uni-row">
				<uni-col :span="12" v-for="(item,index) of detailsList" :key='index' >
					<view class="con-list-content" @click="clickEvaluate">
						<view class="content-img">
							<image class="content-img-size" :src="item.imgSrc" mode=""></image>
						</view>
						<view class="content-comment">{{ item.comment }}</view>
						<view class="content-time">{{ item.time }} 发布</view>
					</view>
				</uni-col>
			</uni-row>
		</view>

		<!-- 到底提醒 -->
		<tui-nomore text="到底啦"></tui-nomore>

		<!-- 取消关注弹框 -->
		<tui-modal :show="isModal" width="70%" content="确定取消关注？" :button="button" color="#4b4b4b" @click="confirmOK">
		</tui-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 关注按钮背景颜色
				bcColor: "#fa436a",

				// 关注按钮字体颜色
				fsColor: "#fa436a",

				detailsList: [{
						imgSrc: "../../static/images/favorite/2.jpg",
						comment: "很不错，质量很好，很喜欢很喜欢很喜欢很喜欢很喜欢很喜欢很喜欢很喜欢很喜欢很喜欢",
						time: "2019-12-29"
					},
					{
						imgSrc: "../../static/images/favorite/3.jpg",
						comment: "很不错，质量很好，很喜欢很喜欢很喜欢很喜欢很喜欢很喜欢很喜欢很喜欢很喜欢很喜欢",
						time: "2020-7-8"
					},
					{
						imgSrc: "../../static/images/favorite/4.jpg",
						comment: "很不错，质量很好，很喜欢很喜欢很喜欢很喜欢很喜欢很喜欢很喜欢很喜欢很喜欢很喜欢",
						time: "2010-10-29"
					},
					{
						imgSrc: "../../static/images/favorite/5.jpg",
						comment: "很不错，质量很好，很喜欢很喜欢很喜欢很喜欢很喜欢很喜欢很喜欢很喜欢很喜欢很喜欢",
						time: "2021-6-11"
					}
				],

				// 判断是否显示取消关注弹框
				isModal: false,

				// 取消关注弹框按钮信息
				button: [{
						text: "取消",
						type: "gray",
						plain: true
					},
					{
						text: "确定",
						type: "primary",
						plain: false
					}
				],

				// 是否显示关注icon
				isFollow: true
			}
		},

		methods: {
			// 跳转到对应页面
			nvaTo(url) {
				uni.navigateTo({
					url: url
				})
			},

			// 点击关注
			clickFollow() {
				let self = this;
				self.isFollow = !self.isFollow;
				if (self.isFollow) {
					this.bcColor = '#fa436a';
					this.fsColor = '#fa436a';
					uni.showToast({
						title: '关注成功',
						icon: 'none'
					});
				} else {
					this.isModal = true;
				}

			},

			// 取消关注弹框操作
			confirmOK(item) {
				let self = this;
				if (item.index == 1) {
					this.bcColor = '#f8f8f8';
					this.fsColor = '#f8f8f8';
					uni.showToast({
						title: '取消关注成功',
						icon: 'none'
					});
				}
				self.isModal = false;
			},
			
			// 点击进入我的评价详情
			clickEvaluate(){
				uni.navigateTo({
					url: '/pages/fans/fansEvaDetails',
				});
			}
		}
	}
</script>

<style scoped>
	.con-head {
		height: 400rpx;
		/* width: 100%; */
		background-image: url(../../static/images/fans/4.jpg);
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}

	.con-head-top {
		display: flex;
		padding: 10% 0 30rpx 20rpx;
	}

	.con-head-top-img {
		height: 150rpx;
		width: 150rpx;
		border-radius: 50%;
		border: 2rpx solid #FFFFFF;
	}

	.con-head-top-img-size {
		height: 145rpx;
		width: 145rpx;
		border-radius: 50%;
	}

	.con-head-top-title {
		display: flex;
		align-items: center;
		padding-left: 20rpx;
		color: #eaeaea;
		font-weight: 500;
		font-size: 38rpx;
	}

	.con-head-bottom {
		display: flex;
		justify-content: space-between;
	}

	.con-head-bottom-tool {
		display: flex;
		margin: 20rpx;
		font-size: 30rpx;
		color: #eaeaea;
	}

	.tool-fans {
		margin-left: 30rpx;
	}

	.con-head-bottom-button {
		margin: 25rpx 25rpx 0 0;
	}

	.con-list {
		background-color: #ffffff;
		border-radius: 10rpx;
		margin-top: -10rpx;
	}

	.con-list-content {
		margin: 20rpx;
	}

	.content-img {
		height: 340rpx;
		width: 100%;
	}

	.content-img-size {
		height: 340rpx;
		width: 340rpx;
		border-radius: 20rpx;
	}

	.content-comment {
		font-weight: bold;
		font-size: 26rpx;
		line-height: 30rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.content-time {
		font-size: 22rpx;
		margin-top: 20rpx;
		color: #9c9c9c;
	}
</style>
