<!-- 关注follow -->
<template>
	<view class="container">
		<!-- 空白页 -->
		<view v-if="followList && followList.length == 0" class="con-empty">
			<tui-nomore text="我居然一个人也没关注~"></tui-nomore>
		</view>

		<!-- 关注信息列表 -->
		<tui-list-view class="con-tui" v-else>
			<tui-list-cell class="con-tui-list" v-for="(item,index) of followList" :key="index"
				@click="selectData(item)">
				<view class="con-tui-list-left">
					<view class="con-tui-list-left-img">
						<image class="con-tui-list-left-img-size" :src="item.imgSrc" mode=""></image>
					</view>
					<view class="con-tui-list-left-content">
						<text class="con-tui-list-left-content-title">{{ item.title }}</text>
						<text class="con-tui-list-left-content-intro">{{ item.intro }}</text>
						<text class="con-tui-list-left-content-fansNum">粉丝 {{ item.fansNum }}</text>
					</view>
				</view>
				<view class="con-tui-list-right">
					<tui-button @click.native.stop="cancelFollow(index)" type="gray" width="140rpx" height="52rpx"
						:size="26" shape="circle" plain>
						已关注
					</tui-button>
				</view>
			</tui-list-cell>
		</tui-list-view>


		<!-- 到底提醒 -->
		<tui-nomore text="到底啦"></tui-nomore>

		<!-- 取消关注弹框 -->
		<tui-modal :show="isModal" width="70%" content="确定取消关注？" :button="button" color="#4b4b4b" @click="confirmOK">
		</tui-modal>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				followList: [{
						id: 1,
						imgSrc: "../../static/images/follow/1.jpg",
						title: "以樱花之名",
						intro: "小超人 舅妈精选全球好货~",
						fansNum: 45.1 + '万',
					},
					{
						id: 2,
						imgSrc: "../../static/images/follow/2.jpg",
						title: "DIYI小清新",
						intro: "性价比女装，每日海量上新",
						fansNum: 192.6 + "万",
					},
					{
						id: 3,
						imgSrc: "../../static/images/follow/3.jpg",
						title: "小新家每天上新",
						intro: "",
						fansNum: 155.5 + "万",
					},
					{
						id: 4,
						imgSrc: "../../static/images/follow/4.jpg",
						title: "丸子君的店",
						intro: "遇见就是美丽的安排",
						fansNum: 77.1 + "万",
					}
				],

				// 判断是否显示取消关注弹框
				isModal: false,

				// 取消关注弹框按钮信息
				button: [{
						text: "取消",
						type: "gray",
						plain: true
					},
					{
						text: "确定",
						type: "primary",
						plain: false
					}
				],

				// 选中的数据
				selectIndex: null
			}
		},

		methods: {
			// 选择数据进入对应店铺
			selectData(item) {
				let self = this;
				uni.navigateTo({
					url: "/pages/shop/shop"
				})
			},

			// 点击取消关注
			cancelFollow(index) {
				let self = this;
				self.isModal = true;
				self.selectIndex = index;
			},

			confirmOK(item) {
				let self = this;
				if (item.index == 1) {
					self.followList.splice(self.selectIndex, 1)
				}
				self.isModal = false;
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

	.con-tui-list-left-content-intro {
		font-size: 22rpx;
		margin: 10rpx 0 10rpx;
		color: $font-color-light;
	}

	.con-tui-list-left-content-fansNum {
		font-size: 22rpx;
		color: $font-color-light;
	}
</style>
