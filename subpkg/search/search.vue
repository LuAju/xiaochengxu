<template>
	<view>
		<view class="search-box">
			<uni-search-bar :radius="100" :cancelButton="none" @input="input"></uni-search-bar>
		</view>

		<view class="suggest-list">
			<view class="suggest-item"
			 v-for="(item, index) in searchList" :key="index" @click="gotoDetail(item)">
				<view class="goods-name">{{item.goods_name}}</view>
				<uni-icons type="arrowright" size="16"></uni-icons>
			</view>
		</view>

		<view class="history-box">
			<view class="history-title">
				<text> 搜索历史 </text>
				<uni-icons type="trash" size="17" @click="cleanHistory"></uni-icons>
			</view>
			<view class="history-list">
				<uni-tag v-for="(item, index) in historys" 
				:text="item" :key="index" @click="gotoList(item)" ></uni-tag>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timer: null,
				keyword: '',
				searchList: [],
				searchHistoryList: ['a', 'apple', 'e']
			};
		},
		onLoad() {
			this.searchHistoryList = uni.getStorageSync("key")==null ? JSON.parse(uni.getStorageSync("key")):[]
		},

		computed: {
			historys() {
				// reverse会修改原数组， 新建数组计算
				return [...this.searchHistoryList].reverse()
			}
		},

		methods: {
			input(e) {
				clearTimeout(this.timer)
				this.timer = setTimeout(() => {
					this.keyword = e
					this.getSearchList()
				}, 500)

			},

			async getSearchList() {
				if (this.keyword.length == 0) {
					this.searchList = []
				}
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/goods/qsearch', {
					query: this.keyword
				})

				if (res.meta.status != 200) return uni.$showMsg()

				this.searchList = res.message

				this.saveHistoryList()

			},
			search() {},
			gotoDetail(item) {
				uni.navigateTo({
					url: '/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
				})
			},
			gotoList(item) {
				uni.navigateTo({
					url: '/subpkg/goods_list/goods_list?query=' + item
				})
			},
			saveHistoryList() {
				const set = new Set(this.searchHistoryList)
				set.delete(this.keyword)
				set.add(this.keyword)
				this.searchHistoryList = Array.from(set)
				uni.setStorageSync("key", JSON.stringify(this.searchHistoryList))
			},
			cleanHistory() {
				this.searchHistoryList = []
				uni.setStorageSync("key", [])
			}
		}
	}
</script>

<style lang="scss">
	.search-box {
		position: sticky;
		top: 0;
		z-index: 999;
	}

	.suggest-list {
		padding: 0 5px;
	}

	.suggest-item {
		font-size: 12px;
		padding: 13px 0;
		border-bottom: 1px solid #efefef;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.goods-name {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		margin-right: 3px;
	}

	.history-title {
		display: flex;
		justify-content: space-between;
		height: 40px;
		align-items: center;
		font-size: 13px;
		border-bottom: 1px solid #efefef;
	}

	.history-list {
		display: flex;
		flex-wrap: wrap;
	}

	.uni-tag {
		margin: 5px 5px 0 0;
	}
</style>
