<!-- 通知公告详情noticeDetails -->
<template>
	<view class="container">
		<view class="con-img">
			<image class="con-img-imag" src="../../static/images/message/new1.jpg" mode=""></image>
		</view>

		<view class="con-headline">
			<i>限时满减</i>
		</view>

		<tui-list-view>
			<tui-list-cell :arrow="false" class="tui-box" v-for="(item,index) of list" :key="index"
				@click="clickDetails(item)">
				<view class="tui-box-img">
					<image class="tui-box-img-imag" :src="item.image" mode=""></image>
				</view>

				<view class="tui-box-centent">
					<view class="tui-box-centent-head">
						<text class="tb-centent-head-title">{{ item.title }}</text>
						<text class="tb-centent-head-attr">{{ item.attr }}</text>
					</view>
					<view class="tui-box-centent-foot">
						<text class="tb-centent-foot-price">￥{{ item.price }}</text>
						<view class="tb-centent-foot-price-iconBox" @click.native.stop="addCart(item)">
							<tui-icon name="cart" :size="20" color="#FFFFFF"></tui-icon>
						</view>
					</view>
				</view>
			</tui-list-cell>
		</tui-list-view>

		<tui-nomore text="到底啦"></tui-nomore>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
						image: "../../static/images/message/product1.jpg",
						title: "供港基地水果黄瓜 450g/份",
						attr: "一份3~6根，新鲜采摘水分足，生鲜凉拌生鲜凉拌生鲜凉拌生鲜凉拌",
						price: 12.90
					},
					{
						image: "../../static/images/message/product2.jpg",
						title: "供港基地水果黄瓜 450g/份",
						attr: "一份3~6根，新鲜采摘水分足，生鲜凉拌生鲜凉拌生鲜凉拌生鲜凉拌",
						price: 12.90
					},
					{
						image: "../../static/images/message/product3.jpg",
						title: "供港基地水果黄瓜 450g/份",
						attr: "一份3~6根，新鲜采摘水分足，生鲜凉拌生鲜凉拌生鲜凉拌生鲜凉拌",
						price: 12.90
					},
					{
						image: "../../static/images/message/product4.jpg",
						title: "供港基地水果黄瓜 450g/份",
						attr: "一份3~6根，新鲜采摘水分足，生鲜凉拌生鲜凉拌生鲜凉拌生鲜凉拌",
						price: 12.90
					}
				]
			}
		},

		methods: {
			// 进入商品详情
			clickDetails(item){
				uni.navigateTo({
					url: '/pages/product/product'
				});
			},
			
			// 加入购物车
			addCart(item) {
				uni.showToast({
					title: '加入购物车成功',
					icon: 'none'
				});
			}
		},
	}
</script>

<style scoped>
	page {
		background-color: #f7f7f7;
	}

	.con-img {
		height: 300rpx;
	}

	.con-img-imag {
		height: 300rpx;
		width: 100%;
	}

	.con-headline {
		background-color: #ffffff;
		padding: 30rpx 0;
		text-align: center;
		font-weight: bold;
		letter-spacing: 10rpx;
	}

	.tui-box {
		display: flex;
		justify-content: space-between;
	}

	.tui-box-img {
		height: 180rpx;
		width: 180rpx;
	}

	.tui-box-img-imag {
		height: 180rpx;
		width: 180rpx;
	}

	.tui-box-centent {
		margin: 0 20rpx;
	}

	.tui-box-centent-head {
		line-height: 40rpx;
		display: flex;
		flex-direction: column;
	}

	.tb-centent-head-title {
		color: #000000;
	}

	.tb-centent-head-attr {
		font-size: 20rpx;
		color: #a6a6a6;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
	}

	.tui-box-centent-foot {
		display: flex;
		margin-top: 30rpx;
		justify-content: space-between;
	}

	.tb-centent-foot-price {
		color: #f45e23;
		font-weight: bold;
	}

	.tb-centent-foot-price-iconBox {
		padding: 10rpx;
		border-radius: 50%;
		background-color: #fa436a;
	}
</style>
