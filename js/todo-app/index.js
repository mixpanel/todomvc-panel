import { Component } from 'panel';

import { ENTER_KEY } from '../constants';
import './todo-item';

import template from './index.jade';

customElements.define('todo-app', class extends Component {
  get config() {
    return {
      defaultState: {
        todos: [],
        $view: `all`,
      },

      routes: {
        '(/)':        () => ({$view: 'all'}),
        '/active':    () => ({$view: 'active'}),
        '/completed': () => ({$view: 'completed'}),
      },

      template,

      helpers: {
        changeAll: ev => {
          const completed = ev.target.checked;
          this.update({todos: this.state.todos.map(t => Object.assign(t, {completed}))});
        },
        clearCompleted: () => {
          this.update({todos: this.state.todos.filter(t => !t.completed)});
        },
        filteredTodos: () => {
          switch(this.state.$view) {
            case `active`:
              return this.state.todos.filter(t => !t.completed);
            case `completed`:
              return this.state.todos.filter(t => t.completed);
            default:
              return this.state.todos;
          }
        },
        newTodoKeyup: ev => {
          if (ev.which === ENTER_KEY) {
            const title = ev.target.value.trim();
            if (title) {
              ev.target.value = ``;
              this.update({todos: this.state.todos.concat({id: this.nextTodoId(), title})});
            }
          }
        },
      },

      hooks: {
        postUpdate: () => localStorage.setItem(`todos-panel`, JSON.stringify(this.state.todos)),
      },
    };
  }

  constructor() {
    super(...arguments);
    let todos = window.localStorage.getItem(`todos-panel`);
    if (todos) {
      todos = JSON.parse(todos);
      this.state = {todos};
      this.todoId = Math.max(1, Math.max(...todos.map(t => t.id)) + 1);
    }
  }

  nextTodoId() {
    return ++this.todoId || (this.todoId = 1);
  }
});
