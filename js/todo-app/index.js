import { Component } from 'panel';

import template from './index.jade';

document.registerElement('todo-app', class extends Component {
  get $defaultState() {
    return {
      $view: 'all',
      todos: [
        {
          text: 'Taste JavaScript',
          completed: true,
        },
        {
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
      editTodo: ev => {
        const ti = Number(ev.target.dataset.ti);
        this.update({editing: ti});
      },
    });
  }
});
