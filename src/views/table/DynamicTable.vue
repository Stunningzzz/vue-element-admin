<template>
  <div>
    <div class="header-sort">
      <div>固定表头, 按照表头顺序排序</div>
      <HeaderSortTable />
    </div>
    <div class="click-sort">
      <div>不固定表头, 按照点击顺序排序</div>
      <ClickSortTable />
    </div>
  </div>
</template>

<script>
import HeaderSortTable from './DynamicTableComps/HeaderSortTable';
import ClickSortTable from './DynamicTableComps/ClickSortTable';
export default {
  name: 'DynamicTable',
  components:{
    HeaderSortTable,
    ClickSortTable
  },
};
</script>

<style lang='scss' scoped>
</style>
//亲人 爱人 朋友