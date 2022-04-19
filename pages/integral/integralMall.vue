<!-- 积分商城integralMall -->
<template>
	<view class="container">
		<view class="content">
			<uni-row class="demo-uni-row">
				<uni-col :span="12" v-for="(item,index) of list" :key='index' >
					<view class="con_card" @click="clickDetails(item)">
						<view class="card_img">
							<image class="img_size" :src="item.urlSrc"></image>
						</view>
						<view class="card_footer">
							<view class="footer_title">
								{{ item.title }}
							</view>
							<view class="footer_integrate">{{ item.integrate }}积分预计可抵{{ item.integrate/100 }}元</view>
							<view class="footer_price">
								<text
									style="text-decoration: line-through;color:#fe712b;">￥{{ item.originalPrice }}</text>
								<text>抵后 ￥{{ item.deduction }}</text>
							</view>
						</view>
					</view>
				</uni-col>
			</uni-row>
			<tui-nomore text="到底啦~"></tui-nomore>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
						urlSrc: '../../static/images/favorite/1.jpg',
						title: '真无线蓝牙耳机 半入耳式耳机 音乐耳机 通用苹果华为小米手机',
						integrate: 888,
						originalPrice: 25.90,
						deduction: 18.13
					}, {
						urlSrc: '../../static/images/favorite/2.jpg',
						title: '真无线蓝牙耳机 半入耳式耳机 音乐耳机 通用苹果华为小米手机',
						integrate: 666,
						originalPrice: 25.90,
						deduction: 18.13
					},
					{
						urlSrc: '../../static/images/favorite/3.jpg',
						title: '真无线蓝牙耳机 半入耳式耳机 音乐耳机 通用苹果华为小米手机',
						integrate: 777,
						originalPrice: 25.90,
						deduction: 18.13
					},
					{
						urlSrc: '../../static/images/favorite/4.jpg',
						title: '真无线蓝牙耳机 半入耳式耳机 音乐耳机 通用苹果华为小米手机',
						integrate: 999,
						originalPrice: 25.90,
						deduction: 18.13
					},
					{
						urlSrc: '../../static/images/favorite/5.jpg',
						title: '真无线蓝牙耳机 半入耳式耳机 音乐耳机 通用苹果华为小米手机',
						integrate: 777,
						originalPrice: 25.90,
						deduction: 18.13
					},
					{
						urlSrc: '../../static/images/favorite/1.jpg',
						title: '真无线蓝牙耳机 半入耳式耳机 音乐耳机 通用苹果华为小米手机',
						integrate: 777,
						originalPrice: 25.90,
						deduction: 18.13
					}
				],
			}
		},

		methods: {
			// 点击进入商品详情
			clickDetails(item) {
				console.log(item);
				uni.navigateTo({
					url: '/pages/integralOrder/integralOrder',
				});
			}
		},
	}
</script>

<style scoped>
	page {
		background-color: #F7F7F7;
	}

	.content {
		margin-top: 10rpx;
	}

	.con_card {
		height: 550rpx;
		/* width: 50%; */
		background-color: #FFFFFF;
		border-radius: 6rpx;
		margin: 10rpx;
	}

	.card_img {
		height: 55%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.img_size {
		height: 250rpx;
		width: 250rpx;
	}

	.card_footer {
		margin-top: 20rpx;
	}

	.footer_title {
		font-size: 26rpx;
		margin: 15rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.footer_integrate {
		font-size: 16rpx;
		color: #fe712b;
		text-align: center;
		margin-top: 15rpx;
	}

	.footer_price {
		height: 50rpx;
		width: 90%;
		margin-left: 5%;
		margin-top: 15rpx;
		border-radius: 6rpx;

		/* 渐变 倾斜60度*/
		background: linear-gradient(-60deg, #EE7A45 0, #EE7A45 60%, #F9DCCE 0, #F9DCCE);

		font-size: 26rpx;
		color: #f1f1f1;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10rpx;
	}
</style>
