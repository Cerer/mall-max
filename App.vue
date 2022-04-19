<script>
/**
 * vuex管理登陆状态，具体可以参考官方登陆模板示例
 */
import { mapMutations } from 'vuex';
export default {
	methods: {
		...mapMutations(['login'])
	},
	onLaunch: function() {
		let userInfo = uni.getStorageSync('userInfo') || '';
		if (userInfo.id) {
			//更新登陆状态
			uni.getStorage({
				key: 'userInfo',
				success: res => {
					this.login(res.data);
				}
			});
		}
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style lang="scss">
/*全局公共样式和字体图标*/
@import '/common/common.css';

@import '/common/common.scss';

@import '/common/icon.css';

/* 基础样式库 */
@import '/common/cgn-main.css';
</style>
