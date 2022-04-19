<!-- 消息 message-->
<template>
	<view class="container">
		<tui-list-view color="#777" class="con_tui_list">
			<tui-list-cell class="con_list_cell" v-for="item of list" :key="item.index" :index="item.index"
				padding="25rpx" :size="30" @click="clickList">
				<view class="con_cell_content">
					<view class="con_content_icon" :style="{'background-color':item.bcColor}">
						<tui-icon :name="item.iconName" color="#fff" :size="30"></tui-icon>
					</view>

					<view class="con_content_title">
						{{ item.title }}
						<tui-badge :position="false" type="red" absolute top="65rpx" right="30rpx">
							{{ item.badgeNum }}
						</tui-badge>
					</view>
				</view>

			</tui-list-cell>
		</tui-list-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
						index: 1,
						title: "系统消息",
						iconName: "message",
						bcColor: "#49b0ff",
						badgeNum: 4
					},
					{
						index: 2,
						title: "互动消息",
						iconName: "community-fill",
						bcColor: "#ff6334",
						badgeNum: 5
					},
					{
						index: 3,
						title: "通知公告",
						iconName: "notice",
						bcColor: "#09c275",
						badgeNum: 3
					}
				]
			}
		},

		methods: {
			// 点击列表
			clickList(index) {
				let indexs = index.index;
				let url = "";
				if (indexs == 1) {
					url = "/pages/message/systemMessages";
				} else if (indexs == 2) {
					url = "/pages/message/interactMessages";
				} else {
					url = "/pages/message/notice";
				}
				uni.navigateTo({
					url: url
				})
			}
		}
	}
</script>

<style scoped>
	.con_cell_content {
		display: flex;
		align-items: center;
	}

	.con_content_icon {
		height: 90rpx;
		width: 90rpx;
		border-radius: 10rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.con_content_title {
		padding-left: 20rpx;
	}
</style>
