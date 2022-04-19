<!-- 我的收藏favorite -->
<template>
	<view>
		<view v-if="favoriteList && favoriteList.length > 0" style="margin-top: 20rpx;">
			<tui-list-view>
				<tui-swipe-action v-for="(item,index) in favoriteList" :key="index" :actions="actions"
					:params="{index:index}" @click="clickSwipe">
					<template v-slot:content>
						<tui-list-cell class="favorite-box" @click="clickNavto(item)">
							<view class="favorite-img">
								<image :src="item.imgSrc"></image>
							</view>
							<view class="favorite-cont">
								<text class="text-mowrap">{{item.title}}</text>
								<view class="favo-favorite">{{item.favorite}}+人收藏</view>
								<view class="favo-price">¥{{item.price}}</view>
							</view>
						</tui-list-cell>
					</template>
				</tui-swipe-action>
			</tui-list-view>
		</view>

		<!-- 空白页,没有收藏 -->
		<empty v-else></empty>
	</view>
</template>

<script>
	import empty from "@/components/common/empty";
	export default {
		components: {
			empty
		},
		data() {
			return {
				// 滑动模块操作
				actions: [{
					name: '去店铺',
					color: '#fff',
					fontsize: 30, //单位rpx
					width: 70, //单位px
					background: '#ee6706'
				}, {
					name: '删除',
					color: '#fff',
					fontsize: 30, //单位rpx
					width: 70, //单位px
					background: '#fa436a'
				}],

				// 收藏数据
				favoriteList: [{
					imgSrc: "../../static/images/favorite/1.jpg",
					title: "真无线蓝牙耳机 半入耳式耳机 音乐耳机 通用苹果华为小米手机",
					favorite: 1234,
					price: 234
				}, {
					imgSrc: "../../static/images/favorite/2.jpg",
					title: "真无线蓝牙耳机 半入耳式耳机 音乐耳机 通用苹果华为小米手机",
					favorite: 1234,
					price: 234
				}, {
					imgSrc: "../../static/images/favorite/3.jpg",
					title: "真无线蓝牙耳机 半入耳式耳机 音乐耳机 通用苹果华为小米手机",
					favorite: 1234,
					price: 234
				}, {
					imgSrc: "../../static/images/favorite/4.jpg",
					title: "真无线蓝牙耳机 半入耳式耳机 音乐耳机 通用苹果华为小米手机",
					favorite: 1234,
					price: 234
				}, {
					imgSrc: "../../static/images/favorite/5.jpg",
					title: "真无线蓝牙耳机 半入耳式耳机 音乐耳机 通用苹果华为小米手机",
					favorite: 1234,
					price: 234
				}],

			}
		},

		methods: {
			// 跳转到详情
			clickNavto(item) {
				uni.navigateTo({
					url: '/pages/product/product'
				})
			},

			// 操作
			clickSwipe(row) {
				let self = this;
				let delIndex = row.item.index;

				// 去店铺
				if (row.index === 0) {
					uni.navigateTo({
						url: '/pages/shop/shop'
					})
				} else { //删除
					self.favoriteList.splice(delIndex, 1);
					uni.showToast({
						title: "取消收藏成功",
						icon: "none"
					})
				}
			}
		}
	}
</script>

<style scoped>
	page {
		background: #F4F4F4;
	}

	.favorite-box {
		display: flex;

	}

	.favorite-img image {
		width: 160rpx;
		height: 160rpx;
		margin-right: 20rpx;
	}

	.favorite-cont {
		font-size: 28rpx;
		color: #333333;
		line-height: 40rpx;
		width: 75%;
	}

	.text-mowrap {
		font-weight: bold;
		font-size: 26rpx;
		white-space: normal;
	}

	.favo-favorite {
		font-size: 24rpx;
		color: #c3c3c3;
	}

	.favo-price {
		font-size: 30rpx;
		color: #f0550e;
	}
</style>
