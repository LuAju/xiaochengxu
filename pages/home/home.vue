<template>
	<view>
		<view class="search-box">
			<my-search @myClick="gotoSearch"></my-search>
		</view>
		
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item, index) in swiperList" :key="index">
				<navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id='+item.goods_id">
					<image :src="item.image_src"></image>
				</navigator>
			</swiper-item>
		</swiper>

		<view class="nav-list">
			<view class="nav-item" v-for="(item,index) in navList" :key="index" @click="navClickHandler(item)">
				<image :src="item.image_src" class="nav-img"></image>
			</view>
		</view>


		<view class="floor-list">
			<view class="floor_item" v-for="(floor, index ) in floorList" :key="index">
				<image :src="floor.floor_title.image_src" class="floor_title"></image>
				<view class="floor-img-box">
					<navigator class="left-box-img" :url="floor.product_list[0].url">
						<!-- mode是干嘛的 高度自适应吗 -->
						<image :src="floor.product_list[0].image_src"
							:style="{width: floor.product_list[0].image_width+'rpx'}" mode="widthFix"></image>
					</navigator>
					<view class="right-box-img">
						<navigator class="right-image-item" v-for="(item, index2) in floor.product_list" :key="index2"
							v-if="index2!=0" :url="item.url">
							<image :src="item.image_src" :style="{width:item.image_width+'rpx'}" mode="widthFix">
							</image>
						</navigator>
					</view>
				</view>
				<!-- <view v-for="product in floor.product_list"> -->
				<!-- {{product.name}} -->
				<!-- <image :src=""></image> -->
				<!-- </view> -->
			</view>
		</view>
	</view>
</template>

<script>
	import {
		$http
	} from '@escook/request-miniprogram';
	export default {
		data() {
			return {
				swiperList: [],
				navList: [],
				floorList: []
			};
		},
		onLoad() {
			this.getSwiperList()
			this.getNavList()
			this.getFloorList()

		},
		methods: {
			async getSwiperList() {
				const {
					data: res
				} = await $http.get('/api/public/v1/home/swiperdata')
				if (res.meta.status != 200) {
					return uni.$showMsg()
				}
				this.swiperList = res.message


			},
			async getNavList() {
				const {
					data: res
				} = await $http.get('/api/public/v1/home/catitems')
				if (res.meta.status != 200) {
					return uni.$showMsg()
				}
				this.navList = res.message
			},

			async getFloorList() {
				const {
					data: res
				} = await $http.get('/api/public/v1/home/floordata')
				if (res.meta.status != 200) {
					return uni.$showMsg()
				}
				
				res.message.forEach(floor=>{
					floor.product_list.forEach(product=>{
						product.url = '/subpkg/goods_list/goods_list?'+ product.navigator_url.split('?')[1]
					})
				})
				
				this.floorList = res.message
			},


			navClickHandler(item) {
				if (item.name === "分类") {
					// 跳转到分类tab
					uni.switchTab({
						url: '/pages/cate/cate'
					})
				}
			},
			
			gotoSearch(){
				uni.navigateTo({
					url: '/subpkg/search/search'
				})
			}
		}
	}
</script>

<style lang="scss">
	swiper {
		height: 330rpx;

		.swiper-item,
		image {
			width: 100%;
			height: 100%;
		}
	}

	.nav-list {
		display: flex;
		justify-content: space-around;
		margin: 15px 0;

		.nav-img {
			width: 128rpx;
			height: 140rpx;
		}
	}

	.floor_title {
		width: 100%;
		height: 60rpx;
	}

	.floor-img-box {
		display: flex;
		padding-left: 10px;
	}

	.right-box-img {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
	}
	
	.search-box{
		position: sticky;
		top: 0;
		z-index: 999;
	}
</style>
