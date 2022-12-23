
// #ifndef VUE3
import Vue from 'vue'
import App from './App'

import {$http} from '@escook/request-miniprogram'

uni.$http = $http

$http.baseUrl = 'http://www.uinav.com'


$http.beforeRequest=function(options){
	wx.showLoading({
		title: "数据加载中"
	})
}
$http.afterRequest=function() {
	wx.hideLoading()
}

uni.$showMsg = function(title='数据加载中', duration=1500) {
	uni.showToast({
		title,
		duration,
		icon:'none'
	})
}

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
// #endif




// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif