<!-- 实名认证certification -->
<template>
	<view class="container">
		<view class="all-flex-column bg-white" style="height: 300rpx;line-height: 50rpx;">
			<image src="/static/images/certification/approve.jpg" style="width: 150rpx;height: 150rpx;"></image>

			<text class="font-weight">进行实名认证</text>
			<text class="fz26 font-color-light">通过实名认证后才能发布交易商品</text>
		</view>

		<view class="mt-2">
			<tui-list-view title="基本信息" backgroundColor="#FFFFFF">
				<tui-list-cell :hover="false">
					<view class="w-100 d-flex a-center" style="box-sizing: border-box;">
						<view class="tui-title">姓名</view>
						<input
							v-model="formData.Name"
							placeholder-class="tui-phcolor"
							class="tui-input"
							placeholder="请输入真实姓名"
							maxlength="20"
							type="text"
						/>
					</view>
				</tui-list-cell>

				<tui-list-cell :hover="false">
					<view class="w-100 d-flex a-center" style="box-sizing: border-box;">
						<view class="tui-title">身份证</view>
						<input
							v-model="formData.IdCard"
							placeholder-class="tui-phcolor"
							class="tui-input"
							placeholder="身份证号"
							maxlength="50"
							type="text"
						/>
					</view>
				</tui-list-cell>
			</tui-list-view>
		</view>

		<view class="mt-2">
			<tui-list-view title="上传身份证" backgroundColor="#FFFFFF">
				<tui-list-cell :hover="false">
					<view class="d-flex j-center">
						<view class="ub-info">
							<tui-upload
								:width="320"
								:height="220"
								:limit="1"
								:serverUrl="nationalUrl"
								@complete="nationalResult"
							></tui-upload>
							<view class="mt-1 text-center">国徽面</view>
						</view>

						<view class="ub-info">
							<tui-upload
								style="margin-left: 20rpx;"
								:width="320"
								:height="220"
								:limit="1"
								:serverUrl="infoUrl"
								@complete="infoResult"
							></tui-upload>
							<view class="mt-1 text-center">信息面</view>
						</view>
					</view>
				</tui-list-cell>
			</tui-list-view>
		</view>

		<view class="mt-3" style="margin-left: 5%;" @click="submit">
			<tui-form-button width="95%" height="80rpx" background="#fa436a">立即认证</tui-form-button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			formData: {
				Name: '',
				IdCard: null
			},

			//服务器接口地址
			nationalUrl: '',
			infoUrl: ''
		};
	},

	methods: {
		// 国徽面上传结果
		nationalResult(data) {
			let url = data.imgArr.toString();
			this.serverUrl = url;
		},

		// 信息面上传结果
		infoResult(data) {
			let url = data.imgArr.toString();
			this.infoUrl = url;
		},

		// 提交认证
		submit() {
			let self = this;
			if (!self.formData.Name) {
				uni.showToast({
					title: '请填写姓名',
					icon: 'none'
				});
				return;
			}

			if (!self.formData.IdCard) {
				uni.showToast({
					title: '请填写身份证号',
					icon: 'none'
				});
				return;
			}

			if (!self.serverUrl) {
				uni.showToast({
					title: '请上传国徽图',
					icon: 'none'
				});
				return;
			}

			if (!self.infoUrl) {
				uni.showToast({
					title: '请上传信息图',
					icon: 'none'
				});
				return;
			}

			setTimeout(() => {
				uni.redirectTo({
					url: 'certificationSucceed'
				});
			}, 1500);
		}
	}
};
</script>

<style scoped>
page {
	background-color: #f7f7f7;
}

.tui-title {
	line-height: 32rpx;
	min-width: 120rpx;
	flex-shrink: 0;
}

.tui-input {
	font-size: 28rpx;
	color: #333;
	padding-left: 20rpx;
	flex: 1;
	overflow: visible;
}
</style>
