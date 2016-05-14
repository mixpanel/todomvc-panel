import { Component } from 'panel';

import { ENTER_KEY } from '../constants';
import './todo-item';

import template from './index.jade';

let todoId = 1;

document.registerElement('todo-app', class extends Component {
  get $defaultState() {
    return {
      todos: [],
      $view: 'all',
    };
  }

  get $routes() {
    return {
      '/':          () => ({$view: 'all'}),
      '/active':    () => ({$view: 'active'}),
      '/completed': () => ({$view: 'completed'}),
      '':           '/',
    };
  }

  get $template() {
    return template;
  }

  get handlers() {
    return this._handlers || (this._handlers = {
      changeAll: ev => {
        const completed = ev.target.checked;
        this.state.todos.forEach(todo => todo.completed = completed);
        this.update();
      },
      clearCompleted: () => {
        this.update({todos: this.state.todos.filter(t => !t.completed)});
      },
      newTodoKeyup: ev => {
        if (ev.which === ENTER_KEY) {
          const text = ev.target.value.trim();
          if (text) {
            ev.target.value = '';
            this.update({todos: this.state.todos.concat({id: todoId++, text})});
          }
        }
      },
    });
  }

  get helpers() {
    return this._helpers || (this._helpers = {
      filteredTodos: () => {
        switch(this.state.$view) {
          case 'active':
            return this.state.todos.filter(t => !t.completed);
          case 'completed':
            return this.state.todos.filter(t => t.completed);
          default:
            return this.state.todos;
        }
      },
    });
  }
});
