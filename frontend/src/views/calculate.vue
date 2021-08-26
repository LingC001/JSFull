<template>
  <div>
    <van-cell-group>
      <van-field
        v-model.number="total"
        label="总额"
        placeholder="请输入当前总额"
      />
      <van-field v-model.number="balance" label="余额" placeholder="" />
    </van-cell-group>
    <van-row type="flex" justify="center" style="margin-top: 50px;">
      <van-button round size="normal" type="primary" @click="calculate"
        >开始计算</van-button
      >
    </van-row>
  </div>
</template>

<script>
  import dayjs from 'dayjs'
  import { saveCalResult } from '@/api/calculate.js'

  const dayFoodCost = 40

  export default {
    name: 'App',
    data() {
      return {
        total: '',
        balance: ''
      }
    },
    computed: {},
    created() {},
    methods: {
      calculate() {
        //未输入则不计算
        if (!this.total) {
          return
        }
        //当前日数
        let curDay = dayjs().date()
        //本月总天数
        let curMonDays = dayjs().daysInMonth()
        //剩余天数
        let restDay
        if (curDay > 12) {
          restDay = curMonDays - curDay + 12
        } else {
          restDay = 12 - curDay
        }
        let restFoodCost = Math.round(restDay * dayFoodCost)
        let balance = this.total - restFoodCost
        let params = {
          calValue: balance
        }
        saveCalResult(params)
          .then(res => {
            console.log(res)
          })
          .catch(err => {
            this.$dialog.alert({
              message: err
            })
          })
        //发送请求存储计算结果
        this.balance = balance
      }
    }
  }
</script>

<style>
  #app {
  }
</style>
