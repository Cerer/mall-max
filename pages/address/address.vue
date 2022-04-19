<template>
	<view class="b-t position-relative">
		<view
			class="b-b position-relative d-flex a-center bg-white py-2 px-3"
			v-for="(item, index) in addressList"
			:key="index"
			@click="checkAddress(item)"
		>
			<view class="d-flex flex-column flex-1">
				<view class="d-flex a-center">
					<text v-if="item.default" class="tag">默认</text>
					<text class="fz30 font-color-dark">{{ item.addressName }} {{ item.area }}</text>
				</view>
				<view class="fz28 font-color-light mt-2">
					<text class="mr-3">{{ item.name }}</text>
					<text>{{ item.mobile }}</text>
				</view>
			</view>
			<text class="yticon icon-bianji" @click.stop="addAddress('edit', item)"></text>
		</view>

		<button class="add-btn" @click="addAddress('add')">新增地址</button>
	</view>
</template>

<script>
import { mapState } from 'vuex';
export default {
	data() {
		return {
			source: 0
		};
	},

	computed: {
		...mapState({
			addressList: state => state.address.addressList
		})
	},

	onLoad(option) {
		this.source = option.source;
	},

	methods: {
		//选择地址
		checkAddress(item) {
			if (this.source == 1) {
				//this.$api.prePage()获取上一页实例，在App.vue定义
				this.$api.prePage().addressData = item;
				uni.navigateBack();
			}
		},
		
		// 跳转到添加页
		addAddress(type, item) {
			uni.navigateTo({
				url: `/pages/address/addressManage?type=${type}&data=${JSON.stringify(item)}`
			});
		},
		
		//添加或修改成功之后回调
		refreshList(data, type) {
			this.addressList.unshift(data);
		}
	}
};
</script>

<style lang="scss">
page {
	padding-bottom: 120upx;
}
.tag {
	font-size: 24upx;
	color: $base-color;
	margin-right: 10upx;
	background: #fffafb;
	border: 1px solid #ffb4c7;
	border-radius: 4upx;
	padding: 4upx 10upx;
	line-height: 1;
}

.icon-bianji {
	display: flex;
	align-items: center;
	height: 80upx;
	font-size: 40upx;
	color: $font-color-light;
	padding-left: 30upx;
}
</style>
