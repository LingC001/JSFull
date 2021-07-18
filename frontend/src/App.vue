<template>
  <div id="app">
	<van-cell-group>
		<van-field v-model.number="total" label="总额" placeholder="请输入当前总额" />
		<van-field v-model.number="balance" label="余额" placeholder="" />
	</van-cell-group>
	<van-row type="flex" justify="center" style="margin-top: 50px;">
		<van-button round size="normal" type="primary" @click="calculate">开始计算</van-button>
	</van-row>
	
  </div>
</template>

<script>
import dayjs from 'dayjs'
const monFoodCost = 1200

export default {
  name: 'App',
  data(){
	return {
		total:'',
		balance:''
	}
  },
  computed:{},
  methods:{
	calculate(){
		let curDay = dayjs().date()
		let curMonDays = dayjs().daysInMonth()
		let restDay = curMonDays - curDay + 12
		let restFoodCost = Math.round(restDay * monFoodCost/curMonDays)
		this.balance = this.total - restFoodCost
		console.log("curDay: ",curDay);
		console.log("curMonDays: ",curMonDays);
		console.log("restDay: ",restDay);
	}
  }
}
</script>

<style>
#app {
  
}
</style>
