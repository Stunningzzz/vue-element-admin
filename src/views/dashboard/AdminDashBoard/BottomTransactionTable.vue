<template>
  <div class="transation-table">
    <el-table :data="transactionData">
      <el-table-column label="Order_No" prop="order_no" width="310" >

      </el-table-column>
      <el-table-column label="Price" prop="price" align="center">

      </el-table-column>
      <el-table-column label="Status" #default="{row}" align="center">
        <el-tag :type="row.status === 'success' ? 'success' : 'danger'">
          {{row.status}}
        </el-tag>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name:'BottomTransactionTable',
  props:{
    transactionData:Array,
  },
}
</script>

<style lang='scss' scoped>
.transation-table {
  background-color: #fff;
}
</style>
//亲人 爱人 朋友
