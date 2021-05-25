<template>
  <div>
    <el-table
      :data="articleList"
      row-key="id"
      border
      v-loading="isLoading"
      size="small"
    >
      <el-table-column
        prop="id"
        label="ID"
        width="75px"
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="Date"
        width="200px"
        align="center"
        v-slot="{row}"
      >
        {{row.timestamp | parseTime}}
      </el-table-column>
      <el-table-column
        prop="title"
        label="Title"
        width="300px"
      />
      <el-table-column
        prop="author"
        label="Author"
        width="100px"
        align="center"
      />
      <el-table-column
        label="Importance"
        width="100px"
        v-slot="{row}"
      >
        <svg-icon
          icon-class="star"
          v-for="n in row.importance"
          :key="n"
        />
      </el-table-column>
      <el-table-column
        prop="pageviews"
        label="Readings"
        align="center"
      ></el-table-column>
      <el-table-column
        label="Status"
        align="center"
        v-slot="{row}"
      >
        <el-tag :type="row.status | getTagTypeFromStatus">
          {{row.status}}
        </el-tag>
      </el-table-column>
    </el-table>
    <div v-if="!isLoading">
      <el-tag type="primary">初始顺序</el-tag>
      {{initSequence}}
    </div>
    <div v-if="!isLoading">
      <el-tag type="primary">当前顺序</el-tag>
      {{curSequence}}
    </div>
  </div>
</template>

<script>
import { fetchList } from '@/network/article';
import Sortable from 'sortablejs';

export default {
  name: 'DragTable',
  data() {
    return {
      articleList: [],
      isLoading: null,
      initSequence: [],
      sortable: null,
    };
  },
  computed: {
    curSequence() {
      return this.articleList.map((v) => v.id);
    },
  },
  async created() {
    this.isLoading = true,
    this.articleList = (await fetchList()).data.items.slice(0, 10);
    this.initSequence = this.articleList.map((v) => v.id);
    this.isLoading = false;
  },
  mounted(){
    this.sortList();
  },
  methods: {
    sortList() {
      const el = this.$el.querySelectorAll(
        '.el-table__body-wrapper > table > tbody'
      )[0];
      this.sortable = Sortable.create(el, {
        ghostClass: 'sortable-ghost',
        setData: function (dataTransfer) {
          dataTransfer.setData('Text', '');
        },
        onEnd: ({ newIndex, oldIndex }) => {
          let target = this.articleList.splice(oldIndex, 1)[0];
          this.articleList.splice(newIndex, 0, target);
        },
      });
    },
  },
  filters: {
    getTagTypeFromStatus(status) {
      let statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger',
      };

      return statusMap[status];
    },
  },
};
</script>

<style>
.sortable-ghost {
  opacity: 0.8;
  color: #fff !important;
  background: #42b983 !important;
}
</style>
<style lang='scss' scoped>
::v-deep.el-table .el-table__row:hover{
  cursor: pointer;
}

</style>
//亲人 爱人 朋友