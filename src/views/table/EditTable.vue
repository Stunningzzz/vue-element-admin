<template>
  <div>
    <el-table
      :data="articleList"
      row-key="id"
      border
      v-loading="isLoading"
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
        width="170px"
        align="center"
        v-slot="{row}"
      >
        {{row.timestamp | parseTime}}
      </el-table-column>

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
        label="Status"
        align="center"
        width="120px"
        v-slot="{row}"
      >
        <el-tag :type="row.status | getTagTypeFromStatus">
          {{row.status}}
        </el-tag>
      </el-table-column>

      <el-table-column
        label="Title"
        min-width="350px"
        v-slot="{row,col,$index}"
      >
        <span v-if="!articleListEditBtn[$index].isEditing">
          {{row.title}}
        </span>

        <template v-else>
          <div class="title-input">
            <el-input
              type="text"
              size="small"
              v-model="row.title"
            />
            <el-button
              type="warning"
              icon="el-icon-refresh"
              size="small"
              @click="cancelBtnClick(row,$index)"
            >
              Cancel
            </el-button>
          </div>
        </template>

      </el-table-column>

      <el-table-column
        label="Actions"
        align="center"
        v-slot="{row,col,$index}"
        width="150px"
      >
        <el-button
          :type="articleListEditBtn[$index].type"
          :icon="articleListEditBtn[$index].icon"
          size="small"
          @click="btnClick(row,$index)"
        >
          {{articleListEditBtn[$index].text}}
        </el-button>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
import { fetchList } from '@/network/article';
let unEditingBtn = {
    isEditing: false,
    icon: 'el-icon-edit',
    text: 'Edit',
    type: 'primary',
  },
  editingBtn = {
    isEditing: true,
    text: 'OK',
    type: 'success',
  };

export default {
  name: 'EditTable',
  data() {
    return {
      articleList: [],
      articleListEditBtn: [],
      articleListPreVal: [],
      isLoading: true,
      
    };
  },
  computed: {
    editBtn() {
      return this.isEditing
        ? {
            type: 'success',
            text: 'OK',
          }
        : {
            type: 'primary',
            icon: 'el-icon-edit',
            text: 'Edit',
          };
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

  async created() {
    this.articleList = (await fetchList()).data.items.slice(0, 10);
    this.isLoading = false;
    this.articleListEditBtn = Array.from(
      Array(this.articleList.length),
      () => ({ ...unEditingBtn })
    );
    
  },
  methods: {
    btnClick(row, index) {
      let curEditBtn = this.articleListEditBtn[index];
      this.setArticleListEditBtn(index, curEditBtn);
      if (curEditBtn.isEditing) {
        this.$message({
          message: 'The title has been edited',
          type: 'success',
          duration: 1000,
        });
      } else {
        this.articleListPreVal[index] = row.title;
      }
    },
    cancelBtnClick(row, index) {
      let curEditBtn = this.articleListEditBtn[index];
      row.title = this.articleListPreVal[index];
      this.setArticleListEditBtn(index, curEditBtn);
      this.$message({
        message: 'The title has been restored to the original value',
        type: 'warning',
        duration: 1000,
      });
    },
    setArticleListEditBtn(index, curEditBtn) {
      this.$set(
        this.articleListEditBtn,
        index,
        curEditBtn.isEditing
          ? {
              ...unEditingBtn,
            }
          : {
              ...editingBtn,
            }
      );
    },
  },
};
</script>

<style lang='scss' scoped>
.title-input {
  display: flex;
  > .el-input {
    width: 0;
    flex-grow: 1;
    padding-right: 5px;
  }
}
</style>
//亲人 爱人 朋友