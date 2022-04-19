<!-- 系统消息--查看详情 systemDetails-->
<template>
	<view class="container">
		<view class="con_introduce">
			时尚美居
			狂欢会场!每满200减30,叠加各种类CPS专享优惠券,涉及美妆、居家和奢侈品等多个品类多家知名品牌!
			6月1日~6月4日活动期间,"美妆护肤"指定自营类目佣金翻倍至6%,指定爆款商品佣金最高提升至30%;"奢侈钟表"指定店铺佣金最高提升至28%;
			"居家"指定店铺佣金最高提升至40%,指定商品佣金最高提升至60%。快来抢购!
		</view>

		<view class="con_rule">
			<view class="rule_ruleTitle">活动规则:</view>
			<view class="rule_titleOne">
				<view class="titleOne_name">
					【规则一】联盟6月1日~6月4日"美妆-京选大牌 好礼狂想"活动类目和单品奖励活动规则
				</view>
				<view class="titleOne_time">活动时间:6月1日~6月4日（共计4天）</view>
				<view class="titleOne_object">奖励对象:联盟平台会员</view>
				<view class="titleOne_rewardRules">
					奖励规则:<text
						class="rewardRules_content">活动期间,一级类目“美妆护肤”（一级类目ID:1316）下的自营商品佣金比例提升至6%,举例:假设商品佣金为3%,活动期间总佣金6%=商品佣金3%+活动奖励佣金3%。</text>推广指定奖励商品,佣金比例最高提升至30%（其中包括商品佣金及活动奖励佣金）举例:假设商品佣金为25%,活动期间总佣金30%=商品佣金25%+活动奖励佣金5%
				</view>
				<view class="titleOne_link">
					活动链接:
					<view class="link_content">
						<view>pc:https://xxxxx</view>
						<view>app:https:/xxxxx</view>
					</view>
				</view>
				<view class="titleOne_footer">
					<view>xx商城</view>
					<view>2021年5月31日</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style scoped>
	.container {
		padding: 10px;
	}

	.con_introduce {
		font-size: 24rpx;
		color: #66686c;
	}

	.con_rule {
		margin-top: 25rpx;
		font-size: 26rpx;
		line-height: 45rpx;
	}

	.rule_ruleTitle {
		font-weight: bold;
		color: #303030
	}

	.rule_titleOne {
		color: #66686c
	}

	.titleOne_name {
		font-weight: bold;
		color: #303030
	}

	.rewardRules_content {
		font-weight: bold;
		color: #303030
	}

	.link_content {
		color: #2E2E2E;
	}
	
	.titleOne_footer{
		float: right;
		text-align: right;
	}
</style>
