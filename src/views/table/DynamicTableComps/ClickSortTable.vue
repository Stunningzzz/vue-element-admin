<template>
  <div class="click-sort-table">
    <el-row :gutter="20" class="options">
      <el-col
        :span="2"
        v-for="(item,index) in options"
        :key="item"
      >
        <el-checkbox
          v-model="selected[index]"
          :label="options[index]"
          @change="val => changeSelected(item,val)"
        >
        </el-checkbox>
      </el-col>
    </el-row>
    <!-- 通过切换key实现换表格解决点击后闪的问题 -->
    <el-table
      :key="key"
      :data="tableData.headerSort"
      border
    >
      <el-table-column
        label="fruitName"
        prop="fruitName"
        width="200"
      >
      </el-table-column>
      <el-table-column
        v-for="item in selectedOptions"
        :key="item"
        :label="item"
        :prop="item"
      >
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'ClickSortTable',
  data() {
    return {
      key: true,
      options: ['apple', 'banana', 'orange'],
      selected: [true,true],
      selectedOptions: ['apple','banana'],
      tableData: {
        headerSort: [
          {
            fruitName: 'fruit1',
            apple: 'apple-10',
            banana: 'banana-10',
            orange: 'orange-10',
          },
          {
            fruitName: 'fruit2',
            apple: 'apple-20',
            banana: 'banana-20',
            orange: 'orange-20',
          },
        ],
      },
    };
  },
  methods: {
    changeSelected(item, val) {
      let {selectedOptions} = this;
      if (val) {
        selectedOptions.push(item);
      } else {
        selectedOptions.splice(selectedOptions.indexOf(item), 1);
      }
    },
  },
  watch: {
    selectedOptions() {
      this.key = !this.key;
    },
  },
};
</script>

<style lang='scss' scoped>
.click-sort-table{
  padding: 15px 0 20px 0;
  .options{
    padding-bottom: 10px;
  }
}
</style>
//亲人 爱人 朋友