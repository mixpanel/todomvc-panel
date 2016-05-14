import { Component } from 'panel';

import template from './index.jade';

const ENTER_KEY = 13;

document.registerElement('todo-item', class extends Component {
  get $template() {
    return template;
  }

  get inputEl() {
    return this.getElementsByClassName('edit')[0];
  }

  get todo() {
    return this.state.todos[this.todoIndex];
  }

  get todoId() {
    return Number(this.dataset.tid);
  }

  get todoIndex() {
    return this.state.todos.findIndex(t => t.id === this.todoId);
  }

  updateText() {
    const text = this.inputEl.value.trim();
    if (text) {
      this.todo.text = text;
      if (this.state.editing === this.todoId) {
        this.state.editing = null;
      }
      this.update();
    }
  }

  get handlers() {
    return this._handlers || (this._handlers = {
      checkTodo: ev => {
        this.todo.completed = ev.target.checked;
        this.update();
      },
      deleteTodo: ev => {
        this.state.todos.splice(this.todoIndex, 1);
        this.update();
      },
      editTodo: ev => {
        this.update({editing: this.todoId});
        window.requestAnimationFrame(() => this.inputEl.focus());
      },
      editTodoKeypress: ev => {
        if (ev.which === ENTER_KEY) {
          this.updateText();
        }
      },
      updateTodo: () => {
        this.updateText();
      },
    });
  }
});
