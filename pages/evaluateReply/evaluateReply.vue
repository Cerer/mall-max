<template>
	<view class="container">
		<textarea class="tui-textarea" placeholder="回复Mocha" maxlength="200" v-model="content" auto-focus></textarea>
		<view class="tui-btn__box" @click="sendTap">
			<tui-form-button background="#fa436a" height="88rpx" radius="50rpx">发送</tui-form-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content:'',
				list:[],
				nickname:'',
				reply2:''
			}
		},
		onLoad(option) {
			this.nickname = option.nickname ? option.nickname : ''
			this.reply2 = option.reply2 ? option.reply2 : ''
			this.list = uni.getStorageSync('list')
			console.log(this.nickname)
		},
		methods: {
			//发送
			sendTap(){
				console.log(this.nickname)
				let msg = {
					nickname:'窈窕淑女',
					content:{
						name:this.nickname ? this.nickname : '',
						reply:this.reply2 ? this.reply2 : '',
					},
					reply2:this.content,
					pul:'/static/images/fans/2.jpg',
					num:0,
					zan:false
				}
			    this.list.push(msg)
				console.log(this.list)
				uni.setStorageSync('list',this.list)
				setTimeout(()=>{
					uni.navigateBack({
						delta:1
					})
				},200)
			}
		}
	}
</script>

<style>
	.container {
		padding: 20rpx 0;
	}
	.tui-textarea {
		width: 100%;
		height: 300rpx;
		font-size: 28rpx;
		padding: 20rpx 30rpx;
		box-sizing: border-box;
		background-color: #fff;
	}
	.tui-btn__box{
		width: 100%;
		padding: 60rpx;
		box-sizing: border-box;
	}
</style>
