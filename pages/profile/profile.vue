<!-- 个人信息profile -->
<template>
	<view class="container">
		<view style="margin-top: 20rpx;"></view>
		<tui-list-cell padding="0" :arrow="true" @click="changeAvatar">
			<view class="tui-list-cell">
				<view>头像</view>
				<image src="/static/images/profile/1.jfif" class="tui-avatar"></image>
			</view>
		</tui-list-cell>

		<tui-list-cell padding="0" :hover="false">
			<view class="tui-list-cell tui-pr30">
				<view>会员名称</view>
				<input v-model="userName" placeholder="QMall" class="tui-content"></input>
			</view>
		</tui-list-cell>

		<tui-list-cell padding="0" :arrow="true" @click="nicknameTap">
			<view class="tui-list-cell">
				<view>昵称</view>
				<view class="tui-content">{{ nickname?nickname : 'echo.' }}</view>
			</view>
		</tui-list-cell>

		<tui-list-cell padding="0" :arrow="true" @click="changeSex">
			<view class="tui-list-cell">
				<view>性别</view>
				<view class="tui-content">{{ sex }}</view>
			</view>
		</tui-list-cell>

		<tui-list-cell padding="0" :arrow="true" @click="changeIntro">
			<view class="tui-list-cell">
				<view>简介</view>
				<view class="tui-content">{{ intro }}</view>
			</view>
		</tui-list-cell>

		<picker mode="date" @change="changeDate">
			<tui-list-cell padding="0" :arrow="true" unlined>
				<view class="tui-list-cell">
					<view>出生日期</view>
					<view class="tui-content">{{ date }}</view>
				</view>
			</tui-list-cell>
		</picker>

		<navigator hover-class="none" open-type="navigateBack" :delta="2" class="tui-exit">
			<button class="exit_save" @click="save">保存</button>
		</navigator>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 会员名称
				userName: "",

				// 昵称
				nickname: "",

				// 性别
				sex: '男',

				// 日期
				date: '请选择',

				// 简介
				intro: ''
			}
		},

		onShow() {
			// 先取本地缓存的数据
			this.nickname = uni.getStorageSync('nickname')
			this.intro = uni.getStorageSync('intro')
		},

		methods: {
			// 修改头像
			changeAvatar() {
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'],
					sourceType: ['album', 'camera'],
					success: res => {
						const tempFilePaths = res.tempFilePaths[0];
						console.log(tempFilePaths)
						// this.tui.href('/pages/my/cropper/cropper?src=' + tempFilePaths);
					}
				});
			},

			// 修改昵称
			nicknameTap() {
				uni.navigateTo({
					url: '/pages/profile/nickname/nickname'
				});
			},

			// 修改性别
			changeSex() {
				let self = this
				uni.showActionSheet({
					itemList: ['男', '女'],
					success(e) {
						self.sex = ['男', '女'][e.tapIndex]
					}
				})
			},

			// 修改日期
			changeDate(e) {
				this.date = e.detail.value
			},

			// 修改简介
			changeIntro() {
				uni.navigateTo({
					url: '/pages/profile/intro/intro'
				});
			},

			// 保存数据
			save() {}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #F7F7F7;
	}

	.tui-list-cell {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 24rpx 60rpx 24rpx 30rpx;
		box-sizing: border-box;
		font-size: 30rpx;
	}

	.tui-avatar {
		width: 100rpx;
		height: 100rpx;
		display: block;
		border-radius: 50%;
	}

	.tui-pr30 {
		padding-right: 30rpx;
	}

	.tui-list-cell input {
		text-align: right;
	}

	.tui-content {
		font-size: 26rpx;
		color: #666;
	}

	.tui-exit {
		padding: 10rpx 24rpx;
	}

	.exit_save {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 690rpx;
		height: 80rpx;
		margin: 60rpx auto;
		font-size: $font-lg;
		color: #fff;
		background-color: $base-color;
		border-radius: 10rpx;
		box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
	}
</style>
