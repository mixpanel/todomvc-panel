import { Component } from 'panel';

import { ENTER_KEY, ESCAPE_KEY } from '../../constants';

import template from './index.jade';

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

  stopEditing() {
    if (this.state.editing === this.todoId) {
      this.state.editing = null;
    }
    this.update();
  }

  updateText() {
    const title = this.inputEl.value.trim();
    if (title) {
      this.todo.title = title;
      this.stopEditing();
    } else {
      this.handlers.deleteTodo();
    }
  }

  get handlers() {
    return this._handlers || (this._handlers = {
      checkTodo: ev => {
        this.todo.completed = ev.target.checked;
        this.update();
      },
      deleteTodo: () => {
        this.state.todos.splice(this.todoIndex, 1);
        this.update();
      },
      editTodo: () => {
        this.update({editing: this.todoId});
        window.requestAnimationFrame(() => this.inputEl.focus());
      },
      editTodoKeyup: ev => {
        switch(ev.which) {
          case ENTER_KEY:
            this.updateText();
            break;
          case ESCAPE_KEY:
            this.inputEl.value = this.todo.title;
            this.stopEditing();
            break;
        }
      },
      updateTodo: () => {
        this.updateText();
      },
    });
  }
});
