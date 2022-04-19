<!-- 添加银行卡addBankCard -->
<template>
	<view class="container">
		<view class="con-head">
			<text class="con-head-title">添加银行卡</text>
			<text class="con-head-hint">请绑定持卡人本人的银行卡</text>
		</view>

		<view class="con-content">
			<form ref="formData" :model="formData">
				<tui-list-cell :hover="false">
					<view class="tui-line-cell">
						<view class="tui-title">持卡人</view>
						<input v-model="formData.Name" placeholder-class="tui-phcolor" class="tui-input" name="Name"
							placeholder="持卡人姓名" maxlength="50" type="text" />
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false">
					<view class="tui-line-cell">
						<view class="tui-title">卡号</view>
						<input v-model="formData.CardNumber" placeholder-class="tui-phcolor" class="tui-input"
							name="CardNumber" placeholder="持卡人本人银行卡号" maxlength="50" type="number" />
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false">
					<view class="tui-line-cell">
						<view class="tui-title">身份证</view>
						<input v-model="formData.IdCard" placeholder-class="tui-phcolor" class="tui-input" name="IdCard"
							placeholder="身份证号" maxlength="50" type="text" />
					</view>
				</tui-list-cell>
				<tui-list-cell :hover="false">
					<view class="tui-line-cell">
						<view class="tui-title">手机号</view>
						<input v-model="formData.MobileNumber" placeholder-class="tui-phcolor" class="tui-input"
							name="MobileNumber" placeholder="请输入预留手机号" maxlength="50" type="number" />
					</view>
				</tui-list-cell>

				<view class="tui-btn-box" @click="submit">
					<tui-form-button width="95%" height="80rpx" background="#fa436a">提交</tui-form-button>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
	const form = require("@/components/common/tui-validation/tui-validation.js")
	export default {
		data() {
			return {
				formData: {
					Name: "",
					CardNumber: null,
					IdCard: null,
					MobileNumber: ""
				}
			}
		},

		methods: {
			// 提交
			submit() {
				let self = this;
				//表单规则
				let rules = [{
					name: "Name",
					rule: ["required"],
					msg: ["请输入持卡人姓名"]
				}, {
					name: "CardNumber",
					rule: ["required"],
					msg: ["请输入银行卡号"]
				}, {
					name: "IdCard",
					rule: ["required", "isIdCard"],
					msg: ["请输入身份证号码", "请输入正确的身份证号码"]
				}, {
					name: "MobileNumber",
					rule: ["required", "isMobile"],
					msg: ["请输入手机号", "请输入正确的手机号"]
				}];

				console.log(self.formData);
				let checkRes = form.validation(self.formData, rules);
				if (!checkRes) {
					setTimeout(()=>{
						uni.navigateBack({
							delta:1
						})
					},1000)
					uni.showToast({
						title: "添加成功!",
						icon: "none"
					});
				} else {
					uni.showToast({
						title: checkRes,
						icon: "none"
					});
				}
			}
		},
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: $page-bg-color;
	}

	.con-head {
		height: 200rpx;
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;
		line-height: 60rpx;
		background-color: #FFFFFF;
	}

	.con-head-title {
		font-weight: bold;
		font-size: 38rpx;
		letter-spacing: 5rpx;
	}

	.con-head-hint {
		font-size: 28rpx;
		letter-spacing: 3rpx;
	}

	.con-content {
		margin-top: 20rpx;
	}

	.tui-line-cell {
		width: 100%;
		box-sizing: border-box;
		display: flex;
		align-items: center;
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

	.tui-btn-box {
		margin-top: 30rpx;
		margin-left: 5%;
	}
</style>
