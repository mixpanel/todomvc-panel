import { Component } from 'panel';

import template from './index.jade';

document.registerElement('todo-app', class extends Component {
  get $defaultState() {
    return {
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

  get $template() {
    return template;
  }
});
