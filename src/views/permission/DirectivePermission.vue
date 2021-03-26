

<script>
import permission from '@/directives/permission';
import SwitchRoles from './SwitchRoles';
import checkPermission from '@/common/permission';

export default {
  name: 'DirectivePermission',
  directives: {
    permission,
  },
  components: {
    SwitchRoles,
  },
  data() {
    return {
      key: 1,
    };
  },
  methods: {
    checkPermission,
    handleRoleChage() {
      this.key++;
    },
  },
};
</script>

<template>
  <div>
    <SwitchRoles @change="handleRoleChage"/>
    <!-- 在inserted里面取消挂载的el是没有办法在update里面重新挂载的 只能通过重新渲染一个并让他不取消挂载
    所以为了在切换时能全部重新创建 要在最外层套个key -->
    <div :key="key">
      <div class="directive-tags">
        <div
          v-permission="['admin']"
          class="tags-wrapper"
        >
          <el-tag type="success">
            Only
            <el-tag class="role-tag">
              admin
            </el-tag>
            can see this
          </el-tag>
          <el-tag type="info">
            v-permission="['admin']"
          </el-tag>
        </div>
        <div
          v-permission="['editor']"
          class="tags-wrapper"
        >
          <el-tag
            type="success"
          >
            Only
            <el-tag class="role-tag">
              editor
            </el-tag>
            can see this
          </el-tag>
          <el-tag type="info">
            v-permission="['editor']"
          </el-tag>
        </div>

        <div
          v-permission="['admin','editor']"
          class="tags-wrapper"
        >
          <el-tag type="success">
            Both
            <el-tag class="role-tag">
              admin
            </el-tag>
            and
            <el-tag class="role-tag">
              editor
            </el-tag>
            can see this
          </el-tag>
          <el-tag type="info">
            v-permission="['admin','editor']"
          </el-tag>
        </div>
      </div>

      <aside>
        <div>
          In some cases, using v-permission will have no effect. For example: Element-UI's Tab component or el-table-column and other scenes that dynamically render dom. You can only do this with v-if.
        </div>
        e.g.
      </aside>
      <div class="function-tags">
        <el-tabs type="border-card">
          <el-tab-pane label="Editor" v-permission="['admin']">
            Editor can see this 
            <el-tag type="info">
              v-if="checkPermission(['editor'])"
            </el-tag>
          </el-tab-pane>
           <el-tab-pane label="Admin" v-permission="['editor']">
            Admin can see this 
            <el-tag type="info">
              v-if="checkPermission(['admin'])"
            </el-tag>
          </el-tab-pane>
          <el-tab-pane label="Admin-OR-Editor" v-permission="['editor','admin']">
            Both admin or editor can see this
            <el-tag type="info">
              v-if="checkPermission(['admin','editor'])"
            </el-tag>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>

  </div>
</template>

<style lang='scss' scoped>
.directive-tags {
  margin: 40px 0;
  .tags-wrapper:not(last-of-child) {
    margin-bottom: 20px;
  }
  .el-tag {
    vertical-align: middle;
    .role-tag {
      margin-right: 0;
    }
    &:not(.el-tag--info) {
      line-height: 35px;
      height: initial;
      font-size: 16px;
    }
  }
  .el-tag--success {
    width: 30%;
  }
}
.el-tag--info {
  margin-left: 15px;
}
</style>
//亲人 爱人 朋友