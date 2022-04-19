<!-- 认证提交成功certificationSucceed -->
<template>
	<view class="container">
		<view class="d-flex a-center flex-column">
			<image class="con-image" src="/static/images/certification/approveSucceed.jpg"></image>
			<text class="fz30 color666">提交认证成功</text>
			<text class="fz24 text-dark pt-2">请耐心等待审核结果</text>
		</view>

		<navigator class="con-content-button" hover-class="none" open-type="navigateBack" :delta="1">返回</navigator>
	</view>
</template>

<script></script>

<style scoped>
page {
	background-color: #f7f7f7;
}

.con-image {
	width: 190rpx;
	height: 185rpx;
	margin: 60rpx 0 20rpx 0;
}

.con-content-text2 {
	font-size: 24rpx;
	color: 999;
	padding-top: 15rpx;
}

.con-content-button {
	width: 600rpx;
	height: 90rpx;
	background: #fa436a;
	border-radius: 10rpx;
	margin: 100rpx 70rpx 0 70rpx;
	text-align: center;
	line-height: 90rpx;
	color: #ffffff;
	font-size: 32rpx;
}
</style>
