// 用户
export default {
	state: {
		hasLogin: false,

		// 用户信息
		userInfo: {},

		// 底部为你推荐数据
		productData: [{
				image: '/static/images/mall/product/1.jpg',
				image2: '/static/images/mall/product/1.jpg',
				image3: '/static/images/mall/product/1.jpg',
				title: '古黛妃 短袖t恤女夏装2019新款韩版宽松',
				price: 179,
				sales: 61
			},
			{
				image: '/static/images/mall/product/5.jpg',
				image2: '/static/images/mall/product/5.jpg',
				image3: '/static/images/mall/product/5.jpg',
				title: '潘歌针织连衣裙',
				price: 78,
				sales: 16
			},
			{
				image: '/static/images/mall/product/2.jpg',
				image2: '/static/images/mall/product/2.jpg',
				image3: '/static/images/mall/product/2.jpg',
				title: '巧谷2019春夏季新品新款女装',
				price: 108.8,
				sales: 5
			},
			{
				image: '/static/images/mall/product/3.jpg',
				image2: '/static/images/mall/product/3.jpg',
				image3: '/static/images/mall/product/3.jpg',
				title: '私萱连衣裙',
				price: 265,
				sales: 88
			},
			{
				image: '/static/images/mall/product/4.jpg',
				image2: '/static/images/mall/product/4.jpg',
				image3: '/static/images/mall/product/4.jpg',
				title: '娇诗茹 ulzzang原宿风学生潮韩版春夏短',
				price: 422,
				sales: 137
			},
			{
				image: '/static/images/mall/product/6.jpg',
				image2: '/static/images/mall/product/6.jpg',
				image3: '/static/images/mall/product/6.jpg',
				title: '古黛妃 短袖t恤女夏装2019新款韩版宽松',
				price: 179,
				sales: 95
			}
		],

		// 余额等工具数据
		tjList: [{
				path: '/pages/money/money',
				title: '余额',
				num: 128.8
			},
			{
				path: '/pages/money/coupon',
				title: '优惠券',
				num: 15
			},
			{
				path: '/pages/integral/integral',
				title: '积分',
				num: 1000
			}
		],

		// 订单tool
		orderToolList: [{
				title: '全部订单',
				icon: 'icon-shouye',
				path: '/pages/order/order?state=0'
			},
			{
				title: '待付款',
				icon: 'icon-daifukuan',
				path: '/pages/order/order?state=1'
			},
			{
				title: '待收货',
				icon: 'icon-yishouhuo',
				path: '/pages/order/order?state=2'
			},
			{
				title: '退款/售后',
				icon: 'icon-shouhoutuikuan',
				path: '/pages/order/order?state=4'
			}
		],

		// 列表数据
		itemList: [{
				title: '我的钱包',
				icon: 'icon-iconfontweixin',
				iconColor: '#e07472',
				path: '/pages/money/money'
			},
			{
				title: '地址管理',
				icon: 'icon-dizhi',
				iconColor: '#5fcda2',
				path: '/pages/address/address'
			},
			{
				title: '我的收藏',
				icon: 'icon-shoucang_xuanzhongzhuangtai',
				iconColor: '#54b4ef',
				path: '/pages/favorite/favorite'
			},
			{
				title: '设置',
				icon: 'icon-shezhi1',
				iconColor: '#e07472',
				path: '/pages/set/set'
			}
		]
	},

	mutations: {
		login(state, provider) {

			state.hasLogin = true;
			state.userInfo = provider;
			uni.setStorage({ //缓存用户登陆状态
				key: 'userInfo',
				data: provider
			})
			console.log(state.userInfo);
		},
		logout(state) {
			state.hasLogin = false;
			state.userInfo = {};
			uni.removeStorage({
				key: 'userInfo'
			})
		}
	},
}
