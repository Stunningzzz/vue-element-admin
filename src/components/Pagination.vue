<template>
  <el-pagination
    @size-change="handleSizeChange"
    :page-sizes="[10,20,30,50]"
    :page-size="limit"
    @current-change="handlePageChange"
    :current-page="page"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total"
  >
  </el-pagination>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    total: Number,
    layout: {
      type: String,
      default() {
        return;
      },
    },
    pageSizes: Array,
    limit: Number,
    page: Number,
  },
  methods: {
    handleSizeChange(val) {
      this.$emit('update:limit',val);
      this.emitPagination();
    },
    handlePageChange(val) {
      this.$emit('update:page',val);
      this.emitPagination();
    },
    emitPagination() {
      this.$emit('pagination');
    },
  },
};
</script>

<style lang='scss' scoped>
</style>
//亲人 爱人 朋友