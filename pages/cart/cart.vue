<template>
	<view class="container">
		<!-- 空白页 -->
		<view v-if="!hasLogin || empty === true" class="empty">
			<image src="/static/emptyCart.jpg" mode="aspectFit"></image>
			<view v-if="hasLogin" class="empty-tips">
				空空如也
				<navigator class="navigator" v-if="hasLogin" url="../index/index" open-type="switchTab">
					随便逛逛>
				</navigator>
			</view>
			<view v-else class="empty-tips">
				空空如也
				<view class="navigator" @click="navToLogin">去登陆></view>
			</view>
		</view>

		<view v-else>
			<!-- 列表 -->
			<view class="cart-list px-3">
				<block v-for="(item, index) in cartList" :key="item.id">
					<view
						class="cart-item d-flex position-relative py-3 py-4"
						:class="{ 'b-b': index !== cartList.length - 1 }"
					>
						<view class="flex-shrink position-relative">
							<image
								:src="item.image"
								:class="[item.loaded]"
								mode="aspectFill"
								lazy-load
								style="border-radius: 8rpx;width: 230rpx;height: 230rpx;"
								@load="onImageLoad('cartList', index)"
								@error="onImageError('cartList', index)"
							></image>
							<view
								class="yticon icon-xuanzhong2 checkbox"
								:class="{ checked: item.checked }"
								@click="check('item', index)"
							></view>
						</view>
						<view
							class="item-right d-flex flex-column flex-1 position-relative pl-3"
							style="overflow: hidden;"
						>
							<view class="d-flex flex-column" @click.stop="clickDetails(item)">
								<text class="clamp fz32 text-dark" style="height: 40rpx;line-height: 40rpx;">
									{{ item.title }}
								</text>
								<text class="fz26 text-light">{{ item.attr_val }}</text>
								<text v-if="cartType === 1" class="fz32 text-dark">¥{{ item.price }}</text>
								<text v-else class="fz32 text-dark" style="height: 50rpx;line-height: 50rpx;">
									{{ item.price }}积分
								</text>
							</view>

							<view class="ml-auto">
								<tui-numberbox
									:value="item.number"
									:height="50"
									:width="64"
									:min="1"
									:index="index"
									@change="numberChange"
								></tui-numberbox>
							</view>
						</view>
						<text class="del-btn yticon icon-fork " @click.stop="deleteCartItem(index)"></text>
					</view>
				</block>
			</view>
			<!-- 底部菜单栏 -->
			<view class="action-section">
				<view class="checkbox">
					<image
						:src="allChecked ? '/static/selected.png' : '/static/select.png'"
						mode="aspectFit"
						@click="check('all')"
					></image>
					<view class="clear-btn" :class="{ show: allChecked }" @click="clearCart">清空</view>
				</view>
				<view class="total-box">
					<text v-if="cartType === 1" class="price">¥{{ total }}</text>
					<text v-else class="price">{{ total }}积分</text>
					<text class="coupon" v-if="cartType === 1">
						已优惠
						<text>74.35</text>
						元
					</text>
				</view>
				<button type="primary" class="no-border confirm-btn" @click="createOrder">去结算</button>
			</view>
		</view>
	</view>
</template>

<script>
import { mapState } from 'vuex';
import uniNumberBox from '@/components/common/uni-number-box.vue';
export default {
	components: {
		uniNumberBox
	},
	data() {
		return {
			total: 0, //总价格
			allChecked: false, //全选状态  true|false
			empty: false, //空白页现实  true|false
			cartList: [],
			cartType: 1
		};
	},
	onLoad(option) {
		console.log(option);
		if (option.type) {
			console.log(option.type);
			// 1是商品购物车列表,2是积分购物车列表
			this.cartType = Number(option.type);
		}
		this.loadData();
	},
	watch: {
		//显示空白页
		cartList(e) {
			let empty = e.length === 0 ? true : false;
			if (this.empty !== empty) {
				this.empty = empty;
			}
		}
	},
	computed: {
		...mapState({
			hasLogin: state => state.user.hasLogin,
			cartLists: state => state.cart.cartList
		})
	},
	methods: {
		//请求数据
		async loadData() {
			let list = this.cartLists;
			let cartList = list.map(item => {
				item.checked = true;
				return item;
			});
			this.cartList = cartList;
			this.calcTotal(); //计算总价
		},

		//监听image加载完成
		onImageLoad(key, index) {
			this.$set(this[key][index], 'loaded', 'loaded');
		},

		//监听image加载失败
		onImageError(key, index) {
			this[key][index].image = '/static/errorImage.jpg';
		},

		// 登录
		navToLogin() {
			uni.navigateTo({
				url: '/pages/public/login'
			});
		},

		// 点击进入商品详情页
		clickDetails(item) {
			console.log(1111);
			let url = '';
			if (this.cartType === 1) {
				url = '/pages/product/product';
			} else {
				url = '/pages/integralOrder/integralOrder';
			}
			uni.navigateTo({
				url: url
			});
		},

		//选中状态处理
		check(type, index) {
			if (type === 'item') {
				this.cartList[index].checked = !this.cartList[index].checked;
			} else {
				const checked = !this.allChecked;
				const list = this.cartList;
				list.forEach(item => {
					item.checked = checked;
				});
				this.allChecked = checked;
			}
			this.calcTotal(type);
		},

		//数量
		numberChange(e) {
			this.cartList[e.index].number = e.value;
			this.calcTotal();
		},

		//删除
		deleteCartItem(index) {
			let list = this.cartList;
			let row = list[index];
			let id = row.id;

			this.cartList.splice(index, 1);
			this.calcTotal();
			uni.hideLoading();
		},

		//清空
		clearCart() {
			uni.showModal({
				content: '清空购物车？',
				success: e => {
					if (e.confirm) {
						this.cartList = [];
					}
				}
			});
		},

		//计算总价
		calcTotal() {
			let list = this.cartList;
			if (list.length === 0) {
				this.empty = true;
				return;
			}
			let total = 0;
			let checked = true;
			list.forEach(item => {
				if (item.checked === true) {
					total += item.price * item.number;
				} else if (checked === true) {
					checked = false;
				}
			});
			this.allChecked = checked;
			this.total = Number(total.toFixed(2));
		},

		//创建订单
		createOrder() {
			let list = this.cartList;
			let goodsData = [];
			list.forEach(item => {
				if (item.checked) {
					goodsData.push({
						attr_val: item.attr_val,
						number: item.number
					});
				}
			});

			uni.navigateTo({
				url: `/pages/order/createOrder?data=${JSON.stringify({
					goodsData: goodsData
				})}`
			});
			this.$api.msg('跳转下一页 sendData');
		}
	}
};
</script>

<style lang="scss">
.container {
	padding-bottom: 134upx;

	/* 空白页 */
	.empty {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100vh;
		padding-bottom: 100upx;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		background: #fff;

		image {
			width: 240upx;
			height: 160upx;
			margin-bottom: 30upx;
		}

		.empty-tips {
			display: flex;
			font-size: $font-sm + 2upx;
			color: $font-color-disabled;

			.navigator {
				color: $uni-color-primary;
				margin-left: 16upx;
			}
		}
	}
}

/* 购物车列表项 */
.checkbox {
	position: absolute;
	left: -16upx;
	top: -16upx;
	z-index: 8;
	font-size: 44upx;
	line-height: 1;
	padding: 4upx;
	color: $font-color-disabled;
	background: #fff;
	border-radius: 50px;
}

.del-btn {
	padding: 4upx 10upx;
	font-size: 34upx;
	height: 50upx;
	color: $font-color-light;
}

/* 底部栏 */
.action-section {
	/* #ifdef H5 */
	margin-bottom: 100upx;
	/* #endif */
	position: fixed;
	left: 30upx;
	bottom: 30upx;
	z-index: 95;
	display: flex;
	align-items: center;
	width: 690upx;
	height: 100upx;
	padding: 0 30upx;
	background: rgba(255, 255, 255, 0.9);
	box-shadow: 0 0 20upx 0 rgba(0, 0, 0, 0.5);
	border-radius: 16upx;

	.checkbox {
		height: 52upx;
		position: relative;

		image {
			width: 52upx;
			height: 100%;
			position: relative;
			z-index: 5;
		}
	}

	.clear-btn {
		position: absolute;
		left: 26upx;
		top: 0;
		z-index: 4;
		width: 0;
		height: 52upx;
		line-height: 52upx;
		padding-left: 38upx;
		font-size: $font-base;
		color: #fff;
		background: $font-color-disabled;
		border-radius: 0 50px 50px 0;
		opacity: 0;
		transition: 0.2s;

		&.show {
			opacity: 1;
			width: 120upx;
		}
	}

	.total-box {
		flex: 1;
		display: flex;
		flex-direction: column;
		text-align: right;
		padding-right: 40upx;

		.price {
			font-size: $font-lg;
			color: $font-color-dark;
		}

		.coupon {
			font-size: $font-sm;
			color: $font-color-light;

			text {
				color: $font-color-dark;
			}
		}
	}

	.confirm-btn {
		padding: 0 38upx;
		margin: 0;
		border-radius: 100px;
		height: 76upx;
		line-height: 76upx;
		font-size: $font-base + 2upx;
		background: $uni-color-primary;
		box-shadow: 1px 2px 5px rgba(217, 60, 93, 0.72);
	}
}

/* 复选框选中状态 */
.action-section .checkbox.checked,
.cart-item .checkbox.checked {
	color: $uni-color-primary;
}
</style>
