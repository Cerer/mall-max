<!-- 粉丝fans -->
<template>
	<view class="container">
		<!-- 空白页 -->
		<view v-if="fansList && fansList.length == 0" class="con-empty">
			<tui-nomore text="我居然一个粉丝都没有"></tui-nomore>
		</view>

		<!-- 粉丝信息列表 -->
		<tui-list-view class="con-tui" v-else>
			<tui-list-cell class="con-tui-list" v-for="(item,index) of fansList" :key="index" @click="selectData(item)">
				<view class="con-tui-list-left">
					<view class="con-tui-list-left-img">
						<image class="con-tui-list-left-img-size" :src="item.imgSrc"></image>
					</view>
					<view class="con-tui-list-left-content">
						<text class="con-tui-list-left-content-title">{{ item.title }}</text>
						<text class="con-tui-list-left-content-fansNum">粉丝 {{ item.fansNum }}</text>
					</view>
				</view>
				<view class="con-tui-list-right">
					<tui-form-button background="#fa436a" color="#fa436a" width="140rpx" height="52rpx" :size="26"
						radius="50rpx" plain>
						看看TA
					</tui-form-button>
				</view>
			</tui-list-cell>
		</tui-list-view>

		<!-- 到底提醒 -->
		<tui-nomore text="到底啦"></tui-nomore>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				fansList: [{
						id: 1,
						imgSrc: "../../static/images/fans/1.jpg",
						title: "你的心头肉",
						fansNum: 0
					},
					{
						id: 1,
						imgSrc: "../../static/images/fans/2.jpg",
						title: "柠檬树下",
						fansNum: 240 + '万'
					},
					{
						id: 1,
						imgSrc: "../../static/images/fans/3.jpg",
						title: "关关雎鸠",
						fansNum: 140 + '万'
					}
				]
			}
		},

		methods: {
			// 点击选择数据
			selectData(item) {
				uni.navigateTo({
					url: "/pages/fans/fansDetails"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.con-empty {
		margin-top: 40%;
	}

	.con-tui-list {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.con-tui-list-left {
		display: flex;
		align-items: center;
	}

	.con-tui-list-left-img {
		height: 120rpx;
		width: 120rpx;
		border-radius: 50%;
		border: #bebebe;
	}

	.con-tui-list-left-img-size {
		height: 120rpx;
		width: 120rpx;
		border-radius: 50%;
	}

	.con-tui-list-left-content {
		display: flex;
		flex-direction: column;
		margin-left: 20rpx;
	}

	.con-tui-list-left-content-title {
		font-weight: bold;
	}

	.con-tui-list-left-content-fansNum {
		font-size: 22rpx;
		color: $font-color-light;
		margin-top: 20rpx;
	}
</style>
