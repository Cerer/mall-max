<!-- 客服chat -->
<template>
	<view class="container">
		<view class="tui-chat-content">
			<tui-loadmore v-if="loadding" :index="3" type="primary" text=" "></tui-loadmore>
			<view v-show="show">

				<view class="tui-label">对方已通过您的好友请求</view>
				<view class="tui-chat-center">星期四 11:02</view>

				<view class="tui-chat-right">
					<view class="tui-chatbox tui-chatbox-right">哈喽~，欢迎关注！</view>
					<image src="/static/images/fans/3.jpg" class="tui-user-pic tui-left"></image>
				</view>

				<view class="tui-chat-left">
					<image src="/static/images/fans/4.jpg" class="tui-user-pic tui-right"></image>
					<view class="tui-chatbox tui-chatbox-left">哈喽~，欢迎关注！</view>
				</view>

				<view class="tui-chat-left">
					<image src="/static/images/fans/4.jpg" class="tui-user-pic tui-right"></image>
					<view class="tui-img-chatbox">
						<image src="/static/images/fans/3.jpg" class="tui-chat-img" mode="widthFix"></image>
					</view>
				</view>

				<view class="tui-chat-right">
					<view class="tui-chatbox tui-chatbox-right">哈喽~，欢迎关注！</view>
					<image src="/static/images/fans/3.jpg" class="tui-user-pic tui-left"></image>
				</view>

				<view class="tui-chat-left">
					<image src="/static/images/fans/4.jpg" class="tui-user-pic tui-right"></image>
					<view class="tui-chatbox tui-chatbox-left">哈喽~，欢迎关注！</view>
				</view>

				<view class="tui-chat-left">
					<image src="/static/images/fans/4.jpg" class="tui-user-pic tui-right"></image>
					<view class="tui-img-chatbox">
						<image src="/static/images/fans/4.jpg" class="tui-chat-img" mode="widthFix"></image>
					</view>
				</view>
			</view>

			<view v-for="(item,index) of chatList" :key="index">
				<view v-if="item.time" class="tui-chat-center">{{ item.time }}</view>

				<!-- 文字 -->
				<view v-if="item.type === 1" :class="[item.userId === 1 ? 'tui-chat-left' : 'tui-chat-right']">
					<image v-if="item.userId === 1" :src="item.src" class="tui-user-pic tui-right"></image>
					<view :class="['tui-chatbox',item.userId === 1 ? 'tui-chatbox-left' : 'tui-chatbox-right']">
						<!-- 有问题 -->
						{{ item.text }}

						<image style="margin-left: 5rpx;" v-if="item.faceList && item.faceList.length > 0"
							v-for="(f,i) of item.faceList" :key="i" :src="f" class="tui-face-img">
						</image>
					</view>
					<image v-if="item.userId === 2" :src="item.src" class="tui-user-pic tui-left"></image>
				</view>

				<!-- 图片 -->
				<view v-if="item.type === 2" :class="[item.userId === 1 ? 'tui-chat-left' : 'tui-chat-right']">
					<image v-if="item.userId === 1" :src="item.src" class="tui-user-pic tui-right"></image>
					<view class="tui-flex-center tui-flex-reverse">
						<image v-if="item.userId === 1 && !item.success" src="/static/images/chat/fail.png"
							class="tui-chat-fail" style="margin-left: 16rpx;"></image>
						<view class="tui-img-chatbox" @click="clickGallery(item.text)">
							<image :src="item.text" class="tui-chat-img" mode="widthFix"></image>
						</view>
						<tui-gallery :urls="galleryUrls" :show="showGallery" @hide="hideGallery"></tui-gallery>
						<image v-if="item.userId === 2 && !item.success" src="/static/images/chat/fail.png"
							class="tui-chat-fail tui-mr">
						</image>
					</view>
					<image v-if="item.userId === 2" :src="item.src" class="tui-user-pic tui-left"></image>
				</view>

				<!-- 语音 -->
				<view v-if="item.type === 3" :class="[item.userId === 1 ? 'tui-chat-left' : 'tui-chat-right']">
					<image v-if="item.userId === 1" :src="item.src" class="tui-user-pic tui-right"></image>
					<view :class="['tui-flex-center',item.userId===2 ? 'tui-flex-end' : '' ]">
						<tui-badge v-if="item.userId === 2" :dot="true" type="danger"></tui-badge>
						<view
							:class="['tui-chatbox','tui-chat-flex',item.userId === 1 ? 'tui-chatbox-left tui-mr' : 'tui-chatbox-right tui-ml tui-flex-reverse']">
							<image src="/static/images/chat/voice.png" class="tui-chat-voice tui-mr"></image>
							<!-- 有点问题,到时根据语音长短调整长度 -->
							<view style="width:220rpx;text-align:right">{{ item.text }}</view>
						</view>
						<tui-badge v-if="item.userId === 1" :dot="true" type="danger"></tui-badge>
					</view>
					<image v-if="item.userId === 2" :src="item.src" class="tui-user-pic tui-left"></image>
				</view>

			</view>
		</view>

		<t-chat-bar :chatList="chatList"></t-chat-bar>
	</view>
</template>

<script>
	import tChatBar from '@/components/views/t-chat-bar/t-chat-bar';
	export default {
		components: {
			tChatBar
		},
		data() {
			return {
				// 加载更多圈
				loadding: false,

				// 是否显示最开始的内容
				show: false,

				// 聊天记录
				// type(1-文字 2-图片 3-语音，4-时间 5-提醒 ...)
				// userId(用户标识 不一定是userid)
				// read(消息是否已读)       
				// success(信息是否发送成功)
				chatList: [{
						type: 1,
						userId: 1,
						text: '哈喽~，欢迎关注！',
						src: '/static/images/fans/4.jpg',
						read: true,
						success: true,
						time: "星期四 11:02",
						faceList: []
					},
					{
						type: 1,
						userId: 2,
						text: '哈喽~，欢迎关注Thor UI！ 请说出您想加入或者优化的功能！',
						src: '/static/images/fans/3.jpg',
						read: true,
						success: true,
						time: "星期五 12:09",
						faceList: []
					},
					{
						type: 1,
						userId: 2,
						text: '哈喽~，欢迎关注！',
						src: '/static/images/fans/3.jpg',
						read: true,
						success: true,
						time: "",
						faceList: []
					},
					{
						type: 1,
						userId: 1,
						text: '哈喽~，欢迎关注！',
						src: '/static/images/fans/4.jpg',
						read: true,
						success: true,
						time: "",
						faceList: []
					},
					{
						type: 2,
						userId: 1,
						text: '/static/images/fans/4.jpg',
						src: '/static/images/fans/4.jpg',
						read: true,
						success: true,
						time: "",
						faceList: []
					},
					{
						type: 2,
						userId: 1,
						text: '/static/images/fans/4.jpg',
						src: '/static/images/fans/4.jpg',
						read: true,
						success: true,
						time: "",
						faceList: []
					},
					{
						type: 3,
						userId: 1,
						text: '8"',
						src: '/static/images/fans/4.jpg',
						read: true,
						success: true,
						time: "",
						faceList: []
					},
					{
						type: 3,
						userId: 1,
						text: '20"',
						src: '/static/images/fans/4.jpg',
						read: true,
						success: true,
						time: "",
						faceList: []
					},
					{
						type: 3,
						userId: 2,
						text: '18"',
						src: '/static/images/fans/3.jpg',
						read: true,
						success: true,
						time: "",
						faceList: []
					},
					{
						type: 2,
						userId: 2,
						text: '/static/images/fans/3.jpg',
						src: '/static/images/fans/3.jpg',
						read: true,
						success: false,
						time: "",
						faceList: []
					}
				],

				// 是否显示图片预览
				showGallery: false,

				// 图片预览数据
				galleryUrls: [{
					src: ""
				}]
			}
		},

		methods: {
			clickGallery(url) {
				console.log(url);
				let self = this;
				self.galleryUrls[0].src = url;

				self.showGallery = true;
			},

			// 隐藏预览框
			hideGallery() {
				this.showGallery = false;
			}
		},

		onPageScroll(e) {
			if (e.scrollTop == 0 && !this.loadding) {
				this.loadding = true;
				setTimeout(() => {
					this.show = true;
					this.loadding = false;
				}, 1000);
			}
		}
	}
</script>

<style scoped>
	page {
		background-color: #F7F7F7;
	}

	.container {
		padding-left: 20rpx;
		padding-right: 20rpx;
		padding-bottom: 146rpx;
		box-sizing: border-box;
	}

	.tui-chat-content {
		width: 100%;
	}

	.tui-label {
		display: inline-block;
		background: rgba(0, 0, 0, 0.4);
		color: #fff;
		font-size: 24rpx;
		line-height: 24rpx;
		margin-top: 36rpx;
		padding: 12rpx 16rpx;
		text-align: center;
		border-radius: 8rpx;
		margin-left: 50%;
		transform: translateX(-50%);
	}

	.tui-chat-center {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 28rpx;
		font-size: 28rpx;
		color: #666;
		padding-top: 36rpx;
	}

	.tui-chat-right {
		justify-content: flex-end;
	}

	.tui-chat-left,
	.tui-chat-right {
		display: flex;
		align-items: flex-start;
		padding-top: 36rpx;
	}

	.tui-chatbox {
		max-width: 66%;
		border-radius: 10rpx;
		position: relative;
		padding: 20rpx 22rpx;
		font-size: 32rpx;
		color: #333;
		word-break: break-all;
		word-wrap: break-word;
	}

	.tui-chatbox::before {
		content: '';
		position: absolute;
		width: 0;
		height: 0;
		top: 20rpx;
		border: 16rpx solid;
	}

	.tui-chatbox-right {
		background: #a0d5f3;
		border: 1rpx solid #a0d5f3;
	}

	.tui-chatbox-right::before {
		left: 100%;
		border-color: transparent transparent transparent #a0d5f3;
	}

	.tui-user-pic {
		width: 80rpx;
		height: 80rpx;
		flex-shrink: 0;
		border-radius: 50%;
		display: block;
	}

	.tui-left {
		margin-left: 26rpx;
	}

	.tui-right {
		margin-right: 26rpx;
	}

	.tui-chatbox-left {
		background: #fff;
		border: 1rpx solid #fff;
		display: inline-block;
		width: 100%;
	}

	.tui-chatbox-left::before {
		right: 100%;
		border-color: transparent #fff transparent transparent;
	}

	.tui-img-chatbox {
		position: relative;
	}

	.tui-img-chatbox::after {
		content: '';
		position: absolute;
		height: 200%;
		width: 200%;
		border: 1rpx solid #eaeef1;
		transform-origin: 0 0;
		-webkit-transform-origin: 0 0;
		-webkit-transform: scale(0.5);
		transform: scale(0.5);
		left: 0;
		top: 0;
		border-radius: 20rpx;
	}

	.tui-chat-img {
		max-width: 200rpx;
		/* min-height: 80rpx; */
		display: block;
		border-radius: 10rpx;
	}

	.tui-flex-center {
		display: flex;
		align-items: center;
	}


	.tui-chat-flex {
		display: flex;
		align-items: center;
	}

	.tui-mr {
		margin-right: 16rpx;
	}

	.tui-chat-voice {
		width: 40rpx;
		height: 40rpx;
		display: block;
		flex-shrink: 0;
	}

	.tui-flex-end {
		justify-content: flex-end;
	}

	.tui-flex-reverse {
		flex-direction: row-reverse;
	}

	.tui-rotate {
		transform: rotate(180deg);
	}

	.tui-ml {
		margin-left: 16rpx;
	}

	.tui-chat-fail {
		width: 50rpx;
		height: 50rpx;
		display: block;
		flex-shrink: 0;
	}

	.tui-face-img {
		width: 40rpx;
		height: 40rpx;
	}
</style>
