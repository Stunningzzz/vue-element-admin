<template>
  <!-- 设置value就会默认展开 -->
  <el-collapse :value="['1']">
    <el-collapse-item name="1">
      <template #title>
        <label class="todo-header">
          TodoList
        </label>
      </template>
      <div class="todo-body">
        <div class="content">
          <TodoList
            :todo-list="filteredTodos"
            @deleteTodo="deleteTodo"
            @setStorage="setLocalStorage"
            @appendItem="appendItem"
          />
        </div>
        <div class="footer">
          <span class="todo-count">
            <strong>{{ remaining }}</strong>
            {{ remaining | pluralize('item') }} left
          </span>
          <ul class="filters">
            <li
              v-for="(val, key) in todoItemFilters"
              :key="key"
            >
              <a
                :class="{ selected: visibility === key }"
                @click="visibility = key"
              >{{ key | capitalize }}</a>
            </li>
          </ul>
        </div>
      </div>
    </el-collapse-item>
  </el-collapse>

</template>

<script>
import TodoList from './TodoList.vue';
const STORAGE_KEY = 'todos';
const todoItemFilters = {
  all: (todos) => todos,
  active: (todos) => todos.filter((todo) => !todo.done),
  completed: (todos) => todos.filter((todo) => todo.done),
};

const defaultList = JSON.parse(window.localStorage.getItem(STORAGE_KEY)) || [
  { text: 'star this repository', done: false, editing: false },
  { text: 'fork this repository', done: false, editing: false },
  { text: 'follow author', done: false, editing: false },
  { text: 'vue-element-admin', done: true, editing: false },
  { text: 'vue', done: true, editing: false },
  { text: 'element-ui', done: true, editing: false },
  { text: 'axios', done: true, editing: false },
  { text: 'webpack', done: true, editing: false },
];
export default {
  components: { TodoList },
  data() {
    return {
      visibility: 'all',
      todoItemFilters,
      todos: defaultList,
    };
  },
  computed: {
    // 符合条件的item组成的数组
    filteredTodos() {
      return todoItemFilters[this.visibility](this.todos);
    },
    // 符合条件的item个数
    remaining() {
      return this.todos.filter((todo) => !todo.done).length;
    },
  },
  filters: {
    pluralize: (n, w) => (n === 1 ? w : w + 's'),
    capitalize: (s) => s.charAt(0).toUpperCase() + s.slice(1),
  },
  methods: {
    appendItem(newItem) {
      this.todos.unshift(newItem);
    },
    setLocalStorage() {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(this.todos));
    },
    deleteTodo(todo) {
      this.todos.splice(this.todos.indexOf(todo), 1);
    },
  },
  created() {
    // 在刷新和关闭页面时保存todo里面的数据
    window.onbeforeunload = () => {
      this.setLocalStorage();
    };
  },
};
</script>

<style lang="scss" scoped>
::v-deep {
  // 让箭头再偏左点
  .el-collapse-item__arrow {
    margin-right: 20px;
  }
  // 让下面用阴影设置的褶皱出来
  .el-collapse-item__wrap {
    background-color: initial;
  }
}
.todo-header {
  font-size: 18px;
  line-height: 45px;
  padding: 0 15px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #e6e6e6;
}
.todo-body {
  font: 14px 'Helvetica Neue', Helvetica, Arial, sans-serif;
  line-height: 1.4em;
  color: #4d4d4d;
  min-width: 230px;
  max-width: 550px;
  margin: 0 auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-weight: 300;
  background: #fff;
  z-index: 1;
  position: relative;

  .footer {
    color: #777;
    position: relative;
    padding: 10px 15px;
    height: 40px;
    text-align: center;
    border-top: 1px solid #e6e6e6;
  }
  .footer:before {
    content: '';
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: 40px;
    overflow: hidden;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2), 0 8px 0 -3px #f6f6f6,
      0 9px 1px -3px rgba(0, 0, 0, 0.2), 0 16px 0 -6px #f6f6f6,
      0 17px 2px -6px rgba(0, 0, 0, 0.2);
  }
  .todo-count {
    float: left;
    text-align: left;
  }
  .filters {
    margin: 0;
    padding: 0;
    position: relative;
    z-index: 1;
    list-style: none;
    li {
      display: inline;
      a {
        color: inherit;
        font-size: 12px;
        padding: 3px 7px;
        text-decoration: none;
        border: 1px solid transparent;
        border-radius: 3px;
        &:hover,&.selected {
          border-color: rgba(175, 47, 47, 0.2);
        }
      }
    }
  }
}
</style>
