import { Component } from 'panel';

import template from './index.jade';

document.registerElement('todo-app', class extends Component {
  get $defaultState() {
    return {
      $view: 'all',
      todos: [
        {
          id: 5,
          text: 'Taste JavaScript',
          completed: true,
        },
        {
          id: 6,
          text: 'Buy a unicorn',
          completed: false,
        },
      ],
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
      deleteTodo: ev => {
        this.state.todos.splice(this.state.todos.findIndex(
          t => t.id === Number(ev.target.parentElement.dataset.tid)
        ), 1);
        this.update({todos: this.state.todos});
      },
      editTodo: ev => {
        const id = Number(ev.target.parentElement.dataset.tid);
        this.update({editing: id});
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
