<template>
  <ul class="todo-list">
    <li class="append-item">
      <svg-icon
        v-show="!appending"
        icon-class="append"
        @click="appending = true"
      ></svg-icon>
      <el-input
        v-show="appending"
        maxlength="25"
        show-word-limit
        v-focus="appending"
        v-model="appendItem.text"
        class="edit"
        @keyup.enter.native="appendDone(appendItem)"
        @keyup.esc.native="appendCancel(appendItem)"
        @blur="appendDone(appendItem)"
      />
    </li>

    <li
      :class="{ completed: todo.done, editing: todo.editing }"
      class="todo"
      v-for="(todo, index) in todoList"
      :key="index"
    >
      <div
        class="view"
        v-show="!todo.editing"
      >
        <div class="toggle">
          <img
            :src="toggleImg(todo)"
            @click="toggleTodo(todo)"
          />
        </div>
        <label @dblclick="handleEditInputShow(todo)">
          {{todo.text}}
        </label>
        <div
          class="destroy"
          @click="deleteTodo( todo )"
        >
        </div>
      </div>
      <el-input
        maxlength="25"
        show-word-limit
        v-show="todo.editing"
        v-focus="todo.editing"
        v-model="todo.text"
        class="edit"
        @keyup.enter.native="doneEdit(todo)"
        @keyup.esc.native="cancelEdit(todo)"
        @blur="doneEdit(todo)"
      />
    </li>
  </ul>
</template>

<script>
export default {
  name: 'TodoList',
  props: {
    todoList: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  data() {
    return {
      appendItem: {
        text: '',
        editing: false,
        done: false,
      },
      appending: false,
    };
  },
  directives: {
    focus(el, { value }, { context }) {
      if (value) {
        context.$nextTick(() => {
          el.firstElementChild.focus();
        });
      }
    },
  },
  methods: {
    appendCancel() {
      this.appendItem.text = '';
      this.appending = false;
    },
    appendDone() {
      let { appendItem } = this;
      if (appendItem.text) {
        this.$emit('appendItem', {
          ...appendItem,
        });
      }
      this.appendCancel();
    },
    toggleImg(todo) {
      return todo.done
        ? 'data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23bddad5%22%20stroke-width%3D%223%22/%3E%3Cpath%20fill%3D%22%235dc2af%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22/%3E%3C/svg%3E'
        : 'data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23ededed%22%20stroke-width%3D%223%22/%3E%3C/svg%3E';
    },
    handleEditInputShow(todo) {
      this.preVal = todo.text;
      todo.editing = true;
    },
    deleteTodo(todo) {
      this.$emit('deleteTodo', todo);
    },
    toggleTodo(todo) {
      todo.done = !todo.done;
    },
    doneEdit(todo) {
      const value = todo.text;
      if (!value) {
        this.deleteTodo();
      } else {
        this.$emit('setStorage');
      }
      todo.editing = false;
    },
    cancelEdit(todo) {
      todo.text = this.preVal;
      todo.editing = false;
    },
    // 如果子组件要修改父组件的数据要采取什么策略? props/$emit
  },
};
</script>
<style lang="scss" scoped>
::v-deep.todo-list {
  margin: 0;
  padding: 0;
  list-style: none;
  .append-item {
    display: flex;
    justify-content: flex-end;
    .svg-icon {
      margin-right: 16px;
      cursor: pointer;
      vertical-align: bottom;
      font-size: 20px;
      opacity: 0.5;
      transition: all 0.3s;
      height: 45px;
      &:hover {
        opacity: 1;
      }
    }
  }
  li {
    line-height: 45px;
    font-size: 24px;
    position: relative;
    .view {
      height: 45px;
      border-bottom: 1px solid #ededed;
      display: flex;
    }
    &:last-child .view {
      border-bottom: none;
    }
    .toggle {
      vertical-align: middle;
      padding: 7px 2px 0 5px;
      img {
        width: 85%;
        height: 85%;
      }
    }
    .el-input__inner {
      height: 45px;
    }

    label {
      word-break: break-all;
      font-size: 14px;
      transition: color 0.4s;
      vertical-align: middle;
      flex-grow: 1;
    }

    &.completed label {
      color: #d9d9d9;
      text-decoration: line-through;
    }

    .destroy {
      opacity: 0;
      font-size: 30px;
      color: #cc9a9a;
      transition: color 0.2s ease-out;
      cursor: pointer;
      width: 35px;
      &:after {
        content: '×';
      }
      &:hover {
        color: #af5b5e;
      }
    }
    &:hover .destroy {
      opacity: 1;
    }
  }
  .el-input {
    vertical-align: bottom;
    .el-input__inner {
      height: 45px;
      vertical-align: inherit;
    }
  }
}
// 选中:
// 不选中:
</style>
