<!-- 退款页面drawBack -->
<template>
	<view class="container">
		<view class="tui-order-item">

			<!-- 商品信息 -->
			<tui-list-cell padding="20rpx 30rpx" :hover="false" :lineLeft="false">
				<view class="tui-goods-title">
					<view>商品信息</view>
				</view>
			</tui-list-cell>
			<block v-for="(item, index) in 2" :key="index">
				<tui-list-cell padding="0" @click="clickDetail">
					<navigator hover-class="none" class="tui-goods-item">
						<image :src="`/static/images/mall/product/${index + 3}.jpg`" class="tui-goods-img"></image>
						<view class="tui-goods-center">
							<view class="tui-goods-name">欧莱雅（LOREAL）奇焕光彩粉嫩透亮修颜霜 30ml（欧莱雅彩妆 BB霜 粉BB 遮瑕疵 隔离）</view>
							<view class="tui-goods-attr">黑色，50ml</view>
						</view>
						<view class="tui-price-right">
							<view>￥298.00</view>
							<view>x2</view>
						</view>
					</navigator>
				</tui-list-cell>
			</block>
		</view>

		<!-- 退款选择信息 -->
		<view class="tui-refund__form">
			<tui-list-cell :hover="false" padding="0">
				<view class="tui-line-cell">
					<view class="tui-title">
						<text class="tui-color__red">*</text>
						<text>申请类型</text>
					</view>
					<input placeholder-class="tui-phcolor" class="tui-input" type="text" value="退货退款" disabled />
				</view>
			</tui-list-cell>

			<tui-list-cell padding="0" arrow>
				<view class="tui-line-cell" @click="popupShow = true">
					<view class="tui-title">
						<text class="tui-color__red">*</text>
						<text>申请原因</text>
					</view>
					<input placeholder-class="tui-phcolor" class="tui-input" type="text"
						:placeholder="refundReason?refundReason:'请选择退款原因'" disabled />
				</view>
			</tui-list-cell>

			<tui-list-cell :hover="false" padding="0">
				<view class="tui-line-cell">
					<view class="tui-title">
						<text class="tui-color__red">*</text>
						<text>退款金额</text>
					</view>
					<input placeholder-class="tui-phcolor" class="tui-input" type="text" value="￥596.00" disabled />
				</view>
			</tui-list-cell>

			<tui-list-cell :hover="false" padding="0">
				<view class="tui-line-cell">
					<view class="tui-title">
						<text class="tui-color__red">*</text>
						<text>申请说明</text>
					</view>
					<input v-model="applyInstructions" placeholder-class="tui-phcolor" class="tui-input" type="text"
						placeholder="请填写申请说明" />
				</view>
			</tui-list-cell>
		</view>

		<view class="tui-btn__box" @click="submitTap">
			<tui-form-button height="88rpx" shadow radius="50rpx" background="#fa436a">提交申请</tui-form-button>
		</view>

		<!-- //选择申请原因 -->
		<tui-bottom-popup backgroundColor="#FFFFFF" :height="650" :show="popupShow" :zIndex="1002" :maskZIndex="1001">
			<tui-icon name="shut" :size="20" style="float: right;margin: 20rpx;" @click="popupShow=false"></tui-icon>
			<view class="tui-backReason">退款原因</view>

			<tui-list-view style="margin: 20rpx;">
				<radio-group @change="radioChange">
					<tui-list-cell v-for="(item,index) in items" :key="index">
						<label class="thorui-flex__between">
							<text class="thorui-left__sm">{{item.name}}</text>
							<radio color="#fa436a" :value="item.value" :checked="item.checked || false"></radio>
						</label>
					</tui-list-cell>
				</radio-group>
			</tui-list-view>
		</tui-bottom-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				refundReason: '', //申请原因
				applyInstructions: '', //申请说明
				popupShow: false,
				items: [{
						value: "1",
						name: '尺寸拍错/不喜欢/效果不好',
						checked: true
					}, {
						value: "2",
						name: '材料不符/材质造假'
					},
					{
						value: "3",
						name: '尺寸大小不符'
					},
					{
						value: "4",
						name: '做工问题'
					},
					{
						value: "5",
						name: '颜色/款式/符号等描述不符'
					},
					{
						value: "6",
						name: '退运费'
					}
				]
			}
		},

		methods: {
			// 跳转到详情
			clickDetail() {
				uni.navigateTo({
					url: "/pages/product/product",
				});
			},

			// 选择退款原因
			radioChange(e) {
				let self = this;
				let value = e.detail.value;
				self.items.forEach(i => {
					if (value === i.value) {
						this.refundReason = i.name;
					}
				})
				self.popupShow = false;
			},
			
			// 提交申请
			submitTap(){
				uni.navigateBack({
					delta: 1
				});
			}
		},
	}
</script>

<style scoped>
	page {
		background-color: #F7F7F7;
	}

	.tui-order-item {
		margin-top: 20rpx;
		border-radius: 10rpx;
		overflow: hidden;
	}

	.tui-goods-title {
		width: 100%;
		font-size: 28rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.tui-goods-item {
		width: 100%;
		padding: 20rpx 30rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
	}

	.tui-goods-img {
		width: 180rpx;
		height: 180rpx;
		display: block;
		flex-shrink: 0;
	}

	.tui-goods-center {
		flex: 1;
		padding: 20rpx 8rpx;
		box-sizing: border-box;
	}

	.tui-goods-name {
		max-width: 310rpx;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		font-size: 26rpx;
		line-height: 32rpx;
	}

	.tui-goods-attr {
		font-size: 22rpx;
		color: #888888;
		line-height: 32rpx;
		padding-top: 20rpx;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}

	.tui-price-right {
		text-align: right;
		font-size: 24rpx;
		color: #888888;
		line-height: 30rpx;
		padding-top: 20rpx;
	}

	.tui-refund__form {
		margin-top: 20rpx;
	}

	.tui-line-cell {
		width: 100%;
		padding: 24rpx 30rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
	}

	.tui-title {
		width: 180rpx;
		font-size: 28rpx;
		color: #666;
	}

	.tui-color__red {
		color: #EB0909;
		padding-right: 6rpx;
	}

	.tui-phcolor {
		color: #ccc;
		font-size: 28rpx;
	}

	.tui-input {
		width: 500rpx;
		font-size: 28rpx;
	}

	.tui-btn__box {
		padding: 60rpx 30rpx;
	}

	.tui-backReason {
		margin-left: 40%;
		padding-top: 20rpx;
	}

	.thorui-flex__between {
		display: flex;
		justify-content: space-between;
	}
</style>
