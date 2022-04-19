<!-- 银行卡bankCard -->
<template>
	<view class="container">
		<view class="tui-header">
			<view>
				<text class="tui-title">我的卡</text>
				<text class="tui-total">（共6张）</text>
			</view>
			<tui-form-button plain hover background="#fa436a" color="#fa436a" radius="50rpx" height="50rpx"
				width="200rpx" :size="26" @click="addBankCard">+ 添加银行卡</tui-form-button>
		</view>

		<view class="tui-bankcard__list">
			<view class="tui-bankcard__item" v-for="(item,index) of bankList" :key="index"
				:style="{'background':item.bgColor}">
				<view class="tui-card__info">
					<view class="tui-logo__box">
						<image class="tui-logo" :src="item.imgSrc"></image>
					</view>
					<view class="tui-name__box">
						<view class="tui-name">{{ item.name }}</view>
						<view class="tui-desc">{{ item.desc }}</view>
					</view>
					<view class="tui-card__no">{{ item.cardNo }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bankList: [{
						bgColor: "linear-gradient(to right, #FEAD4B, #FF9225)",
						imgSrc: '/static/images/bank/p_a.png',
						name: '平安银行',
						desc: '储蓄卡',
						cardNo: '**** 6674'
					},
					{
						bgColor: "linear-gradient(to right, #2C87D6, #2D69D0)",
						imgSrc: '/static/images/bank/m_s.png',
						name: '中国民生银行',
						desc: '储蓄卡',
						cardNo: '**** 9970'
					},
					{
						bgColor: "linear-gradient(to right, #01ADA3, #0291A9)",
						imgSrc: '/static/images/bank/n_y.png',
						name: '中国农业银行',
						desc: '储蓄卡',
						cardNo: '**** 6475'
					},
					{
						bgColor: "linear-gradient(to right, #FF7065, #FD4754)",
						imgSrc: '/static/images/bank/z_x.png',
						name: '中信银行',
						desc: '储蓄卡',
						cardNo: '**** 6516'
					},
					{
						bgColor: "linear-gradient(to right, #FF6F64, #FE5762)",
						imgSrc: '/static/images/bank/z_s.png',
						name: '招商银行',
						desc: '储蓄卡',
						cardNo: '**** 1316'
					},
					{
						bgColor: "linear-gradient(to right, #2C85D5, #2D66D1)",
						imgSrc: '/static/images/bank/j_s.png',
						name: '中国建设银行',
						desc: '储蓄卡',
						cardNo: '**** 4216'
					}
				]
			}
		},

		methods: {
			// 添加银行卡
			addBankCard() {
				uni.navigateTo({
					url: '/pages/money/addBankCard'
				})
			}
		}
	}
</script>

<style scoped>
	.container {
		width: 100%;
		padding: 0 40rpx 40rpx;
		box-sizing: border-box;
	}

	.tui-header {
		width: 100%;
		padding: 36rpx 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.tui-title {
		font-size: 30rpx;
		font-weight: bold;
	}

	.tui-total {
		font-size: 24rpx;
		color: #999;
	}

	.tui-bankcard__item {
		width: 100%;
		height: 240rpx;
		padding: 30rpx;
		box-sizing: border-box;
		border-radius: 16rpx;
		margin-bottom: 20rpx;
	}

	.tui-logo__box {
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
		background-color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 20rpx;
	}

	.tui-logo {
		width: 52rpx;
		height: 52rpx;
	}

	.tui-card__info {
		display: flex;
		align-items: center;
		color: #fff;
	}

	.tui-name {
		font-size: 30rpx;
		font-weight: 500;
	}

	.tui-desc {
		font-size: 24rpx;
		opacity: 0.7;
	}

	.tui-card__no {
		margin-left: auto;
	}

	.tui-ping_an {
		background: linear-gradient(to right, #FEAD4B, #FF9225);
	}

	.tui-jian_she {
		background: linear-gradient(to right, #2C85D5, #2D66D1);
	}

	.tui-min_sheng {
		background: linear-gradient(to right, #2C87D6, #2D69D0);
	}

	.tui-nong_ye {
		background: linear-gradient(to right, #01ADA3, #0291A9);
	}

	.tui-zhao_shang {
		background: linear-gradient(to right, #FF6F64, #FE5762);
	}

	.tui-zhong_xin {
		background: linear-gradient(to right, #FF7065, #FD4754);
	}
</style>
