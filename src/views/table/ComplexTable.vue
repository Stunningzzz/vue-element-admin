

<template>
  <div>
    <div class="query">
      <div class="query-input">
        <el-input
          v-model="listQuery.title"
          type="text"
          placeholder="标题"
          class="input-lg"
          size="small"
        />
        <el-select
          v-model="listQuery.importance"
          placeholder="重要性"
          class="input-sm"
          size="small"
          clearable
        >
          <el-option
            v-for="item in importanceOptions"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
        <el-select
          v-model="listQuery.type"
          placeholder="类型"
          class="input-md"
          size="small"
          clearable
        >
          <el-option
            v-for="item in typeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-select
          class="input-md"
          v-model="listQuery.sort"
          size="small"
          @change="handleFilter"
        >
          <el-option
            v-for="item in sortOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="query-btn">
        <el-button
          icon="el-icon-search"
          type="primary"
          size="medium"
          @click="handleFilter"
        >
          搜索
        </el-button>
        <el-button
          icon="el-icon-edit"
          type="primary"
          size="medium"
          @click="appendArticleClick"
        >
          添加
        </el-button>
        <el-button
          icon="el-icon-download"
          type="primary"
          size="medium"
        >
          导出
        </el-button>
        <el-checkbox
          label="审核人"
          v-model="reviewerColVisible"
        >
        </el-checkbox>
      </div>
    </div>

    <div class="table">
      <el-table
        :data="listData"
        border
        size="small"
        :key="reviewerColVisible"
        v-loading="listLoading"
        @sort-change="sortChange"
      >
        <el-table-column
          prop="id"
          label="ID"
          width="70px"
          align="center"
          sortable="custom"
        />
        <el-table-column
          label="Date"
          width="140px"
          align="center"
          v-slot="{row}"
        >
          {{row.timestamp | parseTime}}
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
          prop="author"
          label="Author"
          width="100px"
          align="center"
        />
        <el-table-column
          label="Reviewer"
          width="100px"
          align="center"
          v-slot="{row}"
          v-if="reviewerColVisible"
        >
          <strong :style="{color:'red'}">
            {{row.reviewer}}
          </strong>
        </el-table-column>
        <el-table-column
          label="Importance"
          width="90px"
          v-slot="{row}"
        >
          <svg-icon
            icon-class="star"
            v-for="n in row.importance"
            :key="n"
          />
        </el-table-column>
        <el-table-column
          label="Readings"
          width="80px"
          align="center"
          v-slot="{row}"
        >

          <span
            class="text-link"
            @click="readingBtnClick(row.id)"
          >
            {{row.pageviews}}
          </span>
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
          label="Actions"
          align="center"
          width="250px"
          v-slot="{row,column,$index}"
        >
          <div class="action-btns">
            <el-button
              type="primary"
              size="mini"
              @click="editArticleClick(row,$index)"
            >
              Edit
            </el-button>
            <el-button
              v-if="row.status === 'published'"
              size="mini"
              @click="draftBtnClick(row)"
            >
              Draft
            </el-button>
            <el-button
              v-else
              type="success"
              size="mini"
              @click="publishBtnClick(row)"
            >
              Publish
            </el-button>
            <el-button
              type="danger"
              size="mini"
              v-if="row.status !== 'deleted'"
              @click="deleteBtnClick($index)"
            >
              Delete
            </el-button>
            <el-button
              v-else
              size="mini"
              @click="draftBtnClick(row)"
            >
              Draft
            </el-button>
          </div>
        </el-table-column>
      </el-table>
    </div>

    <Pagination
      v-show="total > 0"
      :total="total"
      :limit.sync="listQuery.limit"
      :page.sync="listQuery.page"
      @pagination="getListData"
    />

    <el-dialog
      :visible.sync="readingDialog.visible"
      :lock-scroll="false"
    >
      <el-table
        :data="readingDialog.pvData"
        border
        v-loading="readingDialog.loading"
      >
        <el-table-column
          :prop="readingDialog.key"
          label="Channel"
        />
        <el-table-column
          :prop="readingDialog.value"
          label="PV"
        />
      </el-table>
    </el-dialog>

    <el-dialog
      :visible.sync="editArticleDialogData.visible"
      :lock-scroll="false"
    >
      <el-form
        label-width="150px"
        size="medium"
        ref="editArticleDialogForm"
        :model="editArticleDialogData"
      >
        <el-form-item
          prop="type"
          label="Type"
          required
        >
          <el-select v-model="editArticleDialogData.type">
            <el-option
              v-for="item in typeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          prop="timestamp"
          label="Date"
          required
        >
          <el-date-picker
            type="datetime"
            placeholder="选择日期时间"
            v-model="editArticleDialogData.timestamp"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item
          prop="title"
          label="Title"
          required
        >
          <el-input
            type="text"
            v-model="editArticleDialogData.title"
          >
          </el-input>
        </el-form-item>

        <el-form-item label="Status">
          <el-select v-model="editArticleDialogData.status">
            <el-option
              v-for="item in statusOptions"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>

        <el-form-item label="Importance">
          <el-rate
            v-model="editArticleDialogData.importance"
            :max="3"
          />
        </el-form-item>

        <el-form-item label="Remark">
          <el-input
            type="textarea"
            v-model="editArticleDialogData.remark"
            :autosize="{minRows:2,maxRows:4}"
          />
        </el-form-item>
      </el-form>
      <template v-slot:footer>
        <el-button @click="editArticleDialogData = {}">
          Cancel
        </el-button>
        <el-button
          type="primary"
          @click="editArticleDialogConfirm"
          :loading="updatingArticle"
        >
          Confirm
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination';
import {
  fetchList,
  fetchPv,
  updateArticle,
  createArticle,
  deleteArticle,
} from '@/network/article';

let initQueryObj = {
    page: 1,
    limit: 20,
    importance: '',
    title: '',
    type: '',
    sort: '+id',
  },
  typeMap = {
    CN: 'China',
    US: 'USA',
    JP: 'Japan',
    EU: 'Eurozone',
  },
  statusTagtypesMap = {
    published: 'success',
    draft: 'info',
    deleted: 'danger',
  };

export default {
  name: 'ComplexTable',
  components: {
    Pagination,
  },
  data() {
    return {
      importanceOptions: [1, 2, 3],
      typeOptions: Object.keys(typeMap).map((key) => ({
        label: typeMap[key],
        value: key,
      })),
      sortOptions: [
        {
          label: 'ID Descending',
          value: '-id',
        },
        {
          label: 'ID Ascending',
          value: '+id',
        },
      ],
      statusOptions: Object.keys(statusTagtypesMap),
      listQuery: { ...initQueryObj },
      listLoading: null,
      listData: [],
      tableDefaultSort: [{ prop: 'id', order: '+id' }],
      readingDialog: {},
      editArticleDialogData: {},
      updatingArticle: false,
      reviewerColVisible: false,
      total: 0,
    };
  },
  filters: {
    getTagtypeFromStatus(status) {
      return statusTagtypesMap[status];
    },
    getTypeValue(type) {
      return typeMap[type];
    },
  },
  created() {
    this.getListData();
  },
  methods: {
    async deleteBtnClick(index) {
      let { editArticleDialogData, listData } = this;
      let message = this.$message({
        message: '正在删除...',
        iconClass: 'el-icon-loading',
      });
      try {
        await deleteArticle(editArticleDialogData);
        message.close();
        this.showNotification('success','成功','删除成功')
        listData.splice(index, 1);
      } catch (error) {
        message.close();
      }
    },
    sortChange({ prop, order }) {
      if (prop === 'id') {
        this.sortByID(order);
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id';
      } else {
        this.listQuery.sort = '-id';
      }
      this.handleFilter();
    },
    handleFilter() {
      // 点击搜索后从第一页开始展示
      this.listQuery.page = 1;
      this.getListData();
    },
    appendArticleClick() {
      this.editArticleDialogData = {
        visible: true,
        timestamp: Date.now(),
        importance: 1,
        author: 'LuZhiHao',
        status: 'published',
        pageviews: 0,
        id: parseInt(Math.random() * 100) + 1024,
      };
      this.editDialogMode = 'create';

      this.editArticleConfirmCb = this.getEditArticleConfirmCb(0, 0);
    },
    editArticleDialogConfirm() {
      this.editArticleConfirmCb();
    },
    getEditArticleConfirmCb(index, count) {
      return function () {
        let {
          listData,
          editArticleDialogData,
          showNotification,
          showMessage,
          editDialogMode,
        } = this;
        this.$refs.editArticleDialogForm.validate(async (isValid) => {
          if (isValid) {
            this.updatingArticle = true;
            try {
              if (editDialogMode === 'create') {
                await createArticle(editArticleDialogData);
              } else if (editDialogMode === 'edit') {
                await updateArticle(editArticleDialogData);
              }

              this.updatingArticle = false;
              listData.splice(index, count, editArticleDialogData);
              this.editArticleDialogData = {
                ...editArticleDialogData,
                visible: false,
              };
              showNotification('success', '成功', '更新成功');
            } catch (error) {
              this.updatingArticle = false;
              showMessage('更新文章失败,请稍后重试!', 'error');
            }
          } else {
            showMessage('存在不合法字段,请修改后再保存!', 'error');
          }
        });
      };
    },
    editArticleClick(row, index) {
      this.editArticleDialogData = {
        visible: true,
        ...row,
      };
      this.editDialogMode = 'edit';
      this.editArticleConfirmCb = this.getEditArticleConfirmCb(index, 1);
    },
    async readingBtnClick(id) {
      this.readingDialog = {
        ...this.readingDialog,
        visible: true,
        title: 'Reading statistics',
        loading: true,
      };
      let {
        data: { pvData },
      } = await fetchPv(id);
      this.readingDialog = {
        ...this.readingDialog,
        loading: false,
        key: 'key',
        value: 'pv',
        pvData,
      };
    },
    showNotification(type, title, message) {
      this.$notify[type]({
        title,
        message,
      });
    },
    showMessage(message, type) {
      this.$message({
        message,
        type,
        duration: 1500,
      });
    },
    draftBtnClick(row) {
      row.status = 'draft';
      this.showMessage('操作成功', 'success');
    },
    publishBtnClick(row) {
      row.status = 'published';
      this.showMessage('操作成功', 'success');
    },
    async getListData() {
      this.listLoading = true;
      let {
        data: { items, total },
      } = await fetchList(this.listQuery);
      this.listLoading = false;
      this.listData = items;
      this.total = total;
    },
  },
};
</script>

<style lang='scss' scoped>
.query {
  display: flex;
}
.query-input {
  display: flex;
  width: 50%;
  justify-content: space-between;
  > * {
    padding-right: 5px;
  }
  .input-lg {
    width: 0;
    flex-grow: 5;
  }
  .input-sm {
    width: 0;
    flex-grow: 2.5;
  }
  .input-md {
    width: 0;
    flex-grow: 3.5;
  }
}
.query-btn {
  button {
    vertical-align: middle;
  }
  .el-checkbox {
    padding-left: 10px;
  }
}
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
.action-btns {
  display: flex;
  .el-button:first-child {
    width: 55px;
  }
  .el-button:last-child {
    width: 70px;
  }
  > .el-button:not(:first-child, :last-child) {
    width: 0;
    flex-grow: 1;
  }
}
::v-deep.el-form {
  .el-rate {
    display: inline-block;
  }
}
</style>  
//亲人 爱人 朋友