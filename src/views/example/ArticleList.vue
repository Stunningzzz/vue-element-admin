<template>
  <div>
    <el-table
      :data="listData"
      border
      size="medium"
      v-loading="listLoading"
    >
      <el-table-column
        prop="id"
        label="ID"
        width="70px"
        align="center"
      />
      <el-table-column
        label="Date"
        width="200px"
        align="center"
        v-slot="{row}"
      >
        {{row.timestamp | parseTime}}
      </el-table-column>
      <el-table-column
        prop="author"
        label="Author"
        width="120px"
        align="center"
      />
      <el-table-column
        label="Importance"
        width="120px"
        v-slot="{row}"
      >
        <svg-icon
          icon-class="star"
          v-for="n in row.importance"
          :key="n"
        />
      </el-table-column>
      <el-table-column
        label="Status"
        width="100px"
        align="center"
        v-slot="{row}"
      >
        <el-tag :type="row.status | getTagtypeFromStatus">
          {{row.status}}
        </el-tag>
      </el-table-column>
      <el-table-column
        label="Title"
        v-slot="{row,column,$index}"
      >
        <span
          type="text"
          @click="editArticleClick(row,$index)"
          class="text-link"
        >
          {{row.title}}
          <el-tag type="primary">
            {{row.type | getTypeValue}}
          </el-tag>
        </span>
      </el-table-column>
      <el-table-column
        label="Actions"
        align="center"
        width="100px"
        v-slot="{row}"
      >
        <el-button
          type="primary"
          size="small"
          @click="editArticleClick(row)"
        >
          Edit
        </el-button>
      </el-table-column>
    </el-table>

    <Pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getListData"
    />

  </div>
</template>

<script>
import { fetchList } from '@/network/article';
import Pagination from '@/components/Pagination';

let statusTagtypesMap = {
    published: 'success',
    draft: 'info',
    deleted: 'danger',
  },
  typeMap = {
    CN: 'China',
    US: 'USA',
    JP: 'Japan',
    EU: 'Eurozone',
  };

export default {
  name: 'ArticleList',
  components: {
    Pagination,
  },
  data() {
    return {
      listData: [],
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 20,
      },
      total: 0,
    };
  },
  created() {
    this.getListData();
  },
  filters: {
    getTagtypeFromStatus(status) {
      return statusTagtypesMap[status];
    },
    getTypeValue(type) {
      return typeMap[type];
    },
  },
  methods: {
    editArticleClick() {},
    async getListData() {
      this.listLoading = true;
      let { total, items } = (await fetchList(this.listQuery)).data;
      console.log('items --- ', items);
      this.listLoading = false;
      this.total = total;
      this.listData = items;
    },
    editArticleClick(row) {
      this.$router.push(`./article-edit/${row.id}`);
    },
  },
};
</script>

<style lang='scss' scoped>
.el-table {
  padding: 30px 0 30px 0;
  .text-link {
    color: #337ab7;
    cursor: pointer;
    &:hover {
      color: #20a0ff;
    }
  }
}
</style>
//亲人 爱人 朋友