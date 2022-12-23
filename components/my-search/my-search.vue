<template>
	<view class="my-search-container" @click="clickHandler">
		<view class="my-search-box">
			<uni-icons type="search" size="17"></uni-icons>	
			<text class="placeholder">搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-search",
		data() {
			return {
				
			};
		},
		methods:{
			clickHandler(){
				console.log("~~~")
				this.$emit('myClick')
			}
		}
	}
</script>

<style lang="scss">
.my-search-container{
	height: 50px;
	background: #c00000;
	display: flex;
	align-items: center;
	padding:  0 10px;
	
	.my-search-box{
		height: 36px;
		background-color: #FFFFFF;
		border-radius: 18px;
		width: 100%;
		
		display: flex;
		justify-content: center;
		align-items: center;
		
		.placeholder{
			font-size: 15px;
			margin-left: 5px;
		}
	}
}
</style>