<!-- 查看物流logisticsDetails -->
<template>
	<view class="container">

		<!-- 提醒标语 -->
		<view class="con-head">
			<view class="con-head-title">{{ stateTip }}</view>
			<view class="con-head-countdown">
				<text class="con-head-countdown-text">{{ stateHint }}</text>
				<tui-countdown v-if="state===1" :time="86400" color="rgba(254,254,254,0.75)"
					colonColor="rgba(254,254,254,0.75)" borderColor="transparent" backgroundColor="transparent">
				</tui-countdown>
			</view>
		</view>

		<!-- 退款金额 -->
		<tui-list-cell v-if="state === 4" style="margin-bottom: 20rpx;">
			<view style="display: flex;justify-content: space-between;">
				<text>退款金额</text>
				<text style="color: #f0550e;">￥18.9</text>
			</view>
		</tui-list-cell>

		<!-- 物流情况 -->
		<tui-list-cell v-if="state === 2 || state === 3 || state === 5" arrow backgroundColor="#fefefe" @click="logistics">
			<view class="tui-logistics">
				<tui-icon name="transport" :size="32"></tui-icon>
				<view class="tui-logistics-centent">
					<view class="logistics-text">运输中</view>
					<view class="logistics-way">快件离开********已发往*******</view>
				</view>
			</view>
		</tui-list-cell>

		<!-- 地址 :arrow="state=== '1' ? true : false"-->
		<tui-list-cell :arrow="isArrow" unlined :hover="false" @click="editAddr">
			<view class="tui-flex-box">
				<tui-icon name="gps" :size="32"></tui-icon>
				<view class="tui-addr">
					<view class="tui-addr-userinfo">
						<text class="tui-addr-name">张一</text>
						<text class="tui-addr-tel">18378849962</text>
					</view>
					<view class="tui-addr-text">广东省广州市海珠区阅江西路222号鲜卑路16巷吉安花园 2栋106</view>
				</view>
			</view>
		</tui-list-cell>

		<!-- 订单情况 -->
		<view class="con-oedrtDet">
			<view class="con-oedrtDet-head" @click="clickShop">
				<tui-icon name="shop" :size="20" style="margin-right: 10rpx;"></tui-icon>
				darlie黑人旗舰店
				<tui-icon name="arrowright" :size="24"></tui-icon>
			</view>

			<tui-list-view>
				<tui-list-cell>
					<view class="tui-box" @click="clickProduct">
						<view class="tui-image">
							<image class="tui-image-img" src="../../static/images/fans/2.jpg" mode=""></image>
						</view>
						<view class="tui-cent">
							<view class="tui-cent-title">黑人涑口水清新口气黑人涑口水清新口气黑人涑口水清新口气黑人涑口水清新口气</view>
							<view class="tui-cent-attr">双重薄荷(500ml*1或250ml*2随机发)；500毫升</view>
							<tui-tag type="warning" plain padding="4rpx" style="width: 170rpx;" size="18rpx">七天无理由退换
							</tui-tag>
						</view>
						<view class="tui-price">
							<view v-if="state === 5" class="tui-price-money">29.90</view>
							<view v-else class="tui-price-money">￥29.90</view>
							<view class="tui-price-number">x2</view>
						</view>
					</view>
					<view class="tui-buttonBox">
						<tui-button v-if="state===3" style="margin-right: 10rpx;" type="black" :plain="true"
							width="155rpx" height="50rpx" :size="22" shape="circle" @click="drawBack">
							申请售后
						</tui-button>
						<tui-button style="margin-right: 10rpx;" type="black" :plain="true" width="155rpx"
							height="50rpx" :size="22" shape="circle" @click="addCart">
							加入购物车
						</tui-button>
						<tui-button v-if="state===2" type="black" :plain="true" width="155rpx" height="50rpx" :size="22"
							shape="circle" @click="drawBack">
							退换
						</tui-button>
					</view>
				</tui-list-cell>
			</tui-list-view>

			<tui-list-view>
				<tui-list-cell>
					<view class="tui-foot">
						<view v-if="state === 5" class="tui-foot-box">
							<text>商品总价</text>
							<text>59.80 积分</text>
						</view>
						<view v-else class="tui-foot-box">
							<text>商品总价</text>
							<text>￥59.80</text>
						</view>
						<view class="tui-foot-box">
							<text>运费</text>
							<text>￥0.00</text>
						</view>
						<view v-if="state != 5" class="tui-foot-box">
							<text>优惠卷</text>
							<text>￥3.00</text>
						</view>
						<view v-if="state === 5" class="tui-foot-box" style="font-size: 28rpx;">
							<text style="font-weight: bold;">需积分</text>
							<text style="color: #ff6105;">59.80 积分</text>
						</view>
						
						<view v-else class="tui-foot-box" style="font-size: 28rpx;">
							<text style="font-weight: bold;">需付款</text>
							<text style="color: #ff6105;">￥59.80</text>
						</view>
					</view>
				</tui-list-cell>
			</tui-list-view>
		</view>

		<view v-if="state != 5" style="margin: 20rpx 0;">
			<tui-list-view>
				<tui-list-cell style="display: flex;">
					<tui-tag type="danger" plain padding="5rpx" size="22rpx" style="width: 55rpx;">积分</tui-tag>
					<text style="margin-left: 10rpx;font-size: 24rpx;">获得<text
							style="color: #fa436a;">99</text>点积分</text>
				</tui-list-cell>
			</tui-list-view>
		</view>

		<!-- 订单信息 售后信息要而外写-->
		<view class="con-orderInfo">
			<view>订单信息</view>
			<view class="con-orderInfo-info">
				<view class="info-flex">
					<text class="info-flex-title">订单编号:</text>
					<text class="info-flex-content">1888888888888888</text>
				</view>

				<view class="info-flex">
					<text class="info-flex-title">物流单号:</text>
					<text class="info-flex-content">3333333333333333</text>
				</view>

				<view class="info-flex">
					<text class="info-flex-title">创建时间:</text>
					<text class="info-flex-content">2021-06-10 16:06:24</text>
				</view>

				<view class="info-flex">
					<text class="info-flex-title">付款时间:</text>
					<text class="info-flex-content">2021-06-10 16:06:24</text>
				</view>

				<view class="info-flex">
					<text class="info-flex-title">发货时间:</text>
					<text class="info-flex-content">2021-06-10 16:06:24</text>
				</view>
			</view>
			<tui-list-view unlined="bottom">
				<tui-list-cell unlined>
					<view class="tui-contact" @click="serviceTap">
						<tui-icon name="kefu" :size="24"></tui-icon>
						<text class="tui-contact-title">联系商家</text>
					</view>
				</tui-list-cell>
			</tui-list-view>
		</view>

		<!-- 底部按钮 -->
		<view class="tui-tabbar tui-order-btn" v-if="state===1">
			<view class="tui-btn-mr">
				<tui-button type="black" :plain="true" width="152rpx" height="56rpx" :size="26" shape="circle"
					@click="clickAction('cancelOrder')">
					取消订单
				</tui-button>
			</view>
			<view class="tui-btn-mr">
				<tui-form-button color="#fa436a" background="#fa436a" radius="50px" plain width="152rpx" height="56rpx"
					:size="26" @click="clickAction('payNow')">
					立即支付
				</tui-form-button>
			</view>
		</view>

		<view class="tui-tabbar tui-order-btn" v-if="state===2">
			<view class="tui-btn-mr">
				<tui-button type="black" :plain="true" width="152rpx" height="56rpx" :size="26" shape="circle"
					@click="logistics">
					查看物流
				</tui-button>
			</view>
			<view class="tui-btn-mr">
				<tui-form-button color="#fa436a" background="#fa436a" radius="50px" plain width="152rpx" height="56rpx"
					:size="26" @click="clickAction('confirmReceiving')">
					确认收货
				</tui-form-button>
			</view>
		</view>

		<view class="tui-tabbar tui-order-btn" v-if="state===3">
			<view class="tui-btn-mr">
				<tui-button type="black" :plain="true" width="152rpx" height="56rpx" :size="26" shape="circle"
					@click="logistics">
					查看物流
				</tui-button>
			</view>
			<view class="tui-btn-mr">
				<tui-form-button color="#fa436a" background="#fa436a" radius="50px" plain width="152rpx" height="56rpx"
					:size="26" @click="clickAction('payNow')">
					评价
				</tui-form-button>
			</view>
		</view>

		<key-board ref="keyBoard"></key-board>
	</view>
</template>

<script>
	import keyBoard from '@/components/common/keyboard';
	export default {
		components: {
			keyBoard
		},

		data() {
			return {
				state: null,
				stateTip: "",
				stateHint: "",
				isArrow: false,
			}
		},

		onLoad: function(option) {
			if (option.state) {
				this.state = Number(option.state)
				if (this.state === 1) {
					this.isArrow = true;
				}
			}

			this.loadData();
		},

		methods: {
			// 处理数据
			loadData() {
				// 处理标题语
				//state订单状态：1是待付款，2是待收货，3是评价，4是售后退单,5是积分兑换,6是取消订单状态
				switch (this.state) {
					case 1:
						this.stateTip = "等待买家付款";
						this.stateHint = "剩余时间";
						break;
					case 2:
						this.stateTip = "待收货";
						this.stateHint = "还剩X天XX小时自动确认";
						break;
					case 3:
						this.stateTip = "订单已完成";
						this.stateHint = "";
						break;
					case 4:
						this.stateTip = "退款成功";
						this.stateHint = "退款原路退回 2020-09-11 12:20:11";
						break;
					case 5:
						this.stateTip = "兑换成功";
						this.stateHint = "交易完成";
						break;
					case 6:
						this.stateTip = "交易关闭";
						this.stateHint = "超时未付款，订单自动取消";
						break;
				}
			},

			// 修改地址
			editAddr() {
				if (this.state !== 1) {
					return;
				}
				uni.navigateTo({
					url: "/pages/address/address",
				});
			},

			// 物流情况
			logistics() {
				uni.navigateTo({
					url: "/pages/logisticsDetails/logisticsDetails"
				})
			},

			// 进入商品详情
			clickProduct() {
				uni.navigateTo({
					url: "/pages/product/product"
				});
			},

			// 加入购物车
			addCart() {
				uni.switchTab({
					url: "/pages/cart/cart"
				})
			},

			// 退款，售后drawback
			drawBack() {
				uni.navigateTo({
					url: "/pages/drawBack/drawBack"
				});
			},

			// 点击进入店铺
			clickShop() {
				uni.navigateTo({
					url: "/pages/shop/shop"
				});
			},

			// 联系商家
			serviceTap() {
				uni.showToast({
					title: '等待开发',
					icon: "none"
				});
			},

			// 点击对应操作
			clickAction(state) {
				if (state === "cancelOrder") {
					uni.showToast({
						title: '等待开发',
						icon: "none"
					});
				} else if (state === "payNow") {
					uni.navigateTo({
						url: "/pages/money/pay"
					});
				} else if (state === "confirmReceiving") {
					this.$refs.keyBoard.showKeyboard = true;
				}
			},
		},
	}
</script>

<style scoped>
	page {
		background-color: #F7F7F7;
	}

	.container {
		padding-bottom: 118rpx;
	}

	.con-head {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 150rpx;
		color: #fcfcfc;
		background: linear-gradient(90deg, rgb(248, 139, 42), rgb(252, 113, 5));
	}

	.con-head-title {
		letter-spacing: 5rpx;
	}

	.con-head-countdown {
		display: flex;
	}

	.con-head-countdown-text {
		font-size: 24rpx;
		letter-spacing: 5rpx;
		color: #eaeaea;
		margin-right: 10rpx;
	}

	.tui-flex-box {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.tui-logistics {
		display: flex;
	}

	.tui-logistics-centent {
		margin-left: 20rpx;
	}

	.logistics-text {
		font-size: 26rpx;
	}

	.logistics-way {
		font-size: 24rpx;
		line-height: 24rpx;
		padding-top: 16rpx;
		color: #666
	}

	.tui-addr {
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding-left: 20rpx;
		box-sizing: border-box;
	}

	.tui-addr-name {
		font-size: 30rpx;
		font-weight: bold;
	}

	.tui-addr-tel {
		font-size: 28rpx;
		padding-left: 40rpx;
		color: #a3a3a3;
	}

	.tui-addr-text {
		font-size: 24rpx;
		line-height: 32rpx;
		padding: 16rpx 16rpx 0 0;
		color: #a3a3a3;
	}

	.con-oedrtDet {
		margin-top: 20rpx;
		background-color: #ffffff;
	}

	.con-oedrtDet-head {
		display: flex;
		align-items: center;
		font-size: 28rpx;
		font-weight: bold;
		padding: 10rpx 20rpx;
	}

	.tui-box {
		display: flex;
		justify-content: space-between;
	}

	.tui-image {
		height: 150rpx;
		width: 150rpx;
	}

	.tui-image-img {
		height: 150rpx;
		width: 150rpx;
		border-radius: 10rpx;
	}

	.tui-cent {
		font-size: 26rpx;
		margin: 0 20rpx;
	}

	.tui-cent-title {
		font-weight: bold;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
	}

	.tui-cent-attr {
		color: #a3a3a3;
		font-size: 24rpx;
		margin: 10rpx 0;
	}

	.tui-price-money {
		color: #ff6105;
	}

	.tui-price-number {
		color: #a3a3a3;
		font-size: 24rpx;
		float: right;
	}

	.tui-buttonBox {
		display: flex;
		justify-content: flex-end;
		margin: 10rpx 0;
	}

	.tui-foot {
		font-size: 24rpx;
		line-height: 40rpx;
	}

	.tui-foot-box {
		display: flex;
		justify-content: space-between;

	}

	.con-orderInfo {
		line-height: 50rpx;
		margin-top: 20rpx;
		padding: 20rpx;
		font-size: 28rpx;
		background-color: #ffffff;
	}

	.con-orderInfo-info {
		display: flex;
		flex-direction: column;
		font-size: 24rpx;
		color: #363636;
		margin-bottom: 10rpx;
	}

	.info-flex-title {
		color: #3d3d3d;
	}

	.info-flex-content {
		margin-left: 50rpx;
		color: #838383;
	}

	.tui-tabbar {
		width: 100%;
		height: 98rpx;
		background: #fff;
		position: fixed;
		left: 0;
		bottom: 0;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		font-size: 26rpx;
		box-shadow: 0 0 1px rgba(0, 0, 0, .3);
		padding-bottom: env(safe-area-inset-bottom);
		z-index: 996;
	}

	.tui-btn-mr {
		margin-right: 30rpx;
	}

	.tui-contact {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 28rpx;
	}

	.tui-contact-title {
		margin-left: 10rpx;
	}
</style>
