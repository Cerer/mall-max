<!-- 订单 -->
<template>
	<view class="container">
		<tui-tabs :tabs="tabs" :currentTab="currentTab" selectedColor="#fa436a" sliderBgColor="#fa436a"
			@change="changeTab">
		</tui-tabs>

		<view class="con-card" v-for="(item,index) of listData" :key="index">
			<view class="con-card-head">
				<text>{{ item.shopTime }}
				<text v-show="currentTab === 5" class="con-card-head-label">积分兑换</text>
				</text>
				
				<view>
					<text :style="{'color':item.stateTipColor}">{{ item.stateTip }}</text>
					<text v-if="item.state === 6" class="del-btn yticon icon-iconfontshanchu1"
						@click="deleteOrder(index)"></text>
				</view>
			</view>

			<view class="con-card-line"></view>

			<view class="con-card-center" v-for="(goods,i) of item.goodsList" :key="i" @click="clickCheck(item)">
				<view class="con-card-centre-img">
					<image class="con-card-centre-img-size" :src="goods.image"></image>
				</view>
				<view class="con-card-centre-info">
					<view class="con-card-centre-info-title">
						<text class="title-name">{{ goods.title }}</text>
						<text class="title-price">{{ item.state === 5 ? '' : '￥'}}{{ goods.price }}</text>
					</view>
					<view class="con-card-centre-info-size">
						<text class="size-content">{{ goods.size }}</text>
						<text class="size-num">x{{ goods.number }}</text>
					</view>
				</view>
			</view>

			<view class="con-card-collect" @click="clickCheck(item)" >
				<text class="con-card-collect-totalPrice">总价 {{ item.state === 5 ? '' : '￥'}}{{ item.sumNum }}</text>
				<text class="con-card-collect-pay" v-if="item.state != 5">需付费 <text style="color: #f0550e;">￥{{ item.sumNum }}</text></text>
				<text class="con-card-collect-pay" v-else>需积分 <text style="color: #f0550e;">{{ item.sumNum }}</text></text>
			</view>

			<view class="con-card-footer">
				<!-- 待付款1 -->
				<view v-if="item.state===1" class="action-box b-t">
					<button class="action-btn" @click="cancelOrder(item,index)">取消订单</button>
					<button class="action-btn recom" @click="clickPay(item)">立即支付</button>
				</view>

				<!-- 待收货2 -->
				<view v-if="item.state === 2" class="action-box b-t">
					<button class="action-btn" @click="clickCheck(item)">查看物流</button>
					<button class="action-btn recom" @click="clickReceiving(item)">确认收货</button>
				</view>

				<!-- 待评价3 -->
				<view v-if="item.state === 3" class="action-box b-t">
					<button class="action-btn" @click="clickCheck(item)">查看物流</button>
					<button class="action-btn recom" @click="clickEvaluate(item)">评价</button>
				</view>

				<!-- 售后4 -->
				<view v-if="item.state === 4" class="action-box b-t">
					<button class="action-btn" @click="checkDetails(item)">查看详情</button>
				</view>
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
				//tabs 数据
				tabs: [{
					name: "全部",
					state: 0
				}, {
					name: "待付款",
					state: 1
				}, {
					name: "待收货",
					state: 2
				}, {
					name: "待评价",
					state: 3
				}, {
					name: "售后",
					state: 4
				}, {
					name: "积分兑换",
					state: 5
				}],

				// 标识切换的tabs页
				currentTab: 0,

				// state订单状态：1是待付款，2是待收货，3是评价，4是售后退单,5是积分兑换,6是取消订单状态
				orderList: [{
						id: 1,
						shopName: "枚苏旗舰店",
						shopTime: "2019-04-06 11:37",
						state: 1,
						goodsList: [{
								title: "【狂欢】3支枚苏极细眉苏极细眉苏极细眉苏极细眉苏极细眉苏极细眉苏极细眉",
								size: "01#气质黑",
								price: "16.8",
								number: "1",
								image: "../../static/images/fans/1.jpg"
							}, {
								title: "【狂欢】3支枚苏极细眉经典棕经典棕经典棕经典棕经典棕经典棕经典棕",
								size: "03#经典棕",
								price: "16.8",
								number: "1",
								image: "../../static/images/fans/2.jpg"
							},
							{
								title: "【狂欢】3支枚苏极细眉咖啡色咖啡色咖啡色咖啡色咖啡色咖啡色",
								size: "05#咖啡色",
								price: "16.8",
								number: "1",
								image: "../../static/images/fans/3.jpg"
							}
						]
					},
					{
						id: 2,
						shopName: "darlie黑人旗舰店",
						shopTime: "2019-04-06 11:37",
						state: 2,
						goodsList: [{
							title: "黑人涑口水清新口气黑人涑口水清新口气黑人涑口水清新口气黑人涑口水清新口气",
							size: "双重薄荷(500ml*1或250ml*2随机发)；500毫升",
							price: "29.90",
							number: "2",
							image: "../../static/images/fans/4.jpg"
						}]
					},
					{
						id: 3,
						shopName: "舌尖王国食品专营店",
						shopTime: "2019-04-06 11:37",
						state: 3,
						goodsList: [{
							title: "印尼进口MintZ薄荷糖薄荷糖薄荷糖薄荷糖薄荷糖",
							size: "双重薄荷味1袋",
							price: "18.80",
							number: "1",
							image: "../../static/images/fans/1.jpg"
						}]
					},
					{
						id: 4,
						shopName: "天天特卖工厂店",
						shopTime: "2019-04-06 11:37",
						state: 4,
						goodsList: [{
							title: "锡纸烤箱家用经济装家用经济装家用经济装家用经济装家用经济装",
							size: "30cm*30米",
							price: "18.90",
							number: "1",
							image: "../../static/images/fans/2.jpg"
						}]
					},
					{
						id: 5,
						shopName: "大牌旗舰店",
						shopTime: "2020-03-21 11:37",
						state: 5,
						goodsList: [{
							title: "高档家具高档家具高档家具高档家具高档家具高档家具高档家具高档家具高档家具",
							size: "180cm*40cm*60cm",
							price: "5000",
							number: "1",
							image: "../../static/images/fans/3.jpg"
						}]
					},
					{
						id: 6,
						shopName: "电器旗舰店",
						shopTime: "2020-04-06 11:37",
						state: 6,
						goodsList: [{
							title: "家用电器扫地机器人家用电器扫地机器人家用电器扫地机器人家用电器扫地机器人",
							size: "30cm*30cm",
							price: "2999.00",
							number: "1",
							image: "../../static/images/fans/4.jpg"
						}]
					}
				],

				// 过滤数据
				filterList: [],

				// 列表循环数据(先防止假数据过滤出现错误)
				listData: []
			}
		},

		// 假数据过滤先这样处理，切换数据才不会重复
		onLoad(option) {
			if (option.state) {
				this.currentTab = Number(option.state);
			}
			this.loadData(this.currentTab);
		},

		methods: {
			// 初始化数据
			loadData(state) {
				this.orderList.forEach(item => {
					//添加不同状态下订单的表现形式
					item = Object.assign(item, this.orderStateExp(item.state));
					
					let sumNum = 0;
					if(item.goodsList){
						for (let s of item.goodsList) {
							sumNum += (Number(s.price) * Number(s.number));
						}
					}
					
					item.sumNum = sumNum.toFixed(2);
				});
				
				this.filterList = JSON.parse(JSON.stringify(this.orderList));

				if (state === 0) {
					this.listData = this.filterList;
				} else {
					this.listData = this.filterList.filter(i => state == i.state)
				}
			},

			// 切换tabs页
			changeTab(e) {
				this.currentTab = e.index;
				this.loadData(e.index)
			},


			//删除订单
			deleteOrder(index) {
				this.listData = this.orderList;
				uni.showLoading({
					title: '请稍后'
				})
				setTimeout(() => {
					this.listData.splice(index, 1);
					uni.hideLoading();
				}, 600)
			},

			// 取消订单
			cancelOrder(item, index) {
				let self = this;
				uni.showLoading({
					title: '请稍后'
				})

				setTimeout(() => {
					let {
						stateTip,
						stateTipColor
					} = this.orderStateExp(4);
					item = Object.assign(item, {
						state: 4,
						stateTip,
						stateTipColor
					})

					let arrayList = [];
					//取消订单后删除待付款中该项
					if (self.currentTab === 1) { //有点问题，在待付款中取消订单后，切换到其他页面没有数据
						let list = this.orderList.splice(index, 1);
						arrayList = list;
					} else {
						arrayList = this.orderList;
					}

					uni.hideLoading();

					this.filterList = JSON.parse(JSON.stringify(arrayList));
				}, 600)
			},

			// 立即支付
			clickPay(item) {
				// 有点问题，因为付款成功重新返回后重新刷新了页面，所有数据是原来的，导致没有效果
				uni.navigateTo({
					url: "/pages/money/pay"
				});

				setTimeout(() => {
					let {
						stateTip,
						stateTipColor
					} = this.orderStateExp(2);
					item = Object.assign(item, {
						state: 2,
						stateTip,
						stateTipColor
					})

					let arrayList = [];
					//支付订单后删除待付款中该项
					if (self.currentTab === 1) { //有点问题，在待付款中支付订单后，切换到其他页面没有数据
						let list = this.orderList.splice(index, 1);
						arrayList = list;
					} else {
						arrayList = this.orderList;
					}

					uni.hideLoading();

					this.filterList = JSON.parse(JSON.stringify(arrayList));
					console.log(this.filterList)

				}, 600)
			},

			//订单状态文字和颜色
			orderStateExp(state) {
				let stateTip = '',
					stateTipColor = '#fa436a';
				switch (+state) {
					case 1:
						stateTip = '待付款';
						break;
					case 2:
						stateTip = '待发货';
						break;
					case 3:
						stateTip = '交易成功';
						break;
					case 4:
						stateTip = '退款成功';
						break;
					case 5:
						stateTip = '兑换成功';
						break;
					case 6:
						stateTip = '订单已关闭';
						stateTipColor = '#909399';
						break;

						//更多自定义
				}
				return {
					stateTip,
					stateTipColor
				};
			},

			//查看物流
			clickCheck(item) {
				uni.navigateTo({
					url: `/pages/order/orderDetails?state=${item.state}`
				})
			},

			// 确认收货
			clickReceiving(item) {
				let self = this;
				self.$refs.keyBoard.showKeyboard = true;
			},

			// 评价
			clickEvaluate(item) {
				uni.navigateTo({
					url: "/pages/orderEvaluate/orderEvaluate"
				})
			},

			// 查看退款详情
			checkDetails(item) {
				uni.navigateTo({
					url: `/pages/order/orderDetails?state=${item.state}`
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	page {
		background-color: #F7F7F7;
	}

	.con-card {
		background-color: #ffffff;
		margin-top: 20rpx;

		.del-btn {
			padding-left: 36rpx;
			font-size: $font-lg;
			color: $font-color-light;
			position: relative;

			&:after {
				content: '';
				width: 0;
				height: 30rpx;
				border-left: 1px solid $border-color-dark;
				position: absolute;
				left: 20rpx;
				top: 50%;
				transform: translateY(-50%);
			}
		}
	}

	.con-card-head {
		padding: 25rpx;
		display: flex;
		justify-content: space-between;
		font-size: 28rpx;
	}
	
	.con-card-head-label {
		background: #fa436a;
		font-size: 20rpx;
		color: #fff;
		padding: 4rpx 8rpx;
		border-radius: 6rpx;
		margin-left: 10rpx;
	}

	.con-card-line {
		height: 1rpx;
		width: 95%;
		background-color: #F7F7F7;
		margin-left: 2%;
	}

	.action-box {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		height: 100rpx;
		position: relative;
		padding-right: 30rpx;
	}

	.action-btn {
		width: 160rpx;
		height: 60rpx;
		margin: 0;
		margin-left: 24rpx;
		padding: 0;
		text-align: center;
		line-height: 60rpx;
		font-size: $font-sm + 2upx;
		color: $font-color-dark;
		background: #fff;
		border-radius: 100px;

		&:after {
			border-radius: 100px;
		}

		&.recom {
			background: #fff9f9;
			color: $base-color;

			&:after {
				border-color: #f7bcc8;
			}
		}
	}

	.con-card-center {
		display: flex;
		justify-content: space-between;
		padding: 20rpx;
	}

	.con-card-centre-img {
		height: 150rpx;
		width: 150rpx;
	}

	.con-card-centre-img-size {
		height: 150rpx;
		width: 150rpx;
		border-radius: 20rpx;
	}

	.con-card-centre-info {
		margin: 0 15rpx;
	}

	.con-card-centre-info-title {
		font-size: 26rpx;
		font-weight: bold;
		display: flex;
		justify-content: space-between;
	}

	.title-name {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
	}

	.title-price {
		color: #f35912;
	}

	.con-card-centre-info-size {
		font-size: 26rpx;
		color: #b3b7be;
		display: flex;
		justify-content: space-between;
		padding: 20rpx 0;
	}

	.con-card-collect {
		font-size: 26rpx;
		display: flex;
		justify-content: flex-end;
		padding: 20rpx;
	}

	.con-card-collect-totalPrice {
		color: #b3b7be;
	}

	.con-card-collect-pay {
		font-weight: bold;
		margin-left: 10rpx;
	}
</style>
