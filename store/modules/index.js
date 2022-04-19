// 首页
export default {
	state: {
		// 轮播图数据
		carouselList: [{
				src: "/static/temp/banner3.jpg",
				background: "rgb(203, 87, 60)",
			},
			{
				src: "/static/temp/banner2.jpg",
				background: "rgb(205, 215, 218)",
			},
			{
				src: "/static/temp/banner4.jpg",
				background: "rgb(183, 73, 69)",
			}
		],

		// 分类数据
		categoryButtomList: [{
				imgUrl: '/static/temp/c3.png',
				title: '环球美食',
				url: '/pages/product/list'
			},
			{
				imgUrl: '/static/temp/c5.png',
				title: '个护美妆',
				url: '/pages/product/list'
			},
			{
				imgUrl: '/static/temp/c6.png',
				title: '营养保健',
				url: '/pages/product/list'
			},
			{
				imgUrl: '/static/temp/c7.png',
				title: '家居厨卫',
				url: '/pages/product/list'
			},
			{
				imgUrl: '/static/temp/c8.png',
				title: '速食生鲜',
				url: '/pages/product/list'
			}
		],

		/* 商品列表 */
		goodsList: [{
				image: "/static/images/mall/product/1.jpg",
				image2: "/static/images/mall/product/1.jpg",
				image3: "/static/images/mall/product/1.jpg",
				title: "古黛妃 短袖t恤女夏装2019新款韩版宽松",
				price: 179,
				sales: 61,
			},
			{
				image: "/static/images/mall/product/5.jpg",
				image2: "/static/images/mall/product/5.jpg",
				image3: "/static/images/mall/product/5.jpg",
				title: "潘歌针织连衣裙",
				price: 78,
				sales: 16,
			},
			{
				image: "/static/images/mall/product/2.jpg",
				image2: "/static/images/mall/product/2.jpg",
				image3: "/static/images/mall/product/2.jpg",
				title: "巧谷2019春夏季新品新款女装",
				price: 108.8,
				sales: 5,
			}, {
				image: "/static/images/mall/product/3.jpg",
				image2: "/static/images/mall/product/3.jpg",
				image3: "/static/images/mall/product/3.jpg",
				title: "私萱连衣裙",
				price: 265,
				sales: 88,
			}, {
				image: "/static/images/mall/product/4.jpg",
				image2: "/static/images/mall/product/4.jpg",
				image3: "/static/images/mall/product/4.jpg",
				title: "娇诗茹 ulzzang原宿风学生潮韩版春夏短",
				price: 422,
				sales: 137,
			}, {
				image: "/static/images/mall/product/6.jpg",
				image2: "/static/images/mall/product/6.jpg",
				image3: "/static/images/mall/product/6.jpg",
				title: "古黛妃 短袖t恤女夏装2019新款韩版宽松",
				price: 179,
				sales: 95,
			},
		]
	},

	getters: {}
}
