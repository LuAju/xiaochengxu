<template>
	<view>
		<my-search @myClick="gotoSearch"></my-search>
		<view class="scroll-view-container">
			<!-- 获取屏幕可使用的高度（去掉顶部标题和底部tabBar)-->
			<scroll-view class="left-scroll-view" scroll-y="true" :style="{height: wh+'px'}">

				<block v-for="(item, index) in cateList" :key=index>
					<view :class="['left-scroll-view-item',index==active?'active':'']" @click="activeChange(index)">
						{{item.cat_name}}
					</view>
				</block>
			</scroll-view>


			<scroll-view scroll-y="true" :style="{height: wh+'px'}" :scroll-top="scrollTop">
				<view class="cate-level2" v-for="(item, index) in cateLevel2" :key="index">
					<view class="cate-level2-title">/ {{item.cat_name}} /</view>

					<view class="cate-level3">
						<view class="cate-level3-item" v-for="(item2, index) in item.children" :key="index" @click="gotoGoodList(item2)">
							<image :src="item2.cat_icon"></image>
							<text>{{item2.cat_name}}</text>
						</view>
					</view>
				</view>

			</scroll-view>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 当前设备可用高度
				wh: 0,
				cateList: [],
				active: 0,
				cateLevel2: [],
				cateLevel3: [],
				
				scrollTop: 0
			}
		},
		onLoad() {
			const sysInfo = uni.getSystemInfoSync()
			this.wh = sysInfo.windowHeight - 50

			this.getCateList()
		},
		methods: {
			async getCateList() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/categories')

				if (res.meta.status != 200) {
					return uni.$showMsg()
				}

				this.cateList = res.message

				this.cateList.forEach(item => {
					if (!item.children || item.children.length === 0) {
						return
					}
					item.children.forEach(level2 => {
						if (!level2.children || level2.children.length === 0) {
							return
						}
						level2.children.forEach(level3 => {
							level3.cat_icon = level3.cat_icon.replace('dev', 'web')
						})
					})
				})

				this.setCateLevel2(0)
			},

			activeChange(current) {
				this.active = current
				this.setCateLevel2(current)
				
				// 切换后  滚动条重置到顶部
				this.scrollTop = 0==this.scrollTop?0.1:0
			},

			setCateLevel2(index) {
				this.cateLevel2 = this.cateList[index].children
			},
			
			gotoGoodList(item){
				uni.navigateTo({
					url:'/subpkg/goods_list/goods_list?cid='+item.cat_id
				})
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
	.scroll-view-container {
		display: flex;
	}

	.left-scroll-view {
		width: 120px;
	}

	.left-scroll-view-item {
		background-color: #F7F7F7;
		line-height: 60px;
		text-align: center;
		font-size: 12px;

		&.active {
			background-color: white;
			position: relative;

			&::before {
				content: '';
				display: block;
				width: 3px;
				height: 30px;
				background-color: #c00000;
				position: absolute;
				transform: translateY(-50%);
				top: 50%;
			}
		}
	}

	.cate-level2-title {
		font-size: 12px;
		font-weight: bold;
		text-align: center;
		padding: 15px 0;
	}

	.cate-level3 {
		display: flex;
		flex-wrap: wrap;


		.cate-level3-item {
			width: 33.33%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			margin-bottom: 10px;

			image {
				height: 60px;
				width: 60px;
			}

			text {
				font-size: 12px;
			}
		}
	}
</style>
