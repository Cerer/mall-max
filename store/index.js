import Vue from 'vue'
import Vuex from 'vuex'
import fetch from '../common/httpRequest'

import index from "@/store/modules/index.js"
import category from "@/store/modules/category.js"
import cart from "@/store/modules/cart.js"
import user from "@/store/modules/user.js"
import address from "@/store/modules/address.js"

Vue.use(Vuex)

const store = new Vuex.Store({
	
	actions: {
		getOnlineStatus: async function({
			commit,
			state
		}) {
			return await new Promise((resolve, reject) => {
				// #ifndef MP-WEIXIN
				resolve(true)
				// #endif
				// #ifdef MP-WEIXIN
				if (state.isOnline) {
					resolve(state.isOnline)
				} else {
					fetch.request("/Home/GetStatus", "GET", {}, false, true, true).then((res) => {
						if (res.code == 100 && res.data == 1) {
							commit('setOnline', {
								isOnline: true
							})
							resolve(true)
						} else {
							commit('setOnline', {
								isOnline: false
							})
							resolve(false)
						}
					}).catch((res) => {
						reject(false)
					})
				}
				// #endif
			})
		}
	},

	modules: {
		index,
		category,
		cart,
		user,
		address
	},
})

export default store
