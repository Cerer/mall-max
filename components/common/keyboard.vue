<!-- 键盘输入付款 -->
<template>
	<view>
		<tui-keyboard :show="showKeyboard" @close="closeKeyboard" @click="keyboardClick">
			<view class="tui-digital-box">
				<view class="tui-keyboard-tips">请输入密码</view>
				<tui-keyboard-input :inputvalue="pwdArr"></tui-keyboard-input>
			</view>
		</tui-keyboard>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 判断是否启动数字键盘
				showKeyboard: false,
				pwdArr: ["", "", "", "", "", ""],
				temp: ["", "", "", "", "", ""],
				numberArr: [],
			}
		},

		methods: {
			// 键盘点击操作
			keyboardClick: function(e) {
				let numberArr = this.numberArr;
				let pwdArr = this.pwdArr;
				let index = e.index;
				if (numberArr.length === pwdArr.length || index == undefined) {
					return;
				}
				if (index == 9) { //取消键
					this.closeKeyboard();
					return;
				} else if (index == 11) {
					//退格键
					let len = numberArr.length;
					if (len) {
						pwdArr.splice(len - 1, 1, "");
					} else {
						pwdArr = this.temp;
					}
					numberArr.pop()
				} else if (index == 10) {
					numberArr.push(0);
					pwdArr.splice(numberArr.length - 1, 1, "●");
				} else {
					numberArr.push(index + 1);
					pwdArr.splice(numberArr.length - 1, 1, "●");
				}
				this.numberArr = numberArr;
				this.pwdArr = pwdArr;
				this.getPwd();
			},

			// 取消键盘按钮
			closeKeyboard: function() {
				this.showKeyboard = false;
				this.numberArr = [];
				this.pwdArr = this.temp
			},

			// 输入正确密码后操作
			getPwd: function() {
				//判断并取出密码
				if (this.numberArr.length === this.pwdArr.length) {
					uni.showLoading({
						title: '模拟提交...',
						mask: true
					})
					setTimeout(() => {
						let pwd = this.numberArr.join('')
						this.closeKeyboard();
						uni.showToast({
							title: '支付成功',
							icon: "none"
						});
						uni.redirectTo({
							url: '/pages/money/paySuccess',
						});
					}, 800);
				}
			},
		},
	}
</script>

<style scoped>
	.tui-digital-box {
		background: #fff;
		padding-bottom: 50rpx;
		border: 0;
	}

	.tui-keyboard-tips {
		width: 100%;
		height: 120rpx;
		line-height: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 30rpx;
		background: #fff;
		position: relative;
		color: #333;
		border: 0;
	}
</style>
