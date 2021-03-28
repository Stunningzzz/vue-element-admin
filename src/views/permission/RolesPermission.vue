<template>
  <div>
    <!-- 必须加小括号 否则会传入$event -->
    <el-button
      type="primary"
      @click.native="handleEditRoleInfoShow()"
    >
      New Role
    </el-button>
    <el-table
      :data="roleList"
      border
      :cell-style="cellStyle"
    >
      <el-table-column
        label="Role Key"
        prop="key"
        width="200"
      >
      </el-table-column>
      <el-table-column
        label="Role Name"
        prop="name"
        width="200"
      ></el-table-column>
      <el-table-column
        label="Description"
        prop="description"
        width="400"
        class="description"
      ></el-table-column>
      <el-table-column
        label="Operations"
        #default="{row,$index}"
      >
        <el-button
          type="primary"
          size="small"
          @click.native="handleEditRoleInfoShow(row)"
        >
          Edit
        </el-button>
        <el-button
          type="danger"
          size="small"
          @click.native="handleRoleDelete(row,$index)"
        >
          Delete
        </el-button>
      </el-table-column>
    </el-table>

    <el-dialog
      :visible.sync="editRoleInfo.visible"
      :title="editRoleInfo.title"
    >
      <el-form
        :model="editRoleInfo"
        label-width="100px"
      >
        <el-form-item label="Name">
          <el-input
            v-model="editRoleInfo.name"
            placeholder="Role Name"
          ></el-input>
        </el-form-item>
        <el-form-item label="Desc">
          <el-input
            v-model="editRoleInfo.description"
            placeholder="Role Description"
            type="textarea"
            :autosize="{minRows:2,maxRows:4}"
          ></el-input>
        </el-form-item>
        <el-form-item label="Menus">
          <el-tree
            ref="tree"
            :data="routes"
            :props="defaultProps"
            show-checkbox
            :node-key="treeNodeKey"
            class="permission-tree"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button
          size="medium"
          @click.native="editRoleInfo.visible = false"
          type="danger"
        >
          Cancel
        </el-button>
        <el-button
          size="medium"
          @click.native="handleEditRoleConfirm"
          type="primary"
        >
          Confirm
        </el-button>
      </template>
    </el-dialog>

  </div>
</template>


<script>
import {
  getRoutes,
  getRoles,
  addRole,
  deleteRole,
  updateRole,
} from '@/network/role';
import path from 'path';
export default {
  name: 'RolePermission',
  data() {
    return {
      treeNodeKey: 'path',
      defaultProps: {
        label: 'title',
        children: 'children',
      },
      editRoleInfo: {
        visible: null,
        title: null,
        name: null,
        description: null,
        menus: null,
        treeKey: 'path',
      },
      roleList: [],
      routes: [],
      cellStyle({ column }) {
        if (column.label.trim() === 'Description') {
          return {
            'text-align': 'left',
          };
        }
      },
      // 必须提前设定属性 否则的话 editRoleInfo.xxx这样算添加属性 而且还不是响应式的添加属性
    };
  },
  created() {
    this.getRoutes();
    this.getRoles();
  },
  methods: {
    handleRoleDelete({ name,key }, $index) {
      this.$confirm(`Confirm to remove ${name}?`, 'Warning', {
        cancelButtonText: 'Cancel',
        confirmButtonText: 'Confirm',
        type: 'warning',
        callback: async (ope) => {
          if (ope === 'confirm') {
            await deleteRole(key);
            this.roleList.splice($index, 1);
            this.$message({
              type: 'success',
              message: `delete ${name} success!`,
            });
          }
        },
      });
    },
    // 注意这里的参数是没有经过过滤的 因为传给后端存入数据库的必须是完整的包含hidden的路由菜单
    generateRoutesByKeys(routes, checkedKeys, basePath = '/') {
      // 从叶子节点到内层节点
      //  1:如果当前children为空且在keys中的话 直接加入结果集
      //  2:如果当前children不为空 那么看是否有可访问的子路由
      //    有: 当前路由加入结果集合 没有: 也加入结果集合 比如像
      let res = [];
      for (const route of routes) {
        // 如果有childen的话 push不push是看有没有选择它的children
        let routeAbsPath = path.resolve(basePath, route.path);
        if (route.children) {
          let checkedChildren = this.generateRoutesByKeys(route.children,checkedKeys,routeAbsPath);
          if (checkedChildren.length > 0) {
            route = {...route,children:checkedChildren};
            res.push(route);
          }
        } else if (checkedKeys.includes(routeAbsPath)) {
          res.push(route);
        }
      }
      return res;
    },
    handleEditRoleInfoShow(role = {}) {
      let { routes = [], name, description } = role;
      let { editRoleInfo } = this;
      if (name) {
        editRoleInfo.title = 'Edit Role';
      } else {
        editRoleInfo.title = 'New Role';
      }
      editRoleInfo.visible = true;
      editRoleInfo.name = name;
      editRoleInfo.description = description;

      // 在设置visible的时候tree还没渲染!!!
      this.$nextTick(() => {
        this.$refs.tree.setCheckedKeys(routes);
      });

      this.handleEditRoleConfirm = () => {
        let { name: preName } = role,
          { name: inputName, description, title } = editRoleInfo;

        let closeConfirmMsgBox = async () => {
          role.name = inputName;
          role.description = description;
          // 为了让每次setCheckedKeys时不需要筛一遍route而直接设置 所以在本地保存的是选中的叶子key数组 方便下次
          // 直接调用setCheckedKeys设置
          role.routes = this.$refs.tree.getCheckedKeys(true);
          let serverRole = {
            ...role,
            routes: this.generateRoutesByKeys(
              this.serviceRoutes,
              this.$refs.tree.getCheckedKeys()
            ),
          };
          console.log('keys --- ',this.$refs.tree.getCheckedKeys());
          console.log('serverRoutes --- ',serverRole.routes);
          if (title === 'New Role') {
            let { key } = await addRole(serverRole);
            role.key = key;
            this.roleList.push(role);
          } else {
            await updateRole(role.key, serverRole);
          }
          editRoleInfo.visible = false;
          this.$notify.success({
            title: 'Success',
            message: (
              <div>
                <div>Role Key: {role.key}</div>
                <div>Role Name: {name}</div>
                <div>Description: {description}</div>
              </div>
            ),
          });
        };
        let showWarning = (callback = () => {}) => {
          let title = inputName ? (
            <div>
              <div>
                the role with the name of <strong>{inputName}</strong> has
                existed
              </div>
              please reedit the role name
            </div>
          ) : (
            `Empty Role Name is not allowed `
          );

          this.$confirm(title, 'Warning', {
            type: 'warning',
            showCancelButton: false,
            callback,
          });
        };
        const isInputNameInvalid = () => {
          return (
            !inputName || this.roleList.some((role) => role.name === inputName)
          );
        };
        if (title === 'Edit Role') {
          preName !== inputName && isInputNameInvalid()
            ? showWarning()
            : closeConfirmMsgBox();
        } else {
          isInputNameInvalid() ? showWarning() : closeConfirmMsgBox();
        }
      };
    },

    async getRoutes() {
      const routes = await getRoutes();
      // 而serviceRoutes保存的是完整的从服务器那边拿过来的routes
      // 那么怎么基于keys去生成一份完整的routes呢?
      // 如果includes这个path的话 就添加进结果里面
      // 而如果当前路由有children的话 那么如果它的子路由可访问 则当前路由必定可访问
      this.serviceRoutes = routes;
      // 树是基于routes构建的 也就是routes是经过hidden和子菜单过滤的
      this.routes = this.generateRoutes(routes);
    },
    async getRoles() {
      const roles = await getRoles();
      // 先进this.generateRoutes(roles)筛一遍 把hidden什么的都筛掉
      this.roleList = roles.map((role) => {
        return {
          ...role,
          routes: this.getLeavesRouteKeys(this.generateRoutes(role.routes)),
        };
      });
    },
    getLeavesRouteKeys(routes) {
      let res = [];
      routes.forEach((route) => {
        // 因为经过generateChildren筛过一次了 所以有children的长度必大于0
        // 且如果长度为1的话 必定是alwaysShow
        if (route.children) {
          res.push(...this.getLeavesRouteKeys(route.children));
        } else {
          res.push(route[this.treeNodeKey]);
        }
      });
      return res;
    },
    // 为什么是routes? 因为调用的时候直接是 generateRoutes(routes)
    // 或者是 generateRoutes(route.children,data.path)
    // 注意basePath必须是绝对路径
    // title children path
    generateRoutes(routes, basePath = '/') {
      let res = [];
      for (let route of routes) {
        if (route.hidden) {
          continue;
        }
        let singleChild = this.getSingleChild(route.children, route, basePath);
        if (singleChild) {
          if (Object.keys(singleChild).length > 0) {
            res.push(singleChild);
          } else {
            // 否则的话当前子菜单必显示
            let data = {
              path: path.resolve(basePath, route.path),
              title: route.meta?.title,
            };
            data.children = this.generateRoutes(route.children, data.path);
            res.push(data);
          }
        }
      }
      return res;
    },
    // 如果子菜单要被覆盖的话 返回子菜单的子路由
    // 如果子菜单不被覆盖的话 返回空对象
    // 如果该路由既有redirect属性 同时children还为0的话 返回undefined
    getSingleChild(children = [], parent, basePath) {
      let singleChild = {};
      children = children.filter((item) => !item.hidden);
      // 只是一个item的情况
      if (children.length === 0) {
        // 如果当前路由有redirect且不存在子路由的话 那就什么都不渲染
        if (parent.redirect) {
          return;
        }
        singleChild = {
          path: path.resolve(basePath, parent.path),
          title: parent.meta?.title,
        };
      } else if (children.length === 1 && !parent.alwaysShow) {
        // 覆盖子菜单的情况
        singleChild = {
          path: path.resolve(basePath, parent.path, children[0].path),
          title: children[0].meta?.title,
        };
      }
      return singleChild;
    },
    hasAbsolutePath(...paths) {
      return paths.some((item) => path.isAbsolute(item));
    },
  },
};
</script>




<style lang='scss' scoped>
::v-deep.el-table {
  border: 1px solid #dfe6ec;
  border-right: none;
  border-bottom: none;
  margin-top: 30px;

  th,
  td {
    text-align: center;
    border-right: 1px solid #dfe6ec;
    border-bottom: 1px solid #dfe6ec;
    .cell {
      word-break: normal;
    }
  }
}
// ::before和::after 会让 bottom 和 right有两个px的边框
.el-table--border::after,
.el-table--group::after,
.el-table::before {
  background-color: initial;
}
</style>
//亲人 爱人 朋友