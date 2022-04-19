<template>
	<view class="content">
		<view class="navbar" :style="{position:headerPosition,top:headerTop}">
			<view class="nav-item" :class="{current: filterIndex === 0}" @click="tabClick(0)">
				综合排序
			</view>
			<view class="nav-item" :class="{current: filterIndex === 1}" @click="tabClick(1)">
				销量优先
			</view>
			<view class="nav-item" :class="{current: filterIndex === 2}" @click="tabClick(2)">
				<text>价格</text>
				<view class="p-box">
					<text :class="{active: priceOrder === 1 && filterIndex === 2}" class="yticon icon-shang"></text>
					<text :class="{active: priceOrder === 2 && filterIndex === 2}" class="yticon icon-shang xia"></text>
				</view>
			</view>
			<text class="cate-item yticon icon-fenlei1" @click="toggleCateMask('show')"></text>
		</view>
		<view class="goods-list">
			<view v-for="(item, index) in goodsList" :key="index" class="goods-item" @click="navToDetailPage(item)">
				<view class="image-wrapper">
					<image :src="item.image" mode="aspectFill"></image>
				</view>
				<text class="title clamp">{{item.title}}</text>
				<view class="price-box">
					<text class="price">{{item.price}}</text>
					<text>已售 {{item.sales}}</text>
				</view>
			</view>
		</view>
		<uni-load-more :status="loadingType"></uni-load-more>

		<view class="cate-mask" :class="cateMaskState===0 ? 'none' : cateMaskState===1 ? 'show' : ''"
			@click="toggleCateMask">
			<view class="cate-content" @click.stop.prevent="stopPrevent" @touchmove.stop.prevent="stopPrevent">
				<scroll-view scroll-y class="cate-list">
					<!-- 价格start -->
					<view class="tui-drawer-title">
						<text class="tui-title-bold">价格区间</text>
					</view>
					<view class="tui-drawer-content">
						<input placeholder-class="tui-phcolor" class="tui-input" placeholder="最低价" maxlength="11"
							type="number" v-model="minVal" />
						<tui-icon name="reduce" color="#333" :size="14"></tui-icon>
						<input placeholder-class="tui-phcolor" class="tui-input" placeholder="最高价" maxlength="11"
							type="number" v-model="maxVal" />
					</view>
					<!-- 价格end -->

					<!-- 分类start -->
					<view class="tui-drawer-title">
						<text class="tui-title-bold">全部分类</text>
						<view class="tui-all-box tui-icon-ml" @tap="iocn1 = !iocn1">
							<view class="tui-attr-right">全部</view>
							<view :class="{'iocnstate2':iocn1}" class="iocnstate">
								<tui-icon name="arrowdown" :size="14" color="#444"></tui-icon>
							</view>
						</view>
					</view>
					<view class="tui-drawer-content tui-flex-attr" v-if="iocn1">
						<block v-for="(item,index) in onwList" :key='index'>
							<view class="tui-attr-item" :class="{'tui-btmItem-active':index == onwListId}"
								@tap="taptui(index,1)">
								<view>{{item}}</view>
							</view>
						</block>
					</view>
					<!-- 分类end -->

					<!-- 品牌start -->
					<view class="tui-drawer-title">
						<text class="tui-title-bold">品牌</text>
						<view class="tui-all-box tui-icon-ml" @tap="iocn2 = !iocn2">
							<block v-for="(item,index) in twoTxt">
								<view class="tui-attr-right tui-active">{{item}}</view>
							</block>
							<view :class="{'iocnstate2':iocn2}" class="iocnstate">
								<tui-icon name="arrowdown" :size="14" color="#444"></tui-icon>
							</view>
						</view>
					</view>
					<view class="tui-drawer-content tui-flex-attr" v-if="iocn2">
						<block v-for="(item,index) in twoList">
							<view class="tui-attr-item" @tap="Taptwo(index)"
								:class="{'tui-btmItem-active': item.state == 1}">
								<view class="tui-attr-ellipsis">{{item.name}}</view>
							</view>
						</block>
					</view>
					<!-- 品牌end -->

					<!-- 尺码start -->
					<view class="tui-drawer-title">
						<text class="tui-title-bold">尺码</text>
						<view class="tui-all-box tui-icon-ml" @tap="iocn3 = !iocn3">
							<view class="tui-attr-right">全部</view>
							<view :class="{'iocnstate2':iocn3}" class="iocnstate">
								<tui-icon name="arrowdown" :size="14" color="#444"></tui-icon>
							</view>
						</view>
					</view>
					<view class="tui-drawer-content tui-flex-attr">
						<block v-for="(item,index) in 20" v-if="iocn3">
							<view class="tui-attr-item" :class="{'tui-btmItem-active':index == attr_itemId}"
								@tap="taptui(index,2)">
								<view class="tui-attr-ellipsis">{{index+20}}</view>
							</view>
						</block>
					</view>
					<!-- 尺码end -->

					<view class="tui-safearea-bottom"></view>
				</scroll-view>

				<view class="tui-attr-btnbox">
					<view class="tui-attr-safearea">
						<view class="tui-drawer-btn tui-drawerbtn-black" hover-class="tui-white-hover"
							:hover-stay-time="150" @tap="tapReset">重置</view>
						<view class="tui-drawer-btn tui-drawerbtn-primary" hover-class="tui-red-hover"
							:hover-stay-time="150" @tap="confirmDrawer">确定(80万+件商品)</view>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import uniLoadMore from '@/components/common/uni-load-more/uni-load-more.vue';
	export default {
		components: {
			uniLoadMore
		},
		data() {
			return {
				cateMaskState: 0, //分类面板展开状态
				headerPosition: "fixed",
				headerTop: "0px",
				loadingType: 'more', //加载更多状态
				filterIndex: 0,
				cateId: 0, //已选三级分类id
				priceOrder: 0, //1 价格从低到高 2价格从高到低

				goodsList: [],

				minVal: '',
				maxVal: '',
				iocn1: true,
				iocn2: true,
				iocn3: true,
				onwListId: 0,
				onwList: ['男装', '女装', '运动服饰', '户外鞋服', '文化', '服饰配件', '流行男鞋', '艺术'],
				twoTxt: [],
				twoList: [{
					name: '花花公子',
					state: 0
				}, {
					name: '七匹狼',
					state: 0
				}, {
					name: '吉普',
					state: 0
				}],

				attr_itemId: 0,

				// 筛选数据
				filterList: []
			};
		},

		onLoad(options) {
			// #ifdef H5
			this.headerTop = document.getElementsByTagName('uni-page-head')[0].offsetHeight + 'px';
			// #endif
			this.cateId = options.tid;
			this.loadData();
		},

		onPageScroll(e) {
			//兼容iOS端下拉时顶部漂移
			if (e.scrollTop >= 0) {
				this.headerPosition = "fixed";
			} else {
				this.headerPosition = "absolute";
			}
		},

		//下拉刷新
		onPullDownRefresh() {
			this.loadData('refresh');
		},

		//加载更多
		onReachBottom() {
			this.loadData();
		},

		methods: {

			//加载商品 ，带下拉刷新和上滑加载
			async loadData(type = 'add', loading) {
				//没有更多直接返回
				if (type === 'add') {
					if (this.loadingType === 'nomore') {
						return;
					}
					this.loadingType = 'loading';
				} else {
					this.loadingType = 'more'
				}

				let goodsList = await this.$api.json('goodsList');
				if (type === 'refresh') {
					this.goodsList = [];
				}
				//筛选，测试数据直接前端筛选了
				if (this.filterIndex === 1) {
					goodsList.sort((a, b) => b.sales - a.sales)
				}
				if (this.filterIndex === 2) {
					goodsList.sort((a, b) => {
						if (this.priceOrder == 1) {
							return a.price - b.price;
						}
						return b.price - a.price;
					})
				}

				this.goodsList = this.goodsList.concat(goodsList);

				this.filterList = JSON.parse(JSON.stringify(this.goodsList));

				//判断是否还有下一页，有是more  没有是nomore(测试数据判断大于20就没有了)
				this.loadingType = this.goodsList.length > 20 ? 'nomore' : 'more';
				if (type === 'refresh') {
					if (loading == 1) {
						uni.hideLoading()
					} else {
						uni.stopPullDownRefresh();
					}
				}
			},

			//筛选点击
			tabClick(index) {
				if (this.filterIndex === index && index !== 2) {
					return;
				}
				this.filterIndex = index;
				if (index === 2) {
					this.priceOrder = this.priceOrder === 1 ? 2 : 1;
				} else {
					this.priceOrder = 0;
				}
				uni.pageScrollTo({
					duration: 300,
					scrollTop: 0
				})
				this.loadData('refresh', 1);
				uni.showLoading({
					title: '正在加载'
				})
			},

			//显示分类面板
			toggleCateMask(type) {
				let timer = type === 'show' ? 10 : 300;
				let state = type === 'show' ? 1 : 0;
				this.cateMaskState = 2;
				setTimeout(() => {
					this.cateMaskState = state;
				}, timer)
			},

			//详情
			navToDetailPage(item) {
				//测试数据没有写id，用title代替
				let id = item.title;
				uni.navigateTo({
					url: `/pages/product/product?id=${id}`
				})
			},

			stopPrevent() {},

			// 分类，尺码
			taptui(index, e) {
				if (e == 1) {
					this.onwListId = index
				} else if (e == 2) {
					this.attr_itemId = index
				} else if (e == 3) {}
			},

			// 品牌筛选
			Taptwo(index) {
				this.twoList[index].state = !this.twoList[index].state
				this.twoTxt = this.twoList.map(x => {
					if (x.state) {
						return x.name
					}
				})
			},

			//重置
			tapReset() {
				this.minVal = null;
				this.maxVal = null;
				this.iocn1 = true;
				this.iocn2 = true;
				this.iocn3 = true;
				this.twoTxt = [];
				this.onwListId = 0;
				this.attr_itemId = 0;
				for (let i = 0; i < this.twoList.length; i++) {
					this.twoList[i].state = false;
				}
			},

			// 确定
			confirmDrawer() {
				let self = this;
				let arr = [];

				// 有问题
				// if (self.minVal || self.maxVal) {
				// 	arr = self.filterList.filter(i => {
				// 		if (Number(self.minVal) <= i.price <= Number(self.maxVal)) {
				// 			return i;
				// 		}
				// 	});
				// }

				// self.goodsList = arr;

				self.cateMaskState = 0;
			}
		},
	}
</script>

<style lang="scss">
	page,
	.content {
		background: $page-color-base;
	}

	.content {
		padding-top: 96upx;
	}

	.navbar {
		position: fixed;
		left: 0;
		top: var(--window-top);
		display: flex;
		width: 100%;
		height: 80upx;
		background: #fff;
		box-shadow: 0 2upx 10upx rgba(0, 0, 0, .06);
		z-index: 10;

		.nav-item {
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			font-size: 30upx;
			color: $font-color-dark;
			position: relative;

			&.current {
				color: $base-color;

				&:after {
					content: '';
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%);
					width: 120upx;
					height: 0;
					border-bottom: 4upx solid $base-color;
				}
			}
		}

		.p-box {
			display: flex;
			flex-direction: column;

			.yticon {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 30upx;
				height: 14upx;
				line-height: 1;
				margin-left: 4upx;
				font-size: 26upx;
				color: #888;

				&.active {
					color: $base-color;
				}
			}

			.xia {
				transform: scaleY(-1);
			}
		}

		.cate-item {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			width: 80upx;
			position: relative;
			font-size: 44upx;

			&:after {
				content: '';
				position: absolute;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
				border-left: 1px solid #ddd;
				width: 0;
				height: 36upx;
			}
		}
	}

	/* 分类 */
	.cate-mask {
		position: fixed;
		left: 0;
		top: var(--window-top);
		bottom: 0;
		width: 100%;
		background: rgba(0, 0, 0, 0);
		z-index: 95;
		transition: .3s;

		.cate-content {
			width: 700upx;
			height: 100%;
			background: #fff;
			float: right;
			transform: translateX(100%);
			transition: .3s;
		}

		&.none {
			display: none;
		}

		&.show {
			background: rgba(0, 0, 0, .4);

			.cate-content {
				transform: translateX(0);
			}
		}
	}

	.cate-list {
		display: flex;
		flex-direction: column;
		height: 100%;

		.cate-item {
			display: flex;
			align-items: center;
			height: 90upx;
			padding-left: 30upx;
			font-size: 28upx;
			color: #555;
			position: relative;
		}

		.two {
			height: 64upx;
			color: #303133;
			font-size: 30upx;
			background: #f8f8f8;
		}

		.active {
			color: $base-color;
		}
	}

	/* 商品列表 */
	.goods-list {
		display: flex;
		flex-wrap: wrap;
		padding: 0 30upx;
		background: #fff;

		.goods-item {
			display: flex;
			flex-direction: column;
			width: 48%;
			padding-bottom: 40upx;

			&:nth-child(2n+1) {
				margin-right: 4%;
			}
		}

		.image-wrapper {
			width: 100%;
			height: 330upx;
			border-radius: 3px;
			overflow: hidden;

			image {
				width: 100%;
				height: 100%;
				opacity: 1;
			}
		}

		.title {
			font-size: $font-lg;
			color: $font-color-dark;
			line-height: 80upx;
		}

		.price-box {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding-right: 10upx;
			font-size: 24upx;
			color: $font-color-light;
		}

		.price {
			font-size: $font-lg;
			color: $uni-color-primary;
			line-height: 1;

			&:before {
				content: '￥';
				font-size: 26upx;
			}
		}
	}

	.tui-drawer-title {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 30rpx;
		box-sizing: border-box;
		height: 80rpx;

		.tui-title-bold {
			font-size: 26rpx;
			font-weight: bold;
			flex-shrink: 0;
		}
	}

	.tui-drawer-content {
		padding: 16rpx 30rpx 30rpx 30rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;

		.tui-phcolor {
			text-align: center;
			color: #b2b2b2;
			font-size: 24rpx;
		}

		.tui-input {
			border: 0;
			height: 64rpx;
			border-radius: 32rpx;
			width: 45%;
			background-color: #f7f7f7;
			text-align: center;
			font-size: 24rpx;
			color: #333;
		}
	}

	.tui-all-box {
		width: 90%;
		white-space: nowrap;
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}

	.tui-attr-right {
		width: 70%;
		font-size: 24rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		text-align: right;
	}

	.iocnstate {
		transform: rotate(180deg);
		transition: all .5s;
	}

	.iocnstate2 {
		transform: rotate(360deg);
		transition: all .5s;
	}

	.tui-flex-attr {
		flex-wrap: wrap;
		justify-content: flex-start;
	}

	.tui-attr-item {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 28%;
		height: 64rpx;
		font-size: 26rpx;
		padding: 0 4rpx;
		margin-right: 5%;
		margin-bottom: 5%;
		background-color: #f7f7f7;
		box-sizing: border-box;
		border-radius: 32rpx;

	}

	.tui-btmItem-active {
		background-color: #fcedea !important;
		color: #fa436a;
		font-weight: bold;
		position: relative;
	}

	.tui-active {
		color: #fa436a;
	}

	.tui-attr-ellipsis {
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		width: 96%;
		text-align: center;
	}

	.tui-safearea-bottom {
		width: 100%;
		height: env(safe-area-inset-bottom);
	}

	.tui-attr-btnbox {
		width: 100%;
		position: absolute;
		left: 0;
		bottom: 0;
		box-sizing: border-box;
		padding: 0 30rpx;
		background: #fff;
	}

	.tui-attr-safearea {
		height: 100rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-bottom: env(safe-area-inset-bottom);
		font-size: 26rpx;
	}

	.tui-drawer-btn {
		width: 47%;
		text-align: center;
		height: 60rpx;
		border-radius: 30rpx;
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
	}

	.tui-drawerbtn-black {
		border: 1rpx solid #555;
	}

	.tui-white-hover {
		background: #e5e5e5;
		color: #2e2e2e;
	}

	.tui-drawerbtn-primary {
		background: #fa436a;
		color: #fff;
	}
</style>
