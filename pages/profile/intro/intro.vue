<!-- 简介修改界面intro -->
<template>
	<view class="container">
		<tui-list-cell :hover="false" :lineLeft="false">
			<view class="tui-cell-input">
				<input :value="intro" v-model="intro" placeholder="请输入简介" placeholder-class="tui-phcolor" type="textarea"
					:auto-focus="true" :focus="true" @input="inputIntro" />
				<icon type="clear" :size="14" color="#bfbfbf" v-show="intro" @tap="clearInput"></icon>
			</view>
		</tui-list-cell>

		<navigator hover-class="none" open-type="navigateBack" :delta="2" class="tui-exit">
			<button class="exit_ensure" @click="ensure">确定</button>
		</navigator>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				intro: ''
			};
		},
		methods: {
			// 输入框输入
			inputIntro(e) {
				this.intro = e.detail.value;
			},

			// 清楚输入框
			clearInput() {
				this.intro = '';
			},

			//确定按钮
			ensure() {
				uni.setStorageSync('intro', this.intro);
				setTimeout(() => {
					uni.navigateBack({
						delta: 1
					})
				}, 1000)
			}
		}
	};
</script>

<style lang="scss">
	.container {
		padding-top: 20rpx;

		.tui-cell-input {
			width: 100%;
			display: flex;
			align-items: center;
			box-sizing: border-box;

			input {
				flex: 1;
				padding-left: $uni-spacing-row-base;
			}
		}

		.tui-btn-box {
			padding: 40rpx 30rpx 10rpx 30rpx;
			box-sizing: border-box;
		}

		.exit_ensure {
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
	}
</style>
