<template>
	<view class="content d-flex">
		<scroll-view scroll-y class="flex-shrink bg-white" style="width: 200rpx;height: 100%;">
			<view
				v-for="item in flist"
				:key="item.id"
				class="f-item b-b"
				:class="{ active: item.id === currentId }"
				@click="tabtap(item)"
			>
				{{ item.name }}
			</view>
		</scroll-view>
		<scroll-view
			scroll-with-animation
			scroll-y
			class="flex-1 pl-2"
			style="overflow: hidden;"
			@scroll="asideScroll"
			:scroll-top="tabScrollTop"
		>
			<view v-for="item in slist" :key="item.id" class="s-list" :id="'main-' + item.id">
				<text class="d-flex a-center fz28 text-dark" style="height: 70rpx;">{{ item.name }}</text>
				<view class="t-list">
					<view
						@click="navToList(item.id, titem.id)"
						v-if="titem.pid === item.id"
						class="flex-shrink all-flex-column fz26 pb-2 color666"
						style="width: 176rpx;"
						v-for="titem in tlist"
						:key="titem.id"
					>
						<image :src="titem.picture" style="width: 140rpx;height: 140rpx;"></image>
						<text>{{ titem.name }}</text>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
import { mapState } from 'vuex';
export default {
	data() {
		return {
			sizeCalcState: false,
			tabScrollTop: 0,
			currentId: 1,
			flist: [],
			slist: [],
			tlist: []
		};
	},
	onLoad() {
		this.loadData();
	},

	computed: {
		...mapState({
			cateList: state => state.category.cateList
		})
	},

	methods: {
		async loadData() {
			this.cateList.forEach(item => {
				if (!item.pid) {
					this.flist.push(item); //pid为父级id, 没有pid或者pid=0是一级分类
				} else if (!item.picture) {
					this.slist.push(item); //没有图的是2级分类
				} else {
					this.tlist.push(item); //3级分类
				}
			});
		},
		
		//一级分类点击
		tabtap(item) {
			if (!this.sizeCalcState) {
				this.calcSize();
			}

			this.currentId = item.id;
			let index = this.slist.findIndex(sitem => sitem.pid === item.id);
			this.tabScrollTop = this.slist[index].top;
		},
		
		//右侧栏滚动
		asideScroll(e) {
			if (!this.sizeCalcState) {
				this.calcSize();
			}
			let scrollTop = e.detail.scrollTop;
			let tabs = this.slist.filter(item => item.top <= scrollTop).reverse();
			if (tabs.length > 0) {
				this.currentId = tabs[0].pid;
			}
		},
		
		//计算右侧栏每个tab的高度等信息
		calcSize() {
			let h = 0;
			this.slist.forEach(item => {
				let view = uni.createSelectorQuery().select('#main-' + item.id);
				view.fields(
					{
						size: true
					},
					data => {
						item.top = h;
						h += data.height;
						item.bottom = h;
					}
				).exec();
			});
			this.sizeCalcState = true;
		},
		navToList(sid, tid) {
			uni.navigateTo({
				url: `/pages/product/list?fid=${this.currentId}&sid=${sid}&tid=${tid}`
			});
		}
	}
};
</script>

<style lang="scss">
page,
.content {
	height: 100%;
	background-color: #f8f8f8;
}

.f-item {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100upx;
	font-size: 28upx;
	color: $font-color-base;
	position: relative;
	&.active {
		color: $base-color;
		background: #f8f8f8;
		&:before {
			content: '';
			position: absolute;
			left: 0;
			top: 50%;
			transform: translateY(-50%);
			height: 36upx;
			width: 8upx;
			background-color: $base-color;
			border-radius: 0 4px 4px 0;
			opacity: 0.8;
		}
	}
}
.t-list {
	display: flex;
	flex-wrap: wrap;
	width: 100%;
	background: #fff;
	padding-top: 12upx;
	&:after {
		content: '';
		flex: 99;
		height: 0;
	}
}
</style>
