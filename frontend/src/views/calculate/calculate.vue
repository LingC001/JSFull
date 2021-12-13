<template>
  <div>
    <van-form @submit="calculate">
      <van-field
        v-model.number="total"
        label="总额"
        placeholder="请输入当前总额"
        type="number"
        :rules="[{ required: true, message: '总额不能为空' }]"
        validate-trigger="onSubmit"
        :error="false"
      />
      <van-field v-model.number="balance" label="余额" placeholder="" />
      <van-row type="flex" justify="center" style="margin-top: 20px;">
        <van-col span="8">
          <van-button
            native-type="submit"
            block
            :loading="loading.calBtn"
            round
            size="normal"
            type="primary"
            >开始计算
          </van-button>
        </van-col>
      </van-row>
    </van-form>
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
        balance: '',
        loading: {
          calBtn: false
        }
      }
    },
    computed: {},
    created() {},
    methods: {
      calculate() {
        this.loading.calBtn = true
        this.balance = ''
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
        //发送请求存储计算结果
        saveCalResult(params)
          .then(() => {
            setTimeout(() => {
              this.balance = balance
              this.loading.calBtn = false
            }, 300)
          })
          .catch(err => {
            setTimeout(() => {
              this.$dialog.alert({
                message: err
              })
              this.loading.calBtn = false
            }, 300)
          })
      }
    }
  }
</script>

<style>
  #app {
  }
</style>
