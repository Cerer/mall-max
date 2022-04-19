<template>
	<view class="container">
		<!-- 头部-头像-名称信息start -->
		<view class="user-section">
			<image class="bg" src="/static/images/user/user-bg.jpg"></image>
			<view class="user-info-box">
				<view class="portrait-box">
					<image class="portrait" :src="userInfo.portrait || '/static/images/user/missing-face.png'"></image>
				</view>
				<view class="info-box">
					<text @click="navTo('/pages/profile/profile')" class="username">
						{{ userInfo.nickname || '游客' }}
					</text>
					<view class="box-tool">
						<view @click="navTo('/pages/follow/follow')">
							<text>4</text>
							关注
						</view>
						<view class="tool-line"></view>
						<view @click="navTo('/pages/fans/fans')">
							<text>3</text>
							粉丝
						</view>
					</view>
				</view>
			</view>
			<view class="vip-card-box">
				<image class="card-bg" src="/static/vip-card-bg.png" mode=""></image>
				<view class="tit">
					<text class="yticon icon-iLinkapp-"></text>
					会员
				</view>
				<text class="e-m">Union</text>
				<text class="e-b">开通会员开发无bug 一测就上线</text>
			</view>
		</view>
		<!-- 头部-头像-名称信息end -->

		<!--tool信息start -->
		<view
			class="cover-container"
			:style="[
				{
					transform: coverTransform,
					transition: coverTransition
				}
			]"
			@touchstart="coverTouchstart"
			@touchmove="coverTouchmove"
			@touchend="coverTouchend"
		>
			<image class="arc" src="/static/arc.png"></image>

			<!-- 余额等工具 -->
			<view class="tj-sction">
				<view class="tj-item" v-for="(item, index) in tjList" :key="index" @click="navTo(item.path)">
					<text class="num">{{ item.num }}</text>
					<text>{{ item.title }}</text>
				</view>
			</view>

			<!-- 订单Tool start -->
			<view class="order-section">
				<view
					class="order-item"
					hover-class="common-hover"
					:hover-stay-time="50"
					v-for="(item, index) in orderToolList"
					:key="index"
					@click="navTo(item.path)"
				>
					<text :class="`yticon ${item.icon}`"></text>
					<text>{{ item.title }}</text>
				</view>
			</view>
			<!-- 订单Tool end -->

			<!-- 底部信息start -->
			<view class="history-section icon">
				<list-cell
					v-for="(item, index) in itemList"
					:key="index"
					:icon="item.icon"
					:iconColor="item.iconColor"
					:title="item.title"
					@eventClick="navTo(item.path)"
				></list-cell>
			</view>
			<!-- 底部信息end -->
		</view>
		<!--tool信息end -->

		<!-- 推荐信息start -->
		<view class="divider-bcg">
			<tui-divider :size="28" :bold="true" color="#333" width="50%">为你推荐</tui-divider>
		</view>

		<product-list :goodsList="productData"></product-list>
		<!-- 推荐信息end -->
	</view>
</template>
<script>
import listCell from '@/components/common/mix-list-cell';
import productList from '@/components/common/product-list';
import { mapState } from 'vuex';

let startY = 0,
	moveY = 0,
	pageAtTop = true;

export default {
	components: {
		listCell,
		productList
	},

	computed: {
		...mapState({
			hasLogin: state => state.user.hasLogin,
			userInfo: state => state.user.userInfo,
			productData: state => state.user.productData,
			tjList: state => state.user.tjList,
			orderToolList: state => state.user.orderToolList,
			itemList: state => state.user.itemList
		})
	},

	data() {
		return {
			coverTransform: 'translateY(0px)',
			coverTransition: '0s',
			moving: false,
			
		};
	},
	onLoad() {},
	// #ifndef MP

	// 我的--消息--设置--导航按钮点击
	onNavigationBarButtonTap(e) {
		const index = e.index;
		if (index === 0) {
			this.navTo('/pages/set/set');
		} else if (index === 1) {
			// #ifdef APP-PLUS
			const pages = getCurrentPages();
			const page = pages[pages.length - 1];
			const currentWebview = page.$getAppWebview();
			currentWebview.hideTitleNViewButtonRedDot({
				index
			});
			// #endif
			uni.navigateTo({
				url: '/pages/message/index'
			});
		}
	},
	// #endif

	methods: {
		/**
		 * 统一跳转接口,拦截未登录路由
		 * navigator标签现在默认没有转场动画，所以用view
		 */
		navTo(url) {
			if (!this.hasLogin) {
				url = '/pages/public/login';
			}
			uni.navigateTo({
				url
			});
		},

		/**
		 *  会员卡下拉和回弹
		 *  1.关闭bounce避免ios端下拉冲突
		 *  2.由于touchmove事件的缺陷（以前做小程序就遇到，比如20跳到40，h5反而好很多），下拉的时候会有掉帧的感觉
		 *    transition设置0.1秒延迟，让css来过渡这段空窗期
		 *  3.回弹效果可修改曲线值来调整效果，推荐一个好用的bezier生成工具 http://cubic-bezier.com/
		 */
		coverTouchstart(e) {
			if (pageAtTop === false) {
				return;
			}
			this.coverTransition = 'transform .1s linear';
			startY = e.touches[0].clientY;
		},

		coverTouchmove(e) {
			moveY = e.touches[0].clientY;
			let moveDistance = moveY - startY;
			if (moveDistance < 0) {
				this.moving = false;
				return;
			}
			this.moving = true;
			if (moveDistance >= 80 && moveDistance < 100) {
				moveDistance = 80;
			}

			if (moveDistance > 0 && moveDistance <= 80) {
				this.coverTransform = `translateY(${moveDistance}px)`;
			}
		},

		coverTouchend() {
			if (this.moving === false) {
				return;
			}
			this.moving = false;
			this.coverTransition = 'transform 0.3s cubic-bezier(.21,1.93,.53,.64)';
			this.coverTransform = 'translateY(0px)';
		}
	}
};
</script>
<style lang="scss">
%flex-center {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

%section {
	display: flex;
	justify-content: space-around;
	align-content: center;
	background: #fff;
	border-radius: 10upx;
}

.user-section {
	height: 520upx;
	padding: 100upx 30upx 0;
	position: relative;

	.bg {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		filter: blur(1px);
		opacity: 0.7;
	}
}

.user-info-box {
	height: 180upx;
	display: flex;
	align-items: center;
	position: relative;
	z-index: 1;

	.portrait {
		width: 130upx;
		height: 130upx;
		border: 5upx solid #fff;
		border-radius: 50%;
	}

	.username {
		font-size: $font-lg + 6upx;
		color: $font-color-dark;
		margin-left: 20upx;
	}

	.box-tool {
		display: flex;
		margin: 5rpx 0 0 15rpx;
		color: $font-color-dark;
		font-size: 24rpx;
	}
}

.tool-line {
	height: 30rpx;
	width: 1rpx;
	background-color: #bebebe;
	margin: 0 20rpx 20rpx;
}

.vip-card-box {
	display: flex;
	flex-direction: column;
	color: #f7d680;
	height: 240upx;
	background: linear-gradient(left, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8));
	border-radius: 16upx 16upx 0 0;
	overflow: hidden;
	position: relative;
	padding: 20upx 24upx;

	.card-bg {
		position: absolute;
		top: 20upx;
		right: 0;
		width: 380upx;
		height: 260upx;
	}

	.b-btn {
		position: absolute;
		right: 20upx;
		top: 16upx;
		width: 132upx;
		height: 40upx;
		text-align: center;
		line-height: 40upx;
		font-size: 22upx;
		color: #36343c;
		border-radius: 20px;
		background: linear-gradient(left, #f9e6af, #ffd465);
		z-index: 1;
	}

	.tit {
		font-size: $font-base + 2upx;
		color: #f7d680;
		margin-bottom: 28upx;

		.yticon {
			color: #f6e5a3;
			margin-right: 16upx;
		}
	}

	.e-b {
		font-size: $font-sm;
		color: #d8cba9;
		margin-top: 10upx;
	}
}

.cover-container {
	background: $page-color-base;
	margin-top: -150upx;
	padding: 0 30upx;
	position: relative;
	background: #f5f5f5;
	padding-bottom: 20upx;

	.arc {
		position: absolute;
		left: 0;
		top: -34upx;
		width: 100%;
		height: 36upx;
	}
}

.divider-bcg {
	background: $page-color-base;
}

.tj-sction {
	@extend %section;

	.tj-item {
		@extend %flex-center;
		flex-direction: column;
		height: 140upx;
		font-size: $font-sm;
		color: #75787d;
	}

	.num {
		font-size: $font-lg;
		color: $font-color-dark;
		margin-bottom: 8upx;
	}
}

.order-section {
	@extend %section;
	padding: 28upx 0;
	margin-top: 20upx;

	.order-item {
		@extend %flex-center;
		width: 120upx;
		height: 120upx;
		border-radius: 10upx;
		font-size: $font-sm;
		color: $font-color-dark;
	}

	.yticon {
		font-size: 48upx;
		margin-bottom: 18upx;
		color: #fa436a;
	}

	.icon-shouhoutuikuan {
		font-size: 44upx;
	}
}

.history-section {
	padding: 30upx 0 0;
	margin-top: 20upx;
	background: #fff;
	border-radius: 10upx;

	.sec-header {
		display: flex;
		align-items: center;
		font-size: $font-base;
		color: $font-color-dark;
		line-height: 40upx;
		margin-left: 30upx;

		.yticon {
			font-size: 44upx;
			color: #5eba8f;
			margin-right: 16upx;
			line-height: 40upx;
		}
	}

	.h-list {
		white-space: nowrap;
		padding: 30upx 30upx 0;

		image {
			display: inline-block;
			width: 160upx;
			height: 160upx;
			margin-right: 20upx;
			border-radius: 10upx;
		}
	}
}
</style>
