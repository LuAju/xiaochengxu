<template>
	<view class="goods-list">
		<block v-for="(goods, index) in goodsList" :key="index">
			<view class="goods-item">
				<view class="goods-item-left">
					<image :src="goods.goods_small_logo || defaultPic" class="goods-pic"></image>
				</view>
				<view class="goods-item-right">
					<view class="goods-name">{{goods.goods_name}}</view>
					<view class="goods-info-box">
						<view class="goods-price">￥{{goods.goods_price}}</view>
						<view class="aa"></view>
					</view>
				</view>
			</view>

		</block>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				queryObj: {
					query: "",
					cid: "",
					pagenum: 1,
					pagesize: 10
				},
				goodsList: [],
				total: 0,
				defaultPic: 'https://gd1.alicdn.com/imgextra/i2/286590437/O1CN01yx8pfw1F6BYs8g2lx_!!286590437.jpg_400x400.jpg'
			};
		},
		onLoad(options) {
			this.queryObj.query = options.query || ""
			this.queryObj.cid = options.cid || ""

			this.getGoodsList()
		},
		methods: {
			async getGoodsList() {
				const {
					data: res
				} = await uni.$http.get("/api/public/v1/goods/search", this.queryObj)

				if (res.meta.status != 200) {
					return uni.$showMsg()
				}
				// 为数据
				this.goodsList = res.message.goods
				this.total = res.message.total
				console.log(res.message)
			}
		}
	}
</script>

<style lang="scss">
	.goods-item {
		display: flex;
		padding: 10px 5px;
		border-bottom: 1px solid #f0f0f0;
	}

	.goods-item-left {}

	.goods-pic {
		width: 100px;
		height: 100px;
		display: block;
		margin-right: 5px;
	}

	.goods-item-right {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	
	.goods-name{
		font-size: 13px;
	}
	
	.goods-price{
		font-size: 13px;
		color: #c00000;
	}
</style>
